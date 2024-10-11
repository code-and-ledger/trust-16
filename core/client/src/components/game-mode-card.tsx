"use client"

import React, { useState } from 'react'
import Image from 'next/image'
import { Card, CardContent } from "@/components/ui/card"

interface GameModeCardProps {
  mode: string
  inverted?: boolean
}

const GameModeCard: React.FC<GameModeCardProps> = ({ mode, inverted = false }) => {
  const [isHovered, setIsHovered] = useState(false)

  const baseCardClass = `bg-transparent flex-1 w-32 cursor-pointer transition-all duration-300 ease-in-out overflow-hidden`

  const baseContentClass = `p-3 flex flex-col items-center justify-center h-full`

  const baseImageClass = `transition-all duration-300 ease-in-out ${
    isHovered ? 'brightness-110' : ''
  }`

  const baseTextClass = `mt-2 text-sm font-semibold transition-all duration-300 ease-in-out`

  return (
    <Card
      className={`${baseCardClass} ${
        inverted
          ? 'bg-transparent border-white hover:bg-white/10'
          : 'bg-transparent border-gray-500 hover:bg-white/85'
      } ${
        isHovered
          ? 'scale-110 shadow-lg ' + (inverted ? 'shadow-gray-50' : 'shadow-gray-400')
          : ''
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <CardContent className={baseContentClass}>
        <Image
          src="/trust16.svg"
          alt={mode}
          width={50}
          height={50}
          className={`${baseImageClass} ${inverted ? 'filter invert' : ''}`}
        />
        <p
          className={`${baseTextClass} ${
            isHovered
              ? inverted
                ? 'text-blue-300'
                : 'text-blue-600'
              : inverted
              ? 'text-white'
              : 'text-black'
          }`}
        >
          {mode}
        </p>
      </CardContent>
    </Card>
  )
}

export default GameModeCard