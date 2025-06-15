"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Trophy, TrendingUp, Heart, Star, Share } from "lucide-react"
import { TopNav } from "@/components/top-nav"
import Image from "next/image"

export default function SummaryPage() {
  const monthlyStats = {
    month: "November 2024",
    topBrands: [
      { name: "Everlane", percentage: 35, items: 7 },
      { name: "Zara", percentage: 25, items: 5 },
      { name: "Uniqlo", percentage: 20, items: 4 },
      { name: "H&M", percentage: 15, items: 3 },
      { name: "Levi's", percentage: 5, items: 1 },
    ],
    mostWornItem: {
      name: "White Linen Shirt",
      brand: "Everlane",
      timesWorn: 18,
      image: "/placeholder.svg?height=100&width=100",
    },
    styleEvolution: {
      dominant: "90s Prep",
      secondary: "Summer Streetwear",
      emerging: "Minimalist Chic",
    },
    achievements: [
      { name: "Color Coordinator", description: "Mastered color matching", icon: "🎨" },
      { name: "Trend Setter", description: "Tried 5 new trends", icon: "✨" },
      { name: "Sustainable Stylist", description: "Rewore items 50+ times", icon: "🌱" },
    ],
    nextLevel: {
      current: "Style Explorer",
      next: "Fashion Guru",
      progress: 75,
      pointsNeeded: 125,
    },
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50">
      <TopNav />

      <div className="px-4 pt-20 pb-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-gradient-to-r from-pink-400 to-purple-500 rounded-full mx-auto mb-4 flex items-center justify-center">
            <Trophy className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-3xl font-bold mb-2">Your Style Wrapped</h1>
          <p className="text-gray-600">{monthlyStats.month}</p>
        </div>

        <div className="space-y-6">
          {/* Top Brands */}
          <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Star className="w-5 h-5 text-yellow-500" />
                Your Top 5 Brands
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {monthlyStats.topBrands.map((brand, index) => (
                <div key={brand.name} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl font-bold text-purple-600">#{index + 1}</span>
                      <span className="font-semibold">{brand.name}</span>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold">{brand.percentage}%</div>
                      <div className="text-xs text-gray-500">{brand.items} items</div>
                    </div>
                  </div>
                  <Progress value={brand.percentage} className="h-2" />
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Most Worn Item */}
          <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Heart className="w-5 h-5 text-red-500" />
                Most Worn Item
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4">
                <div className="w-20 h-20 bg-gray-100 rounded-lg overflow-hidden">
                  <Image
                    src={monthlyStats.mostWornItem.image || "/placeholder.svg"}
                    alt={monthlyStats.mostWornItem.name}
                    width={100}
                    height={100}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-lg">{monthlyStats.mostWornItem.name}</h3>
                  <p className="text-gray-600">{monthlyStats.mostWornItem.brand}</p>
                  <div className="mt-2">
                    <Badge className="bg-gradient-to-r from-pink-400 to-purple-500 text-white">
                      Worn {monthlyStats.mostWornItem.timesWorn} times
                    </Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Style Evolution */}
          <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-green-500" />
                Your Style Evolution
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center">
                <div className="text-6xl mb-2">🎭</div>
                <h3 className="text-xl font-bold mb-1">{monthlyStats.styleEvolution.dominant}</h3>
                <p className="text-gray-600">Your dominant style this month</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-3 bg-purple-50 rounded-lg">
                  <div className="text-2xl mb-1">🌟</div>
                  <p className="font-semibold text-sm">{monthlyStats.styleEvolution.secondary}</p>
                  <p className="text-xs text-gray-600">Secondary style</p>
                </div>
                <div className="text-center p-3 bg-pink-50 rounded-lg">
                  <div className="text-2xl mb-1">🚀</div>
                  <p className="font-semibold text-sm">{monthlyStats.styleEvolution.emerging}</p>
                  <p className="text-xs text-gray-600">Emerging trend</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Achievements */}
          <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle>Style Achievements Unlocked</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {monthlyStats.achievements.map((achievement, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 p-3 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg"
                  >
                    <div className="text-2xl">{achievement.icon}</div>
                    <div>
                      <h4 className="font-semibold">{achievement.name}</h4>
                      <p className="text-sm text-gray-600">{achievement.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Level Progress */}
          <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle>Style Level Progress</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center">
                <Badge className="bg-gradient-to-r from-pink-400 to-purple-500 text-white mb-2">
                  {monthlyStats.nextLevel.current}
                </Badge>
                <p className="text-sm text-gray-600">
                  {monthlyStats.nextLevel.pointsNeeded} points to {monthlyStats.nextLevel.next}
                </p>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>{monthlyStats.nextLevel.current}</span>
                  <span>{monthlyStats.nextLevel.next}</span>
                </div>
                <Progress value={monthlyStats.nextLevel.progress} className="h-3" />
              </div>
            </CardContent>
          </Card>

          {/* Share Button */}
          <Button className="w-full bg-gradient-to-r from-pink-400 to-purple-500 hover:from-pink-500 hover:to-purple-600 py-6 text-lg">
            <Share className="w-5 h-5 mr-2" />
            Share Your Style Wrapped
          </Button>
        </div>
      </div>
    </div>
  )
}
