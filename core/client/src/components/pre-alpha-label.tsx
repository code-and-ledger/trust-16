import { AlertTriangle } from 'lucide-react'

export default function PreAlphaLabel() {
  return (
    <div className="fixed top-0 left-0 w-full z-50 bg-yellow-400 text-black py-1 px-2 text-sm font-bold text-center shadow-md">
      <AlertTriangle className="inline-block mr-2 h-4 w-4" />
      Pre-Alpha: This game is in early development
    </div>
  )
}