"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Plus, Shirt, Palette, Calendar } from "lucide-react"
import { TopNav } from "@/components/top-nav"
import Image from "next/image"

const closetItems = [
  {
    id: 1,
    name: "White Linen Shirt",
    brand: "Everlane",
    category: "Tops",
    color: "White",
    image: "/placeholder.svg?height=150&width=150",
    timesWorn: 12,
    lastWorn: "3 days ago",
    tags: ["Work", "Casual", "Summer"],
  },
  {
    id: 2,
    name: "High-Waisted Jeans",
    brand: "Levi's",
    category: "Bottoms",
    color: "Blue",
    image: "/placeholder.svg?height=150&width=150",
    timesWorn: 8,
    lastWorn: "1 week ago",
    tags: ["Casual", "Weekend"],
  },
  {
    id: 3,
    name: "Blazer",
    brand: "Zara",
    category: "Outerwear",
    color: "Black",
    image: "/placeholder.svg?height=150&width=150",
    timesWorn: 5,
    lastWorn: "2 weeks ago",
    tags: ["Work", "Professional"],
  },
]

const outfitSuggestions = [
  {
    id: 1,
    name: "Office Ready",
    items: ["White Linen Shirt", "Blazer", "Trousers"],
    image: "/placeholder.svg?height=200&width=150",
  },
  {
    id: 2,
    name: "Weekend Casual",
    items: ["Graphic Tee", "High-Waisted Jeans", "Sneakers"],
    image: "/placeholder.svg?height=200&width=150",
  },
]

export default function ClosetPage() {
  const [selectedCategory, setSelectedCategory] = useState("All")
  const categories = ["All", "Tops", "Bottoms", "Outerwear", "Shoes", "Accessories"]

  const filteredItems =
    selectedCategory === "All" ? closetItems : closetItems.filter((item) => item.category === selectedCategory)

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50">
      <TopNav />

      <div className="px-4 pt-20 pb-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold">Your Closet</h1>
            <p className="text-gray-600">{closetItems.length} items</p>
          </div>
          <Button className="bg-gradient-to-r from-pink-400 to-purple-500 hover:from-pink-500 hover:to-purple-600 rounded-full">
            <Plus className="w-4 h-4 mr-2" />
            Add Item
          </Button>
        </div>

        <Tabs defaultValue="items" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 bg-white/80 backdrop-blur-sm">
            <TabsTrigger value="items" className="flex items-center gap-2">
              <Shirt className="w-4 h-4" />
              Items
            </TabsTrigger>
            <TabsTrigger value="outfits" className="flex items-center gap-2">
              <Palette className="w-4 h-4" />
              Outfits
            </TabsTrigger>
            <TabsTrigger value="stats" className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              Stats
            </TabsTrigger>
          </TabsList>

          <TabsContent value="items" className="space-y-6">
            {/* Category Filter */}
            <div className="flex gap-2 overflow-x-auto pb-2">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                  className="rounded-full whitespace-nowrap"
                >
                  {category}
                </Button>
              ))}
            </div>

            {/* Items Grid */}
            <div className="grid grid-cols-2 gap-4">
              {filteredItems.map((item) => (
                <Card key={item.id} className="shadow-lg border-0 bg-white/80 backdrop-blur-sm overflow-hidden">
                  <CardContent className="p-0">
                    <div className="aspect-square bg-gray-100">
                      <Image
                        src={item.image || "/placeholder.svg"}
                        alt={item.name}
                        width={150}
                        height={150}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-3 space-y-2">
                      <div>
                        <h3 className="font-semibold text-sm">{item.name}</h3>
                        <p className="text-xs text-gray-600">{item.brand}</p>
                      </div>

                      <div className="flex flex-wrap gap-1">
                        {item.tags.slice(0, 2).map((tag) => (
                          <Badge key={tag} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>

                      <div className="text-xs text-gray-500">
                        <p>Worn {item.timesWorn} times</p>
                        <p>Last: {item.lastWorn}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="outfits" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">Suggested Outfits</h2>
              <Button variant="outline" size="sm" className="rounded-full">
                Create New
              </Button>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {outfitSuggestions.map((outfit) => (
                <Card key={outfit.id} className="shadow-lg border-0 bg-white/80 backdrop-blur-sm overflow-hidden">
                  <CardContent className="p-0">
                    <div className="aspect-[3/4] bg-gray-100">
                      <Image
                        src={outfit.image || "/placeholder.svg"}
                        alt={outfit.name}
                        width={150}
                        height={200}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-3">
                      <h3 className="font-semibold text-sm mb-1">{outfit.name}</h3>
                      <p className="text-xs text-gray-600">{outfit.items.join(" • ")}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="stats" className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm">Most Worn</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gray-100 rounded-lg mx-auto mb-2">
                      <Image
                        src="/placeholder.svg?height=64&width=64"
                        alt="Most worn item"
                        width={64}
                        height={64}
                        className="w-full h-full object-cover rounded-lg"
                      />
                    </div>
                    <p className="text-xs font-medium">White Linen Shirt</p>
                    <p className="text-xs text-gray-500">12 times</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm">Favorite Brand</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-600">Everlane</div>
                    <p className="text-xs text-gray-500">3 items</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-sm">Weekly Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Items Added</span>
                    <span className="font-semibold">2</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Outfits Created</span>
                    <span className="font-semibold">5</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Times Styled</span>
                    <span className="font-semibold">8</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
