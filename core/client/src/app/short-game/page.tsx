"use client"
import { useState, useEffect } from 'react'
import { Settings, Diamond, Info } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Main from "../../components/main"
import { EvervaultCard } from "../../components/ui/evervault-card"


// GameInfoDialog component
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

// PlayerCard component
const PlayerCard = ({ username, balance, isOpponent = false }) => (
  <div className={`text-center`}>
    <div className="max-w-sm mx-auto relative h-[20rem]">
      {/* Conditionally apply the transform class to invert the image */}
      <EvervaultCard 
        imageUrl="/flinch.png" 
        level={5} 
        money={balance} 
        isOpponent={isOpponent}
      />
    </div>
    <div className="text-xl mt-4">{username}</div>
    <div className="tracking-wider text-sm">
      {balance !== undefined ? `${balance} TRUST` : '◇◇◇◇◇◇◇◇◇◇'}
    </div>
  </div>
)

// ChoiceButtons component
const ChoiceButtons = ({ playerChoice, setPlayerChoice, disabled }) => (
  <div className="flex justify-center space-x-8">
    <Button
      variant="outline"
      size="lg"
      className={`text-2xl text-primary font-bold transition-all duration-300 ${playerChoice === 'green' ? 'bg-green-500 text-white scale-110' : 'hover:bg-green-200'}`}
      onClick={() => setPlayerChoice('green')}
      disabled={disabled}
    >
      Cooperate
    </Button>
    <Button
      variant="outline"
      size="lg"
      className={` text-primary text-2xl font-bold transition-all duration-300 ${playerChoice === 'red' ? 'bg-red-500 text-white scale-110' : 'hover:bg-red-200'}`}
      onClick={() => setPlayerChoice('red')}
      disabled={disabled}
    >
      Compete
    </Button>
  </div>
)

// RoundResult component
const RoundResult = ({ playerChoice, opponentChoice }) => (
  <div className="flex justify-center items-center mb-8">
    <div className="flex rounded-full overflow-hidden">
      <div className="bg-white border-2 border-black p-4">
        <div className="text-3xl font-bold flex items-center">
          <span className="text-black">
            {playerChoice === 'green' ? 'G' : (playerChoice === 'red' ? 'R' : '-')}
          </span>
        </div>
      </div>
      <div className="bg-black border-2 border-white p-4">
        <div className="text-3xl font-bold flex items-center">
          <span className="text-white">
            {opponentChoice === 'green' ? 'G' : (opponentChoice === 'red' ? 'R' : '-')}
          </span>
        </div>
      </div>
    </div>
  </div>
)

export default function ShortGameMode() {
  const [round, setRound] = useState(1)
  const [playerChoice, setPlayerChoice] = useState<'green' | 'red' | null>(null)
  const [opponentChoice, setOpponentChoice] = useState<'green' | 'red' | null>(null)
  const [gamePool, setGamePool] = useState(100)
  const [playerBalance, setPlayerBalance] = useState(50)

  useEffect(() => {
    if (playerChoice) {
      setTimeout(() => {
        setOpponentChoice(Math.random() > 0.5 ? 'green' : 'red')
      }, 1000)
    }
  }, [playerChoice])


  // TODO: This is automatic should be done when the time of the round ends
  const advanceRound = () => {
    if (playerChoice === 'green' && opponentChoice === 'green') {
      setPlayerBalance(prev => prev + 10)
      setGamePool(prev => prev - 20)
    } else if (playerChoice === 'red' && opponentChoice === 'green') {
      setPlayerBalance(prev => prev + 20)
      setGamePool(prev => prev - 20)
    }

    if (round < 5) setRound(round + 1)
    setPlayerChoice(null)
    setOpponentChoice(null)
  }

  return (
    <div className="bg-background w-screen h-screen overflow-hidden relative">
      <div className="absolute top-0 bottom-0 right-1/2 bg-black transition-all duration-500 ease-in-out w-1/2 h-full" />
      <Main width="90vw" height="90vh">
        <div className="w-full h-full p-4 flex font-mono flex-col">
          <div className="w-full flex flex-row">
            {/* Left half (black) */}
            <div className="text-white w-1/2">
              <div className="text-3xl mb-4">Round {round} of 5</div>
              <div className="text-xl mb-6">
                Total Game Pool: {gamePool} TRUST
              </div>
            </div>
            {/* Right half (white) */}
            <div className="text-black w-1/2">
              <div className="flex text-black justify-end">
                <GameInfoDialog />
              </div>
            </div>
          </div>
          
          <div className="flex flex-row justify-center">
            <RoundResult playerChoice={playerChoice} opponentChoice={opponentChoice} />
          </div>
          
          <div className="w-full flex flex-row">
            {/* Left half (black) */}
            <div className="w-1/2 text-white p-8 flex flex-col">
              <div className="flex-1 flex flex-col justify-between">
                <PlayerCard username="$username" balance={playerBalance} />
                
                <ChoiceButtons
                  playerChoice={playerChoice}
                  setPlayerChoice={setPlayerChoice}
                  disabled={!!opponentChoice}
                />
              </div>
            </div>

            {/* Right half (white) */}
            <div className="w-1/2 text-black p-8 flex flex-col">
              <div className="flex-1 flex flex-col justify-between">
                <PlayerCard username="$opponent" balance={gamePool - playerBalance} isOpponent />

                <div className="flex justify-center mt-8">
                  <Button
                    variant="default"
                    size="lg"
                    className="px-8 py-4 text-xl"
                    onClick={advanceRound}
                    disabled={!playerChoice || !opponentChoice}
                  >
                    Next Round
                  </Button> 
                </div>
              </div>
            </div>
          </div>
        </div>
      </Main>
    </div>
  )
}
