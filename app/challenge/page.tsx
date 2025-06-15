"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Trophy, Target, Clock, Star } from "lucide-react"
import { TopNav } from "@/components/top-nav"

export default function ChallengePage() {
  const [currentChallenge] = useState({
    title: "Summer Style Quest",
    description: "Try 3 different summer outfits this week",
    progress: 2,
    total: 3,
    timeLeft: "3 days left",
    reward: "50 Style Points + 10% off next purchase",
    completedTasks: [
      { id: 1, name: "Beach Day Look", completed: true },
      { id: 2, name: "Summer Office Outfit", completed: true },
      { id: 3, name: "Evening Garden Party", completed: false },
    ],
  })

  const weeklyStats = {
    points: 340,
    rank: "Style Explorer",
    nextRank: "Fashion Guru",
    pointsToNext: 160,
  }

  const pastChallenges = [
    { name: "Monochrome Week", completed: true, points: 75 },
    { name: "Vintage Vibes", completed: true, points: 60 },
    { name: "Color Pop Challenge", completed: false, points: 0 },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50">
      <TopNav />

      <div className="px-4 pt-20 pb-8">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold mb-2">Style Challenges</h1>
          <p className="text-gray-600">Level up your fashion game</p>
        </div>

        {/* Current Challenge */}
        <Card className="mb-6 shadow-xl border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Target className="w-5 h-5 text-purple-500" />
                Current Challenge
              </CardTitle>
              <Badge variant="secondary" className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {currentChallenge.timeLeft}
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-bold text-lg mb-1">{currentChallenge.title}</h3>
              <p className="text-gray-600 text-sm">{currentChallenge.description}</p>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Progress</span>
                <span>
                  {currentChallenge.progress}/{currentChallenge.total} completed
                </span>
              </div>
              <Progress value={(currentChallenge.progress / currentChallenge.total) * 100} className="h-2" />
            </div>

            <div className="space-y-2">
              {currentChallenge.completedTasks.map((task) => (
                <div
                  key={task.id}
                  className={`flex items-center gap-3 p-2 rounded-lg ${task.completed ? "bg-green-50" : "bg-gray-50"}`}
                >
                  <div className={`w-4 h-4 rounded-full ${task.completed ? "bg-green-500" : "bg-gray-300"}`} />
                  <span className={`text-sm ${task.completed ? "text-green-700" : "text-gray-600"}`}>{task.name}</span>
                  {task.completed && (
                    <Badge variant="secondary" className="ml-auto text-xs">
                      ✓
                    </Badge>
                  )}
                </div>
              ))}
            </div>

            <div className="bg-purple-50 p-3 rounded-lg">
              <p className="text-sm font-medium text-purple-800">Reward:</p>
              <p className="text-sm text-purple-600">{currentChallenge.reward}</p>
            </div>

            <Button className="w-full bg-gradient-to-r from-pink-400 to-purple-500 hover:from-pink-500 hover:to-purple-600">
              Try On Next Look
            </Button>
          </CardContent>
        </Card>

        {/* Stats Card */}
        <Card className="mb-6 shadow-xl border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Trophy className="w-5 h-5 text-yellow-500" />
              Your Style Stats
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">{weeklyStats.points}</div>
                <div className="text-sm text-gray-600">Style Points</div>
              </div>
              <div className="text-center">
                <Badge className="bg-gradient-to-r from-pink-400 to-purple-500 text-white">{weeklyStats.rank}</Badge>
                <div className="text-sm text-gray-600 mt-1">Current Rank</div>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Progress to {weeklyStats.nextRank}</span>
                <span>{weeklyStats.pointsToNext} points to go</span>
              </div>
              <Progress value={70} className="h-2" />
            </div>
          </CardContent>
        </Card>

        {/* Past Challenges */}
        <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle>Challenge History</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {pastChallenges.map((challenge, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className={`w-3 h-3 rounded-full ${challenge.completed ? "bg-green-500" : "bg-gray-300"}`} />
                    <span className="text-sm font-medium">{challenge.name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {challenge.completed && (
                      <>
                        <Star className="w-4 h-4 text-yellow-500" />
                        <span className="text-sm text-gray-600">+{challenge.points} pts</span>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
