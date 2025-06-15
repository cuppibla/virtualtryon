"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Camera, Upload, Save, Share, Heart } from "lucide-react"
import { TopNav } from "@/components/top-nav"
import Image from "next/image"

export default function VirtualTryOnPage() {
  const [selectedGarment, setSelectedGarment] = useState(0)
  const [currentPose, setCurrentPose] = useState(0)

  const garments = [
    { id: 1, name: "White Linen Shirt", brand: "Everlane", price: "$68" },
    { id: 2, name: "Denim Jacket", brand: "Levi's", price: "$89" },
    { id: 3, name: "Floral Dress", brand: "Zara", price: "$45" },
  ]

  const poses = ["Front View", "Side View", "Back View"]

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50">
      <TopNav />

      <div className="px-4 pt-20 pb-8">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold mb-2">Virtual Try-On</h1>
          <p className="text-gray-600">See how you look in different outfits</p>
        </div>

        {/* Camera/Upload Section */}
        <Card className="mb-6 shadow-xl border-0 bg-white/80 backdrop-blur-sm">
          <CardContent className="p-4">
            <div className="relative aspect-[3/4] bg-gray-100 rounded-xl overflow-hidden mb-4">
              <Image
                src="/placeholder.svg?height=600&width=450"
                alt="Virtual try-on preview"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />

              {/* Overlay garment info */}
              <div className="absolute bottom-4 left-4 right-4">
                <Badge className="bg-white/90 text-gray-800 mb-2">
                  {garments[selectedGarment].name} - {garments[selectedGarment].price}
                </Badge>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <Button variant="outline" className="flex items-center gap-2">
                <Camera className="w-4 h-4" />
                Live Camera
              </Button>
              <Button variant="outline" className="flex items-center gap-2">
                <Upload className="w-4 h-4" />
                Upload Photo
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Garment Selection */}
        <Card className="mb-6 shadow-xl border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-lg">Try Different Items</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-3 overflow-x-auto pb-2">
              {garments.map((garment, index) => (
                <div
                  key={garment.id}
                  className={`flex-shrink-0 p-3 rounded-xl border-2 cursor-pointer transition-all ${
                    selectedGarment === index ? "border-purple-400 bg-purple-50" : "border-gray-200 bg-white"
                  }`}
                  onClick={() => setSelectedGarment(index)}
                >
                  <div className="w-16 h-16 bg-gray-100 rounded-lg mb-2">
                    <Image
                      src="/placeholder.svg?height=64&width=64"
                      alt={garment.name}
                      width={64}
                      height={64}
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </div>
                  <p className="text-xs font-medium text-center">{garment.name}</p>
                  <p className="text-xs text-gray-500 text-center">{garment.price}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Pose Selection */}
        <Card className="mb-6 shadow-xl border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-lg">View Angles</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-2">
              {poses.map((pose, index) => (
                <Button
                  key={pose}
                  variant={currentPose === index ? "default" : "outline"}
                  size="sm"
                  onClick={() => setCurrentPose(index)}
                  className="rounded-full"
                >
                  {pose}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="grid grid-cols-3 gap-3">
          <Button variant="outline" className="flex flex-col gap-1 h-16 rounded-xl">
            <Save className="w-5 h-5" />
            <span className="text-xs">Save Try-On</span>
          </Button>
          <Button variant="outline" className="flex flex-col gap-1 h-16 rounded-xl">
            <Share className="w-5 h-5" />
            <span className="text-xs">Share</span>
          </Button>
          <Button variant="outline" className="flex flex-col gap-1 h-16 rounded-xl">
            <Heart className="w-5 h-5" />
            <span className="text-xs">Add to Wishlist</span>
          </Button>
        </div>
      </div>
    </div>
  )
}
