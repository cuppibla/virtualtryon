"use client"

import React, { useState, useRef, useEffect } from 'react';
import { Mic, Camera, MicOff, CameraOff, Send } from 'lucide-react';
import { Button } from './ui/button';

export const VoiceCameraInput: React.FC = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [isCameraOn, setIsCameraOn] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [responseText, setResponseText] = useState('');
  const [isPlaying, setIsPlaying] = useState(false);
  const [textInput, setTextInput] = useState('');

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const videoRef = useRef<HTMLVideoElement>(null);
  const mediaStreamRef = useRef<MediaStream | null>(null);
  const wsRef = useRef<WebSocket | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    return () => {
      if (mediaStreamRef.current) {
        mediaStreamRef.current.getTracks().forEach(track => track.stop());
      }
      if (wsRef.current) {
        wsRef.current.close();
      }
    };
  }, []);

  const playAudioResponse = (audioBase64: string) => {
    if (audioRef.current) {
      try {
        console.log('Attempting to play audio response');
        const audioBlob = new Blob([Buffer.from(audioBase64, 'base64')], { type: 'audio/mpeg' });
        const audioUrl = URL.createObjectURL(audioBlob);

        audioRef.current.onloadeddata = () => {
          console.log('Audio data loaded');
          audioRef.current?.play().then(() => {
            setIsPlaying(true);
          }).catch(error => {
            console.error('Error playing audio:', error);
          });
        };

        audioRef.current.onerror = (e) => {
          console.error('Error loading audio:', e);
          setIsPlaying(false);
        };

        audioRef.current.onended = () => {
          console.log('Audio playback ended');
          setIsPlaying(false);
          URL.revokeObjectURL(audioUrl);
        };

        audioRef.current.src = audioUrl;
      } catch (error) {
        console.error('Error in playAudioResponse:', error);
        setIsPlaying(false);
      }
    } else {
      console.error('Audio element not found');
    }
  };

  const connectWebSocket = () => {
    if (wsRef.current?.readyState === WebSocket.OPEN) {
      console.log('WebSocket already connected');
      return;
    }

    try {
      console.log('Connecting to WebSocket...');
      const ws = new WebSocket('ws://localhost:8000/ws/live');
      wsRef.current = ws;

      ws.onopen = () => {
        console.log('WebSocket connection established');
        setIsProcessing(false);
      };

      ws.onmessage = (event) => {
        try {
          console.log('Received message from server');
          const response = JSON.parse(event.data);

          if (response.type === 'response') {
            console.log('Received response:', response);
            if (response.audio) {
              console.log('Received audio response');
              playAudioResponse(response.audio);
            }

            if (response.text) {
              console.log('Received text response:', response.text);
              setResponseText(response.text);
            }

            if (response.error) {
              console.error('Server error:', response.error);
              setResponseText(`Error: ${response.error}`);
            }
          } else if (response.type === 'error') {
            console.error('Server error:', response.message);
            setResponseText(`Error: ${response.message}`);
          }
        } catch (error) {
          console.error('Error processing server message:', error);
        }
      };

      ws.onerror = (error) => {
        console.error('WebSocket error:', error);
        setIsProcessing(false);
        // Try to reconnect after a short delay
        setTimeout(() => {
          if (wsRef.current?.readyState !== WebSocket.OPEN) {
            console.log('Attempting to reconnect after error...');
            connectWebSocket();
          }
        }, 2000);
      };

      ws.onclose = (event) => {
        console.log('WebSocket connection closed:', event.code, event.reason);
        setIsProcessing(false);
        // Try to reconnect after a short delay
        setTimeout(() => {
          if (wsRef.current?.readyState !== WebSocket.OPEN) {
            console.log('Attempting to reconnect after close...');
            connectWebSocket();
          }
        }, 2000);
      };
    } catch (error) {
      console.error('Error creating WebSocket:', error);
      setIsProcessing(false);
    }
  };

  const startVoiceRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream, {
        mimeType: 'audio/webm;codecs=opus',
        audioBitsPerSecond: 128000
      });
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = async () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        const reader = new FileReader();
        reader.onloadend = () => {
          const base64Audio = reader.result?.toString().split(',')[1];
          if (base64Audio && wsRef.current?.readyState === WebSocket.OPEN) {
            wsRef.current.send(JSON.stringify({
              type: 'audio',
              data: base64Audio,
              format: 'audio/webm'
            }));
          }
        };
        reader.readAsDataURL(audioBlob);
        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorder.start();
      setIsRecording(true);
      setIsProcessing(false);
    } catch (error) {
      console.error('Error starting recording:', error);
      setIsProcessing(false);
    }
  };

  const stopVoiceRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      setIsProcessing(true);
    }
  };

  const toggleCamera = async () => {
    if (!isCameraOn) {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
        mediaStreamRef.current = stream;
        setIsCameraOn(true);
      } catch (error) {
        console.error('Error accessing camera:', error);
      }
    } else {
      if (mediaStreamRef.current) {
        mediaStreamRef.current.getTracks().forEach(track => track.stop());
      }
      if (videoRef.current) {
        videoRef.current.srcObject = null;
      }
      setIsCameraOn(false);
    }
  };

  const captureVideoFrame = () => {
    if (videoRef.current && canvasRef.current) {
      const canvas = canvasRef.current;
      const video = videoRef.current;
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(video, 0, 0);
        return canvas.toDataURL('image/jpeg').split(',')[1];
      }
    }
    return null;
  };

  const handleTextSubmit = () => {
    if (textInput.trim() && wsRef.current?.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify({
        type: 'text',
        data: textInput.trim(),
        format: 'text'
      }));
      setTextInput('');
      setIsProcessing(true);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleTextSubmit();
    }
  };

  useEffect(() => {
    // Connect to WebSocket when component mounts
    connectWebSocket();

    // Cleanup function
    return () => {
      if (wsRef.current) {
        wsRef.current.close();
      }
      if (mediaRecorderRef.current) {
        mediaRecorderRef.current.stop();
      }
    };
  }, []);

  return (
    <div className="flex flex-col items-center space-y-4 p-4">
      <div className="relative w-full max-w-md">
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted
          className={`w-full rounded-lg ${isCameraOn ? 'block' : 'hidden'}`}
        />
        <canvas ref={canvasRef} className="hidden" />
        <audio
          ref={audioRef}
          className="w-full mt-4"
          controls={true}
          preload="auto"
        />
        {isPlaying && (
          <div className="text-green-500 mt-2 text-center">
            Playing audio response...
          </div>
        )}
      </div>

      <div className="flex space-x-4">
        <Button
          onClick={isRecording ? stopVoiceRecording : startVoiceRecording}
          disabled={isProcessing}
          variant={isRecording ? "destructive" : "default"}
          className="w-12 h-12 rounded-full"
        >
          {isRecording ? <MicOff className="h-6 w-6" /> : <Mic className="h-6 w-6" />}
        </Button>

        <Button
          onClick={toggleCamera}
          className={`p-3 rounded-full ${
            isCameraOn
              ? 'bg-red-500 hover:bg-red-600'
              : 'bg-purple-500 hover:bg-purple-600'
          } text-white transition-colors`}
        >
          {isCameraOn ? <CameraOff size={24} /> : <Camera size={24} />}
        </Button>
      </div>

      {isProcessing && (
        <div className="text-gray-600">Processing...</div>
      )}

      {responseText && (
        <div className="mt-4 p-4 bg-gray-100 rounded-lg max-w-md">
          <p className="text-gray-800">{responseText}</p>
        </div>
      )}

      <div className="flex items-center gap-2">
        <div className="flex-1 relative">
          <textarea
            value={textInput}
            onChange={(e) => setTextInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type your message here..."
            className="w-full p-2 pr-12 border rounded-lg resize-none"
            rows={3}
            disabled={isProcessing}
          />
          <Button
            onClick={handleTextSubmit}
            disabled={!textInput.trim() || isProcessing}
            className="absolute right-2 bottom-2"
            size="sm"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};
