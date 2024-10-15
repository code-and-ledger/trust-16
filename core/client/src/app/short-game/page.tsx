'use client'

import { useState, useEffect } from "react"
import { Info } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Main from "@/components/main"
import { EvervaultCard } from "@/components/ui/evervault-card"
import useSubmitDecision from "@/hooks/router/useSubmitDecision"
import { useWallet } from "@aptos-labs/wallet-adapter-react"
import { useSearchParams } from "next/navigation"
import ColoredSquares from "@/components/ui/colored-squares"

// GameInfoDialog component (unchanged)
const GameInfoDialog = () => (
  <Dialog>
    <DialogTrigger asChild>
      <Button variant="ghost" size="sm" className="ml-2">
        <Info className="w-5 h-5" />
      </Button>
    </DialogTrigger>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Short Game Mode Rules</DialogTitle>
      </DialogHeader>
      <Tabs defaultValue="setup">
        <TabsList>
          <TabsTrigger value="setup">Setup</TabsTrigger>
          <TabsTrigger value="rounds">Rounds</TabsTrigger>
          <TabsTrigger value="distribution">Distribution</TabsTrigger>
        </TabsList>
        <TabsContent value="setup">
          <ul className="list-disc pl-5">
            <li>Each player deposits dp TRUST</li>
            <li>The rewards pool contributes cr TRUST</li>
            <li>Total Game Pool starts at 2dp + cr TRUST</li>
          </ul>
        </TabsContent>
        <TabsContent value="rounds">
          <p>The game consists of 5 rounds. In each round:</p>
          <ul className="list-disc pl-5">
            <li>Players simultaneously choose to either Cooperate (Green) or Compete (Red)</li>
            <li>Choices are revealed, and TRUST is redistributed based on the decisions</li>
          </ul>
        </TabsContent>
        <TabsContent value="distribution">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-200">
                <th className="border p-2">Scenario</th>
                <th className="border p-2">Player 1</th>
                <th className="border p-2">Player 2</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border p-2">Green-Green</td>
                <td className="border p-2">rc from deposit + rc from rewards pool</td>
                <td className="border p-2">rc from deposit + rc from rewards pool</td>
              </tr>
              <tr>
                <td className="border p-2">Red-Green</td>
                <td className="border p-2">Previous balance + Player 2's balance + rt from Player 2</td>
                <td className="border p-2">rc from rewards pool</td>
              </tr>
              <tr>
                <td className="border p-2">Red-Red</td>
                <td className="border p-2">0 TRUST</td>
                <td className="border p-2">0 TRUST</td>
              </tr>
            </tbody>
          </table>
        </TabsContent>
      </Tabs>
    </DialogContent>
  </Dialog>
)

// PlayerCard component (slightly modified)
const PlayerCard = ({ username, balance, isOpponent = false }) => (
  <div className={`text-center ${isOpponent ? 'text-black' : 'text-white'}`}>
    <div className="max-w-sm mx-auto relative h-[20rem]">
      <EvervaultCard imageUrl="/flinch.png" level={5} money={balance} isOpponent={isOpponent} />
    </div>
    <div className="text-xl mt-4">{username}</div>
    <div className="tracking-wider text-sm">
      {balance !== undefined ? `${balance} TRUST` : "◇◇◇◇◇◇◇◇◇◇"}
    </div>
  </div>
)

// ChoiceButtons component (unchanged)
interface ChoiceButtonsProps {
  playerChoice: boolean | null
  handlePlayerChoice: (choice: boolean) => void
  disabled: boolean
}

function ChoiceButtons({ playerChoice, handlePlayerChoice, disabled }: ChoiceButtonsProps) {
  return (
    <div className="flex justify-center space-x-8">
      <Button
        variant="outline"
        size="lg"
        className={`w-36 h-16 text-lg font-bold transition-all duration-300 ${
          playerChoice === true
            ? "bg-green-500 text-white scale-105"
            : "hover:bg-green-200 text-primary"
        }`}
        onClick={() => handlePlayerChoice(true)}
        disabled={disabled}
      >
        Cooperate
      </Button>
      <Button
        variant="outline"
        size="lg"
        className={`w-36 h-16 text-lg font-bold transition-all duration-300 ${
          playerChoice === false
            ? "bg-red-500 text-white scale-105"
            : "hover:bg-red-200 text-primary"
        }`}
        onClick={() => handlePlayerChoice(false)}
        disabled={disabled}
      >
        Compete
      </Button>
    </div>
  )
}

// RoundResult component (slightly modified)
const RoundResult = ({ playerChoice, opponentChoice }) => (
  <div className="flex justify-center items-center mb-8">
    <div className="flex rounded-full overflow-hidden">
      <div className="bg-white border-2 border-black p-4">
        <div className="text-3xl font-bold flex items-center">
          <span className="text-black">{playerChoice === true ? "G" : playerChoice === false ? "R" : "-"}</span>
        </div>
      </div>
      <div className="bg-black border-2 border-white p-4">
        <div className="text-3xl font-bold flex items-center">
          <span className="text-white">{opponentChoice === true ? "G" : opponentChoice === false ? "R" : "-"}</span>
        </div>
      </div>
    </div>
  </div>
)

export default function ShortGameMode() {
  const searchParams = useSearchParams()
  const sessionID = searchParams.get('sessionId') || ''
  const [round, setRound] = useState(0)
  const [playerChoice, setPlayerChoice] = useState<boolean | null>(null)
  const [opponentChoice, setOpponentChoice] = useState<boolean | null>(null)
  const [gamePool, setGamePool] = useState(100)
  const [playerBalance, setPlayerBalance] = useState(50)

  const { account } = useWallet()

  const submitDecision = useSubmitDecision(
    account?.address || '',
    sessionID,
    round,
    playerChoice || false
  )

  useEffect(() => {
    if (playerChoice !== null) {
      setTimeout(() => {
        setOpponentChoice(Math.random() > 0.5)
      }, 1000)
    }
  }, [playerChoice])

  const handlePlayerChoice = async (choice: boolean) => {
    setPlayerChoice(choice)
    try {
      if (account && submitDecision) {
        await submitDecision()
      }
    } catch (error) {
      console.error("Error submitting decision:", error)
    }
  }

  return (
    <div className="bg-background w-screen h-screen overflow-hidden relative">
      <div className="absolute top-0 bottom-0 right-1/2 bg-black transition-all duration-500 ease-in-out w-1/2 h-full" />
      <Main width="90vw" height="90vh">
        <div className="w-full h-full p-4 flex font-mono flex-col">
          {/* Header */}
          <div className="w-full flex flex-row items-center justify-between mb-8">
            <div className="text-white">
              <div className="text-3xl">Round {round + 1} of 1</div>
              <div className="text-xl">Game Pool: {gamePool} $TRUST</div>
            </div>
            <div className="text-black">
              <GameInfoDialog />
            </div>
          </div>

          {/* Round Result */}
          <RoundResult playerChoice={playerChoice} opponentChoice={opponentChoice} />

          {/* Main Game Area */}
          <div className="flex-1 flex">
            {/* Left half (black) */}
            <div className="w-1/2 text-white p-8 flex flex-col justify-between">
              <ColoredSquares 
                initialTitle="Player History" 
                pattern={['green', 'red', 'green', 'red', 'green', 'red', 'green', 'red', 'green']}
                alignLeft={true} 
              />
              <PlayerCard username="$username" balance={playerBalance} />
            </div>

            {/* Right half (white) */}
            <div className="w-1/2 text-black p-8 flex flex-col justify-between">
              <ColoredSquares 
                initialTitle="Opponent History" 
                pattern={['green', 'red', 'green', 'red', 'green', 'red', 'green', 'red', 'green']}
                alignLeft={false} 
              />
              <PlayerCard username="$opponent" balance={gamePool - playerBalance} isOpponent />
            </div>
          </div>

          {/* Choice Buttons */}
          <div className="mt-8">
            <ChoiceButtons
              playerChoice={playerChoice}
              handlePlayerChoice={handlePlayerChoice}
              disabled={opponentChoice !== null}
            />
          </div>
        </div>
      </Main>
    </div>
  )
}