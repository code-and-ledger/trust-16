"use client";

import { Loader, Users, X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Image from 'next/image';
import InviteModal from '../../components/invite-modal';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

export default function MatchMakingPage() {
  
  const router = useRouter();
  const [isModalOpen, setModalOpen] = useState(false);
  const [invitationSent, setInvitationSent] = useState(false); // Track if the invitation was successful
  const [loading, setLoading] = useState(false); // Handle loading state
  const [gameDetails, setGameDetails] = useState<any>(null); // Store game details from the response

  // Function that handles the success event from the modal and prints the response
  const handleInviteSuccess = (response: any) => {
    setInvitationSent(true); // Update state after successful invitation
    setGameDetails(response); // Store the response for further use
    setModalOpen(false); // Close the modal after invite
  };

  const handleInviteFriend = () => {
    // console.log("Opening invite modal");
    setModalOpen(true); // Open modal
  };

  const handleCloseModal = () => {
    // console.log("Closing modal");
    setModalOpen(false); // Close modal
  };

  const handleCancel = () => {
    // console.log("Navigating to /landing");
    router.push('/landing'); // Navigate back to the landing page
  };

  const handleJoinGame = () => {
    // console.log("Joining game", gameDetails); // Use game details when joining
    setLoading(true);
    router.push('/short-game'); // Navigate to the game page
  };

  return (
    <div className="bg-black min-h-screen flex items-center justify-center p-4 font-mono">
      <Card className="w-full max-w-2xl bg-black text-white border-white">
        <CardHeader>
          <CardTitle className="text-2xl md:text-4xl text-center">Matchmaking</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
            
            {invitationSent ? (
              <>
              <p className="text-base md:text-lg text-center">
                Session ready!
              </p>
              <p className="text-xs md:text-base text-center text-muted-foreground">
                <a
                  href={`https://explorer.aptoslabs.com/object/${gameDetails?.session_id}?network=testnet`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline"
                >
                  info
                </a>
              </p>
              <div className="flex flex-col items-center">
                <div className="text-center mt-4">
                  <Image
                    src="/flinch.png"
                    alt="Opponent"
                    width={200}
                    height={200}
                    className="rounded-full mx-auto object-cover invert"
                  />
                  <p className="mt-2 text-sm md:text-base">Opponent</p>
                  <p className="text-xs md:text-base text-center text-muted-foreground">
                    {gameDetails?.players[1]}
                  </p>
                </div>
              </div>
              </>
            ) : (
              <>
              <p className="text-sm md:text-base text-center text-muted-foreground">
                Finding opponents. Please wait. Searching...
              </p>
              <p className="text-base md:text-lg text-center">
                Players online: <span className="font-bold">--</span>
              </p>
              <div className="flex justify-center">
                <div className="border border-white p-4 rounded-full">
                  <Loader className="animate-spin w-16 h-16 md:w-24 md:h-24" />
                </div>
              </div>
              <p className="text-base md:text-lg text-center">
                Estimated wait time: <span className="font-bold">--:--</span>
              </p>
          <div className="flex justify-between items-center px-4 md:px-10">
            <div className="text-center">
              <Image src="/flinch.png" alt="Player 1" width={75} height={75} className="rounded-full mx-auto" />
              <p className="mt-2 text-sm md:text-base">You</p>
              {/* TODO: display wallet address here */}
            </div>
              <div className="text-center">
                <div className="w-[75px] h-[75px] bg-gray-700 rounded-full flex items-center justify-center mx-auto">
                  <span className="text-2xl">?</span>
                </div>
                <p className="mt-2 text-sm md:text-base">Opponent</p>
              </div>
          </div>
            </>
            )}
        </CardContent>
        <CardFooter className="flex justify-between">
          {invitationSent ? (
            <Button
              onClick={handleJoinGame}
              className="bg-green-500 text-white border border-white px-4 py-2 rounded flex items-center text-sm md:text-base transition-all duration-300 ease-in-out"
              disabled={loading} // Disable button if loading
            >
              {loading ? 'Joining...' : 'Join Game'}
            </Button>
          ) : (
            <Button
              onClick={handleInviteFriend}
              className="bg-black text-white border border-white px-4 py-2 rounded flex items-center text-sm md:text-base transition-all duration-300 ease-in-out hover:bg-white hover:text-black hover:scale-105"
            >
              <Users className="w-5 h-5 mr-2" />
              <span>Invite friend</span>
            </Button>
          )}

          <Button
            variant="outline"
            onClick={handleCancel}
            className="bg-black text-white border border-white px-4 py-2 rounded flex items-center text-sm md:text-base transition-all duration-300 ease-in-out hover:bg-white hover:text-black hover:scale-105"
          >
            <span>Cancel</span>
            <X className="w-5 h-5 ml-2" />
          </Button>
        </CardFooter>
      </Card>

      {/* Modal Component */}
      <InviteModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onInviteSuccess={handleInviteSuccess} // Handle success to show "Join Game" button and save game details
      />
    </div>
  );
}
