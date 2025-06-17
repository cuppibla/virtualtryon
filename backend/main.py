from fastapi import FastAPI, WebSocket, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import google.generativeai as genai
import os
from dotenv import load_dotenv
import asyncio
import io
import wave
import soundfile as sf
import librosa
import base64
import json
from typing import Optional
from gtts import gTTS
from fastapi import WebSocketDisconnect
import tempfile
import subprocess
from pydub import AudioSegment
from io import BytesIO
import logging
from google.adk.agents import Agent
import datetime
from zoneinfo import ZoneInfo

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Load environment variables
load_dotenv()

# Configure Gemini API
api_key = os.getenv("GOOGLE_API_KEY")
if not api_key:
    raise ValueError("GOOGLE_API_KEY not found in environment variables")

genai.configure(api_key=api_key)

# Initialize models
chat_model = genai.GenerativeModel('gemini-2.5-pro-preview-06-05')
live_model = genai.GenerativeModel('gemini-2.5-pro-preview-06-05')

app = FastAPI()

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def text_to_speech(text: str) -> bytes:
    """Convert text to speech using gTTS and return audio bytes"""
    try:
        print(f"Converting text to speech: {text}")
        tts = gTTS(text=text, lang='en', slow=False)
        audio_io = io.BytesIO()
        tts.write_to_fp(audio_io)
        audio_io.seek(0)
        audio_bytes = audio_io.read()
        print(f"Generated audio bytes: {len(audio_bytes)} bytes")
        return audio_bytes
    except Exception as e:
        print(f"Error in text_to_speech: {str(e)}")
        raise

class ChatRequest(BaseModel):
    message: str

@app.post("/chat")
async def chat(request: ChatRequest):
    try:
        response = chat_model.generate_content(request.message)
        # Convert response to speech
        audio_bytes = text_to_speech(response.text)
        return {
            "response": response.text,
            "audio": base64.b64encode(audio_bytes).decode('utf-8')
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

def get_weather(city: str) -> dict:
    """Retrieves the current weather report for a specified city.

    Args:
        city (str): The name of the city for which to retrieve the weather report.

    Returns:
        dict: status and result or error msg.
    """
    if city.lower() == "new york":
        return {
            "status": "success",
            "report": (
                "The weather in New York is sunny with a temperature of 25 degrees"
                " Celsius (77 degrees Fahrenheit)."
            ),
        }
    else:
        return {
            "status": "error",
            "error_message": f"Weather information for '{city}' is not available.",
        }

def get_current_time(city: str) -> dict:
    """Returns the current time in a specified city.

    Args:
        city (str): The name of the city for which to retrieve the current time.

    Returns:
        dict: status and result or error msg.
    """
    if city.lower() == "new york":
        tz_identifier = "America/New_York"
    else:
        return {
            "status": "error",
            "error_message": (
                f"Sorry, I don't have timezone information for {city}."
            ),
        }

    tz = ZoneInfo(tz_identifier)
    now = datetime.datetime.now(tz)
    report = (
        f'The current time in {city} is {now.strftime("%Y-%m-%d %H:%M:%S %Z%z")}'
    )
    return {"status": "success", "report": report}

def process_voice_input(audio_data: bytes) -> str:
    """Process voice input and convert to text using Gemini.

    Args:
        audio_data (bytes): The audio data in WAV format.

    Returns:
        str: The transcribed text from the audio.
    """
    model = genai.GenerativeModel('gemini-pro-vision')
    response = model.generate_content([
        "You are a helpful AI assistant. Please transcribe this audio input.",
        audio_data
    ])
    return response.text

def generate_voice_response(text: str) -> bytes:
    """Generate voice response from text using Gemini.

    Args:
        text (str): The text to convert to speech.

    Returns:
        bytes: The audio data in WAV format.
    """
    model = genai.GenerativeModel('gemini-pro-vision')
    response = model.generate_content([
        "Convert this text to speech: " + text
    ])
    return response.audio

# Create the voice agent
voice_agent = Agent(
    name="voice_assistant_agent",
    model="gemini-2.0-flash",
    description="Agent to handle voice interactions and provide responses about weather and time.",
    instruction="You are a helpful voice assistant who can answer questions about the time and weather in a city.",
    tools=[get_weather, get_current_time],
)

# Create the text agent
text_agent = Agent(
    name="text_assistant_agent",
    model="gemini-2.0-flash",
    description="Agent to handle text interactions and provide responses about weather and time.",
    instruction="You are a helpful text assistant who can answer questions about the time and weather in a city.",
    tools=[get_weather, get_current_time],
)

@app.websocket("/ws/live")
async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()
    logging.info("connection open")
    try:
        while True:
            message = await websocket.receive_text()
            data = json.loads(message)

            if data["type"] == "audio":
                # Handle audio input
                audio_data = base64.b64decode(data["data"])
                audio_buffer = BytesIO(audio_data)
                audio_segment = AudioSegment.from_file(audio_buffer, format="webm")
                audio_segment = audio_segment.set_channels(1).set_frame_rate(16000)
                wav_buffer = BytesIO()
                audio_segment.export(wav_buffer, format="wav")
                wav_buffer.seek(0)

                # Process audio with Gemini
                response = live_model.generate_content([wav_buffer.getvalue()])
                text_response = response.text

                # Get response from ADK agent
                agent_response = voice_agent.chat(text_response)

                # Generate audio response
                audio_response = generate_voice_response(agent_response)

                await websocket.send_json({
                    "type": "response",
                    "text": agent_response,
                    "audio": audio_response
                })

            elif data["type"] == "text":
                # Handle text input with ADK agent
                text_input = data["data"]
                agent_response = text_agent.chat(text_input)

                # Generate audio response
                audio_response = generate_voice_response(agent_response)

                await websocket.send_json({
                    "type": "response",
                    "text": agent_response,
                    "audio": audio_response
                })

    except WebSocketDisconnect:
        logging.info("connection closed")
    except Exception as e:
        logging.error(f"WebSocket error: {e}")
        await websocket.close()

@app.get("/")
async def root():
    return {"message": "Welcome to the Gemini API Backend"}
