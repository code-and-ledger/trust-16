"use client"

import React, { useState } from 'react'
import GameModeCard from './game-mode-card'

const gameModes = [
  { mode: "Campaign", inverted: true },
  { mode: "Short", inverted: true },
  { mode: "5-minutes", inverted: false },
  { mode: "Tournament", inverted: false }
]

export default function GameModeSelector() {
  const [selectedMode, setSelectedMode] = useState<string | null>(null)

  return (
    <div className="p-6 bg-transparent rounded-lg ">
      <h3 className="text-lg font-semibold mb-4 text-white">Select Game Mode</h3>
      <div className="flex gap-6 flex-wrap justify-center">
        {gameModes.map((gameMode) => (
          <div
            key={gameMode.mode}
            onClick={() => setSelectedMode(gameMode.mode)}
            className={``}
          >
            <GameModeCard
              mode={gameMode.mode}
              inverted={gameMode.inverted}
            />
          </div>
        ))}
      </div>
      {/* {selectedMode && (
        <p className="mt-4 text-center text-white">
          Selected mode: <span className="font-semibold">{selectedMode}</span>
        </p>
      )} */}
    </div>
  )
}