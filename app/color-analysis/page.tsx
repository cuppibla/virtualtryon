"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Upload, Camera, Palette } from "lucide-react"
import { TopNav } from "@/components/top-nav"
import Image from "next/image"

export default function ColorAnalysisPage() {
  const [analysisComplete, setAnalysisComplete] = useState(true) // Set to true for demo

  const colorPalette = [
    { name: "Soft Pink", color: "#F8BBD9", category: "Primary" },
    { name: "Sage Green", color: "#87A96B", category: "Primary" },
    { name: "Cream", color: "#F5F5DC", category: "Neutral" },
    { name: "Dusty Blue", color: "#6B8CAE", category: "Accent" },
    { name: "Warm Beige", color: "#D2B48C", category: "Neutral" },
    { name: "Lavender", color: "#E6E6FA", category: "Accent" },
  ]

  const recommendedOutfits = [
    {
      id: 1,
      name: "Spring Garden Look",
      colors: ["#F8BBD9", "#87A96B", "#F5F5DC"],
      image: "/placeholder.svg?height=200&width=150",
    },
    {
      id: 2,
      name: "Soft Professional",
      colors: ["#6B8CAE", "#D2B48C", "#F5F5DC"],
      image: "/placeholder.svg?height=200&width=150",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50">
      <TopNav />

      <div className="px-4 pt-20 pb-8">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold mb-2">Color Analysis</h1>
          <p className="text-gray-600">Discover your perfect color palette</p>
        </div>

        {!analysisComplete ? (
          <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-center">Upload Your Photo</CardTitle>
              <p className="text-center text-gray-600">We'll analyze your skin tone and recommend your best colors</p>
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
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-6">
            {/* Analysis Results */}
            <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Palette className="w-5 h-5" />
                  Your Color Analysis
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <Badge className="bg-gradient-to-r from-pink-400 to-purple-500 text-white px-4 py-2 rounded-full mb-2">
                    Soft Summer
                  </Badge>
                  <p className="text-sm text-gray-600">Cool undertones with muted, soft colors</p>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="font-medium">Undertone:</span>
                    <p className="text-gray-600">Cool</p>
                  </div>
                  <div>
                    <span className="font-medium">Contrast Level:</span>
                    <p className="text-gray-600">Low-Medium</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Color Palette */}
            <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>Your Perfect Palette</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-3">
                  {colorPalette.map((color, index) => (
                    <div key={index} className="text-center">
                      <div
                        className="w-full h-16 rounded-lg mb-2 border-2 border-white shadow-sm"
                        style={{ backgroundColor: color.color }}
                      />
                      <p className="text-xs font-medium">{color.name}</p>
                      <p className="text-xs text-gray-500">{color.category}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Recommended Outfits */}
            <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>Outfits in Your Colors</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  {recommendedOutfits.map((outfit) => (
                    <div key={outfit.id} className="space-y-2">
                      <div className="aspect-[3/4] bg-gray-100 rounded-lg overflow-hidden">
                        <Image
                          src={outfit.image || "/placeholder.svg"}
                          alt={outfit.name}
                          width={150}
                          height={200}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <p className="font-medium text-sm">{outfit.name}</p>
                        <div className="flex gap-1 mt-1">
                          {outfit.colors.map((color, index) => (
                            <div
                              key={index}
                              className="w-4 h-4 rounded-full border border-gray-200"
                              style={{ backgroundColor: color }}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Button className="w-full bg-gradient-to-r from-pink-400 to-purple-500 hover:from-pink-500 hover:to-purple-600">
              Shop Your Colors
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
