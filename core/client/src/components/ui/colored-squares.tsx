import React, { useState } from 'react'

interface SquareProps {
  color: 'green' | 'red'
}

const Square: React.FC<SquareProps> = ({ color }) => (
  <div
    className={`w-4 h-4 transform rotate-45 border-2 border-white ${
      color === 'green' ? 'bg-green-500' : 'bg-red-500'
    }`}
  >
    <div className="w-full h-full grid grid-cols-3 grid-rows-3">
      {[...Array(9)].map((_, i) => (
        <div key={i} className="border-[0.5px] border-opacity-30 border-black" />
      ))}
    </div>
  </div>
)

interface ColoredSquaresProps {
  initialTitle?: string
  pattern?: ('green' | 'red')[]
  alignLeft?: boolean
}

export default function ColoredSquares({ 
  initialTitle = "Colored Squares", 
  pattern = ['red', 'green', 'green', 'red', 'red', 'green', 'red', 'green', 'green'],
  alignLeft = true
}: ColoredSquaresProps = {}) {
  const [title, setTitle] = useState(initialTitle)

  return (
    <div className={`p-4 rounded-lg shadow-lg max-w-sm mx-auto ${alignLeft ? 'bg-black' : 'bg-white'}`}>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className={`w-full text-sm font-semibold mb-3 bg-transparent focus:outline-none ${
          alignLeft ? 'text-left text-white' : 'text-right text-black'
        }`}
      />
      <div className="flex flex-wrap items-center justify-center gap-1">
        {pattern.map((color, index) => (
          <div key={index} className="w-6 h-6 flex items-center justify-center">
            <Square color={color} />
          </div>
        ))}
      </div>
    </div>
  )
}