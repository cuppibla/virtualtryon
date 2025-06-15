"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Moon, Sun } from "lucide-react"
import Link from "next/link"

export function TopNav() {
  const [isDark, setIsDark] = useState(false)

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
      <div className="flex items-center justify-between px-4 py-3">
        <Link
          href="/"
          className="text-xl font-bold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent"
        >
          StyleSwipe
        </Link>

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={() => setIsDark(!isDark)} className="rounded-full">
            {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </Button>

          <Link href="/profile">
            <Avatar className="w-8 h-8">
              <AvatarImage src="/placeholder.svg" />
              <AvatarFallback>U</AvatarFallback>
            </Avatar>
          </Link>
        </div>
      </div>
    </div>
  )
}
