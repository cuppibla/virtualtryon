"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Heart, MessageCircle, Repeat2, ShoppingBag, Crown } from "lucide-react"
import { TopNav } from "@/components/top-nav"
import Image from "next/image"

const communityPosts = [
  {
    id: 1,
    user: {
      name: "Sarah Chen",
      username: "@sarahstyles",
      avatar: "/placeholder.svg?height=40&width=40",
      badge: "Style Influencer",
      conversions: 23,
    },
    image: "/placeholder.svg?height=400&width=300",
    caption: "Perfect autumn vibes with this cozy knit and vintage denim! 🍂",
    tags: ["#AutumnStyle", "#VintageVibes", "#CozyKnits"],
    brands: ["Everlane", "Levi's"],
    likes: 234,
    comments: 18,
    shares: 12,
    price: "$89",
    liked: false,
  },
  {
    id: 2,
    user: {
      name: "Maya Rodriguez",
      username: "@mayafashion",
      avatar: "/placeholder.svg?height=40&width=40",
      badge: "Trendsetter",
      conversions: 45,
    },
    image: "/placeholder.svg?height=400&width=300",
    caption: "Mixing patterns like a pro! Who says stripes and florals can't be friends? 💫",
    tags: ["#PatternMixing", "#BoldChoices", "#StreetStyle"],
    brands: ["Zara", "H&M"],
    likes: 189,
    comments: 24,
    shares: 8,
    price: "$67",
    liked: true,
  },
]

export default function CommunityPage() {
  const [posts, setPosts] = useState(communityPosts)

  const toggleLike = (postId: number) => {
    setPosts((prev) =>
      prev.map((post) =>
        post.id === postId
          ? { ...post, liked: !post.liked, likes: post.liked ? post.likes - 1 : post.likes + 1 }
          : post,
      ),
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50">
      <TopNav />

      <div className="px-4 pt-20 pb-8">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold mb-2">Style Community</h1>
          <p className="text-gray-600">Get inspired by fellow fashion lovers</p>
        </div>

        <div className="space-y-6">
          {posts.map((post) => (
            <Card key={post.id} className="shadow-xl border-0 bg-white/80 backdrop-blur-sm overflow-hidden">
              {/* Post Header */}
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar className="w-10 h-10">
                      <AvatarImage src={post.user.avatar || "/placeholder.svg"} />
                      <AvatarFallback>{post.user.name[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-sm">{post.user.name}</span>
                        {post.user.conversions > 20 && <Crown className="w-4 h-4 text-yellow-500" />}
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-gray-500">{post.user.username}</span>
                        <Badge variant="secondary" className="text-xs">
                          {post.user.badge}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  <Badge className="bg-gradient-to-r from-pink-400 to-purple-500 text-white">{post.price}</Badge>
                </div>
              </CardHeader>

              {/* Post Image */}
              <CardContent className="p-0">
                <div className="relative">
                  <Image
                    src={post.image || "/placeholder.svg"}
                    alt="Style post"
                    width={300}
                    height={400}
                    className="w-full h-80 object-cover"
                  />
                  <div className="absolute top-4 left-4">
                    <div className="flex flex-wrap gap-1">
                      {post.brands.map((brand) => (
                        <Badge key={brand} className="bg-white/90 text-gray-800 text-xs">
                          {brand}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Post Content */}
                <div className="p-4 space-y-3">
                  {/* Action Buttons */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <Button variant="ghost" size="sm" onClick={() => toggleLike(post.id)} className="p-0 h-auto">
                        <Heart className={`w-5 h-5 ${post.liked ? "fill-red-500 text-red-500" : "text-gray-600"}`} />
                      </Button>
                      <Button variant="ghost" size="sm" className="p-0 h-auto">
                        <MessageCircle className="w-5 h-5 text-gray-600" />
                      </Button>
                      <Button variant="ghost" size="sm" className="p-0 h-auto">
                        <Repeat2 className="w-5 h-5 text-gray-600" />
                      </Button>
                    </div>
                    <Button
                      size="sm"
                      className="bg-gradient-to-r from-pink-400 to-purple-500 hover:from-pink-500 hover:to-purple-600 rounded-full"
                    >
                      <ShoppingBag className="w-4 h-4 mr-1" />
                      Buy This Look
                    </Button>
                  </div>

                  {/* Engagement Stats */}
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <span>{post.likes} likes</span>
                    <span>{post.comments} comments</span>
                    <span>{post.shares} shares</span>
                  </div>

                  {/* Caption */}
                  <div>
                    <p className="text-sm">
                      <span className="font-semibold">{post.user.username}</span> {post.caption}
                    </p>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1">
                    {post.tags.map((tag) => (
                      <span key={tag} className="text-xs text-blue-600 cursor-pointer hover:underline">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Load More */}
        <div className="text-center mt-8">
          <Button variant="outline" className="rounded-full">
            Load More Posts
          </Button>
        </div>
      </div>
    </div>
  )
}
