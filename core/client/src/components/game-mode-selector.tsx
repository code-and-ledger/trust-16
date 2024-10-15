"use client"

import React, { useState, useEffect } from 'react'
import GameModeCard from './game-mode-card'
import { useRouter } from 'next/navigation'

const gameModes = [
  { mode: "Campaign", inverted: true },
  { mode: "1-round", inverted: true },
  { mode: "5-minutes", inverted: false },
  { mode: "Tournament", inverted: false }
]

export default function GameModeSelector() {
  const [selectedMode, setSelectedMode] = useState<string | null>(null)
  const [isMatchmaking, setIsMatchmaking] = useState(false)
  const router = useRouter()

  useEffect(() => {
    if (selectedMode) {
      // Go to matchmaking first
      setIsMatchmaking(true)
      router.push('/matchmaking')

      // Simulate matchmaking process (you can replace this with real logic)
      const matchmakingTimer = setTimeout(() => {
        setIsMatchmaking(false)
        // After matchmaking, navigate to the selected game mode
        if (selectedMode === "1-round") {
          router.push('/short-game')
        }
      }, 3000) // Simulate 3 seconds of matchmaking

      return () => clearTimeout(matchmakingTimer)
    }
  }, [selectedMode, router])

  return (
    <div className="p-6 bg-transparent rounded-lg">
      <h3 className="text-lg font-semibold mb-4 text-white">Select Game Mode</h3>
      <div className="flex gap-6 flex-wrap justify-center">
        {gameModes.map((gameMode) => (
          <div
            key={gameMode.mode}
            onClick={() => gameMode.mode === "1-round" && setSelectedMode(gameMode.mode)}
            className={gameMode.mode !== "1-round" ? "disabled-mode" : "enabled-mode"}
          >
            <GameModeCard
              mode={gameMode.mode}
              inverted={gameMode.inverted}
            />
          </div>
        ))}
      </div>
    </div>
  )
}