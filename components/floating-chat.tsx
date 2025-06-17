"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { MessageCircle, X, Send, Mic, Camera } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { VoiceCameraInput } from "./voice-camera-input"

interface Message {
  text: string
  isUser: boolean
}

export function FloatingChat() {
  const [isOpen, setIsOpen] = useState(false)
  const [message, setMessage] = useState("")
  const [messages, setMessages] = useState<Message[]>([
    { text: "Hi! I'm your personal style assistant. How can I help you find the perfect outfit today?", isUser: false }
  ])
  const [isLoading, setIsLoading] = useState(false)
  const [showVoiceCamera, setShowVoiceCamera] = useState(false)

  const handleSendMessage = async () => {
    if (!message.trim()) return

    // Add user message to chat
    const userMessage = { text: message, isUser: true }
    setMessages(prev => [...prev, userMessage])
    setMessage("")
    setIsLoading(true)

    try {
      // Send message to backend
      const response = await fetch("http://localhost:8000/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: message }),
      })

      if (!response.ok) {
        throw new Error("Failed to get response")
      }

      const data = await response.json()

      // Add AI response to chat
      setMessages(prev => [...prev, { text: data.response, isUser: false }])
    } catch (error) {
      console.error("Error sending message:", error)
      setMessages(prev => [...prev, { text: "Sorry, I encountered an error. Please try again.", isUser: false }])
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="fixed bottom-20 right-4 z-50"
          >
            <Card className="w-80 shadow-2xl border-0 bg-white/90 backdrop-blur-md">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm">AI Style Assistant</CardTitle>
                <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)} className="h-6 w-6">
                  <X className="w-4 h-4" />
                </Button>
              </CardHeader>
              <CardContent className="space-y-3">
                {showVoiceCamera ? (
                  <VoiceCameraInput />
                ) : (
                  <>
                    <div className="h-60 overflow-y-auto space-y-3">
                      {messages.map((msg, index) => (
                        <div
                          key={index}
                          className={`p-3 rounded-lg ${
                            msg.isUser
                              ? "bg-gradient-to-r from-pink-400 to-purple-500 text-white ml-8"
                              : "bg-gray-100 mr-8"
                          }`}
                        >
                          {msg.text}
                        </div>
                      ))}
                      {isLoading && (
                        <div className="p-3 rounded-lg bg-gray-100 mr-8">
                          Thinking...
                        </div>
                      )}
                    </div>
                    <div className="flex gap-2">
                      <Input
                        placeholder="Ask me anything..."
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        onKeyPress={handleKeyPress}
                        className="text-sm"
                        disabled={isLoading}
                      />
                      <Button
                        size="icon"
                        className="rounded-full"
                        onClick={handleSendMessage}
                        disabled={isLoading}
                      >
                        <Send className="w-4 h-4" />
                      </Button>
                    </div>
                  </>
                )}
                <div className="flex justify-center">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowVoiceCamera(!showVoiceCamera)}
                    className="text-xs"
                  >
                    {showVoiceCamera ? "Show Chat" : "Show Voice & Camera"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      <Button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-4 right-4 z-40 rounded-full w-14 h-14 bg-gradient-to-r from-pink-400 to-purple-500 hover:from-pink-500 hover:to-purple-600 shadow-lg"
      >
        <MessageCircle className="w-6 h-6" />
      </Button>
    </>
  )
}
