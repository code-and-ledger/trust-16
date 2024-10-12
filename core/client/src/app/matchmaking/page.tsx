"use client";
import { Users, Search, Loader, X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function MatchMakingPage() {
  const router = useRouter();

  const handleAccept = () => {
    router.push('/short-game'); // Navigate to short game mode
  };

  return (
    <div className="bg-black text-white p-4 w-screen h-screen flex justify-center items-center font-mono">
      <div className="border border-white p-6 rounded max-w-full w-full h-full flex flex-col justify-center items-center">
        <div className="text-center mb-6 border-b border-white pb-2 text-lg md:text-4xl w-full">
          Matchmaking
        </div>

        <div className="text-xs md:text-sm mb-6 text-center w-full">
          finding opponents. please wait. searching...
        </div>

        <div className="text-center mb-6 text-base md:text-lg w-full">
          Players online: 42
        </div>

        <div className="flex justify-center mb-6">
          <div className="border border-white p-4 rounded-full">
            <Loader className="animate-spin" size={64} />
          </div>
        </div>

        <div className="flex justify-around mb-6 w-full px-10">
          <div className="text-center text-sm md:text-base">
            <div>
                <Image src="/flinch.jpg" alt="Player 1" width={75} height={75} className="rounded-full" />
            </div>
            <div className="mt-2">You</div>
          </div>
          <div className="text-center flex items-center">
            <Search size={32} />
          </div>
          <div className="text-center text-sm md:text-base">
            <div>?<br />?<br />? ?</div>
            <div className="mt-2">Opponent</div>
          </div>
        </div>

        <div className="text-center mb-6 text-base md:text-lg w-full">
          Estimated wait time: 0:42
        </div>

        <div className="flex justify-between w-full px-10">
          <button onClick={handleAccept} className="border border-white px-4 py-2 rounded flex items-center text-sm md:text-base">
            Accept
          </button>
          <button className="border border-white px-4 py-2 rounded flex items-center text-sm md:text-base">
            <Users className="w-5 h-5 mr-2 md:w-6 md:h-6" />
            Invite friend
          </button>
          <button className="border border-white px-4 py-2 rounded flex items-center text-sm md:text-base">
            Cancel
            <X className="w-5 h-5 ml-2 md:w-6 md:h-6" />
          </button>
        </div>
      </div>
    </div>
  );
}
