"use client"

import { useState, useRef } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Heart, X, MessageCircle, Target, Users, Filter } from "lucide-react"
import Image from "next/image"
import { motion, useMotionValue, useTransform, type PanInfo } from "framer-motion"
import Link from "next/link"
import { TopNav } from "@/components/top-nav"
import { FloatingChat } from "@/components/floating-chat"

const outfitCards = [
  {
    id: 1,
    image: "/placeholder.svg?height=600&width=400",
    title: "Summer Breeze Ensemble",
    description: "White linen shirt with tapered chinos",
    occasion: "Casual",
    season: "Summer",
    price: "$89",
    tags: ["Minimalist", "Breathable", "Versatile"],
  },
  {
    id: 2,
    image: "/placeholder.svg?height=600&width=400",
    title: "Urban Explorer",
    description: "Oversized denim jacket with cargo pants",
    occasion: "Street",
    season: "Fall",
    price: "$156",
    tags: ["Streetwear", "Edgy", "Comfortable"],
  },
  {
    id: 3,
    image: "/placeholder.svg?height=600&width=400",
    title: "Office Chic",
    description: "Blazer with high-waisted trousers",
    occasion: "Professional",
    season: "All Season",
    price: "$234",
    tags: ["Professional", "Elegant", "Timeless"],
  },
]

export default function HomePage() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [cards, setCards] = useState(outfitCards)
  const cardRef = useRef<HTMLDivElement>(null)

  const x = useMotionValue(0)
  const rotate = useTransform(x, [-200, 200], [-25, 25])
  const opacity = useTransform(x, [-200, -100, 0, 100, 200], [0, 1, 1, 1, 0])

  const handleDragEnd = (event: any, info: PanInfo) => {
    if (info.offset.x > 100) {
      // Swiped right - like
      handleLike()
    } else if (info.offset.x < -100) {
      // Swiped left - pass
      handlePass()
    } else {
      // Snap back
      x.set(0)
    }
  }

  const handleLike = () => {
    setCurrentIndex((prev) => (prev + 1) % cards.length)
    x.set(0)
  }

  const handlePass = () => {
    setCurrentIndex((prev) => (prev + 1) % cards.length)
    x.set(0)
  }

  const currentCard = cards[currentIndex]

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50">
      <TopNav />

      <div className="px-4 pt-20 pb-24">
        {/* Filter Bar */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          <Button variant="outline" size="sm" className="rounded-full whitespace-nowrap">
            <Filter className="w-4 h-4 mr-2" />
            All
          </Button>
          <Badge variant="secondary" className="rounded-full">
            Casual
          </Badge>
          <Badge variant="secondary" className="rounded-full">
            Summer
          </Badge>
          <Badge variant="secondary" className="rounded-full">
            Under $100
          </Badge>
        </div>

        {/* Swipe Cards */}
        <div className="relative h-[600px] flex items-center justify-center mb-8">
          <motion.div
            ref={cardRef}
            className="absolute w-full max-w-sm"
            style={{ x, rotate, opacity }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            onDragEnd={handleDragEnd}
            whileDrag={{ scale: 1.05 }}
          >
            <Card className="overflow-hidden shadow-2xl border-0 bg-white/80 backdrop-blur-sm">
              <CardContent className="p-0">
                <div className="relative">
                  <Image
                    src={currentCard.image || "/placeholder.svg"}
                    alt={currentCard.title}
                    width={400}
                    height={600}
                    className="w-full h-96 object-cover"
                  />
                  <div className="absolute top-4 right-4">
                    <Badge className="bg-white/90 text-gray-800 rounded-full">{currentCard.price}</Badge>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">{currentCard.title}</h3>
                  <p className="text-gray-600 mb-4">{currentCard.description}</p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {currentCard.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="rounded-full text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex justify-between text-sm text-gray-500">
                    <span>{currentCard.occasion}</span>
                    <span>{currentCard.season}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-center gap-6 mb-8">
          <Button
            size="lg"
            variant="outline"
            className="rounded-full w-16 h-16 p-0 border-2 border-red-200 hover:bg-red-50"
            onClick={handlePass}
          >
            <X className="w-6 h-6 text-red-500" />
          </Button>
          <Button
            size="lg"
            className="rounded-full w-16 h-16 p-0 bg-gradient-to-r from-pink-400 to-purple-500 hover:from-pink-500 hover:to-purple-600"
            onClick={handleLike}
          >
            <Heart className="w-6 h-6" />
          </Button>
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-md border-t border-gray-200">
        <div className="flex justify-around py-4">
          <Link href="/stylist">
            <Button variant="ghost" className="flex flex-col gap-1 h-auto p-2">
              <MessageCircle className="w-5 h-5" />
              <span className="text-xs">Ask Stylist</span>
            </Button>
          </Link>
          <Link href="/challenge">
            <Button variant="ghost" className="flex flex-col gap-1 h-auto p-2">
              <Target className="w-5 h-5" />
              <span className="text-xs">Challenge</span>
            </Button>
          </Link>
          <Link href="/community">
            <Button variant="ghost" className="flex flex-col gap-1 h-auto p-2">
              <Users className="w-5 h-5" />
              <span className="text-xs">Community</span>
            </Button>
          </Link>
        </div>
      </div>

      <FloatingChat />
    </div>
  )
}
