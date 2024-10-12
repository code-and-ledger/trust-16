import { Settings, Diamond } from 'lucide-react'
import Image from "next/image";

export default function ShortGameMode() {
  return (
    <div className="bg-black text-white p-4 max-w-md mx-auto font-mono">
      <div className="border border-white p-4 rounded">
        <div className="text-center mb-4 border-b border-white pb-2">
          Short Game mode
        </div>
        
        <div className="text-xs mb-4 text-center">
          announcements. custom-messages. announcements.
        </div>
        
        <div className="text-center mb-4">
          Rewards pool liquidity $$$
        </div>
        
        <div className="flex justify-between mb-4">
          <div className="text-center">
            <div className="mb-2">current animal image</div>
            <div>◇◇◇◇◇◇◇◇◇◇</div>
          </div>
          <div className="text-center">
            <div className="border border-white p-2 rounded">
              <Diamond className="inline-block mr-2" />
              <span>4 1</span>
            </div>
            <div className="mt-2">ROUND 6</div>
          </div>
          <div className="text-center">
            <div className="mb-2">current animal image</div>
            <div>◇◇◇◇◇◇◇◇◇◇</div>
          </div>
        </div>
        
        <div className="flex justify-around mb-4">
        <Image
              src="/trust16.svg"
              alt="logo"
              width={onclick ? 80 : 200}
              height={onclick ? 80 : 200}
            />
          <Image
              src="/trust16.svg"
              alt="logo"
              width={onclick ? 80 : 200}
              height={onclick ? 80 : 200}
            />
        </div>
        
        <div className="flex justify-between">
          <button className="border border-white px-2 py-1 rounded flex items-center">
            <Settings className="w-4 h-4 mr-1" />
            settings
          </button>
          <button className="border border-white px-2 py-1 rounded">
            $trust
          </button>
          <button className="border border-white px-2 py-1 rounded flex items-center">
            short
            <Diamond className="w-4 h-4 ml-1" />
          </button>
        </div>
      </div>
    </div>
  )
}