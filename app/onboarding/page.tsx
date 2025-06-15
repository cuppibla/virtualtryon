"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Camera, Upload, Mic, ArrowRight, ArrowLeft } from "lucide-react"
import { TopNav } from "@/components/top-nav"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"

const brandOptions = [
  "Zara",
  "H&M",
  "Uniqlo",
  "Nike",
  "Adidas",
  "Levi's",
  "Gap",
  "Urban Outfitters",
  "ASOS",
  "Forever 21",
  "Mango",
  "COS",
  "Everlane",
  "Reformation",
]

export default function OnboardingPage() {
  const [step, setStep] = useState(1)
  const [budget, setBudget] = useState([150])
  const [selectedBrands, setSelectedBrands] = useState<string[]>([])
  const [voiceInput, setVoiceInput] = useState("")

  const toggleBrand = (brand: string) => {
    setSelectedBrands((prev) => (prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]))
  }

  const nextStep = () => setStep((prev) => Math.min(prev + 1, 4))
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 1))

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50">
      <TopNav />

      <div className="px-4 pt-20 pb-8">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between text-sm text-gray-500 mb-2">
            <span>Step {step} of 3</span>
            <span>{Math.round((step / 3) * 100)}% Complete</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-pink-400 to-purple-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(step / 3) * 100}%` }}
            />
          </div>
        </div>

        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-2xl text-center">What's your style budget?</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="text-center">
                      <span className="text-3xl font-bold text-purple-600">${budget[0]}</span>
                      <p className="text-gray-500">per outfit</p>
                    </div>
                    <Slider value={budget} onValueChange={setBudget} max={500} min={25} step={25} className="w-full" />
                    <div className="flex justify-between text-sm text-gray-500">
                      <span>$25</span>
                      <span>$500+</span>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="font-semibold">Favorite Brands</h3>
                    <div className="flex flex-wrap gap-2">
                      {brandOptions.map((brand) => (
                        <Badge
                          key={brand}
                          variant={selectedBrands.includes(brand) ? "default" : "secondary"}
                          className="cursor-pointer rounded-full"
                          onClick={() => toggleBrand(brand)}
                        >
                          {brand}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-2xl text-center">Let's analyze your style</CardTitle>
                  <p className="text-center text-gray-600">Upload a photo to get personalized recommendations</p>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <Button variant="outline" className="h-32 flex flex-col gap-2 rounded-xl">
                      <Camera className="w-8 h-8" />
                      <span>Take Photo</span>
                    </Button>
                    <Button variant="outline" className="h-32 flex flex-col gap-2 rounded-xl">
                      <Upload className="w-8 h-8" />
                      <span>Upload Photo</span>
                    </Button>
                  </div>

                  <div className="text-center text-sm text-gray-500">
                    We'll analyze your skin tone, body shape, and style preferences to create your perfect style
                    profile.
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-2xl text-center">Tell us about your style</CardTitle>
                  <p className="text-center text-gray-600">Describe your style preferences in your own words</p>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="relative">
                      <Input
                        placeholder="e.g., I like preppy but casual, comfortable for work..."
                        value={voiceInput}
                        onChange={(e) => setVoiceInput(e.target.value)}
                        className="pr-12"
                      />
                      <Button variant="ghost" size="icon" className="absolute right-2 top-1/2 -translate-y-1/2">
                        <Mic className="w-4 h-4" />
                      </Button>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      {["Minimalist", "Bohemian", "Streetwear", "Professional", "Vintage", "Sporty"].map((style) => (
                        <Badge
                          key={style}
                          variant="secondary"
                          className="justify-center py-2 cursor-pointer rounded-full"
                        >
                          {style}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {step === 4 && (
            <motion.div
              key="step4"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm text-center">
                <CardContent className="pt-8 space-y-6">
                  <div className="w-20 h-20 bg-gradient-to-r from-pink-400 to-purple-500 rounded-full mx-auto flex items-center justify-center">
                    <span className="text-2xl">✨</span>
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold mb-2">Your Style Persona</h2>
                    <Badge className="bg-gradient-to-r from-pink-400 to-purple-500 text-white px-4 py-2 rounded-full">
                      Casual Minimalist
                    </Badge>
                  </div>
                  <p className="text-gray-600">
                    Perfect! We've created your personalized style profile. You'll now see recommendations tailored just
                    for you.
                  </p>
                  <Link href="/">
                    <Button className="w-full bg-gradient-to-r from-pink-400 to-purple-500 hover:from-pink-500 hover:to-purple-600">
                      Start Styling
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Navigation Buttons */}
        {step < 4 && (
          <div className="flex justify-between mt-8">
            <Button variant="outline" onClick={prevStep} disabled={step === 1} className="rounded-full">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            <Button
              onClick={nextStep}
              className="bg-gradient-to-r from-pink-400 to-purple-500 hover:from-pink-500 hover:to-purple-600 rounded-full"
            >
              Next
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
