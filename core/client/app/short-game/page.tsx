import { Settings, Diamond } from 'lucide-react';
import Image from 'next/image';

export default function ShortGameMode() {
  return (
    <div className="bg-black text-white p-4 w-screen h-screen flex justify-center items-center font-mono">
      <div className="border border-white p-4 rounded max-w-full w-full h-full flex flex-col justify-center items-center">
        
        {/* Game Mode Title */}
        <div className="text-center mb-6 border-b border-white pb-2 text-lg md:text-4xl w-full">
          Short Game mode
        </div>

        {/* Announcement Section */}
        <div className="text-xs md:text-sm mb-6 text-center w-full">
          announcements. custom-messages. announcements.
        </div>

        {/* Rewards Pool Section */}
        <div className="text-center mb-6 text-base md:text-xl w-full">
          Rewards pool liquidity $$$
        </div>

        {/* Player Information Section */}
        <div className="flex justify-between items-center mb-6 w-full px-10">
          {/* Player 1 */}
          <div className="text-center">
            <div className="mb-2 text-sm md:text-lg">$username</div>
            <div className="tracking-wider text-xs md:text-base">◇◇◇◇◇◇◇◇◇◇</div>
          </div>
          
          {/* Round and Score */}
          <div className="text-center">
            <div className="border border-white p-2 rounded">
                <span className="text-sm md:text-lg">4</span>
              <Diamond className="inline-block mr-2 ml-2 w-4 h-4 md:w-6 md:h-6" />
              <span className="text-sm md:text-lg">4</span>
            </div>
            <div className="mt-2 text-sm md:text-lg">ROUND 6</div>
          </div>
          
          {/* Player 2 */}
          <div className="text-center">
            <div className="mb-2 text-sm md:text-lg">$username</div>
            <div className="tracking-wider text-xs md:text-base">◇◇◇◇◇◇◇◇◇◇</div>
          </div>
        </div>

        {/* Player Images */}
        <div className="flex justify-around mb-6 w-full px-10">
          <div>
            <Image src="/flinch.jpg" alt="Player 1" width={75} height={75} className="rounded-full" />
          </div>
          <div>
            <Image src="/flinch.jpg" alt="Player 2" width={75} height={75} className="transform scale-x-[-1] rounded-full" />
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-between w-full px-10">
          <button className="border border-white px-6 py-2 rounded flex items-center text-sm md:text-base">
            <Settings className="w-5 h-5 mr-2 md:w-6 md:h-6" />
            settings
          </button>
          <button className="border border-white px-6 py-2 rounded text-sm md:text-base">
            $trust
          </button>
          <button className="border border-white px-6 py-2 rounded flex items-center text-sm md:text-base">
            short
            <Diamond className="w-5 h-5 ml-2 md:w-6 md:h-6" />
          </button>
        </div>
      </div>
    </div>
  );
}
