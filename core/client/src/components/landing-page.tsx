import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Image from 'next/image';
import Main from './Main';  // Assuming Main component is in the same directory

const GameModeCard: React.FC<{ mode: string }> = ({ mode }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <Card
            className={`flex-1 w-32 cursor-pointer bg-transparent shadow-transparent border-transparent transition-all duration-300 ease-in-out ${isHovered ? 'scale-110' : ''}`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <CardContent className={`p-3 flex flex-col items-center justify-center transition-all duration-300 ease-in-out ${isHovered ? 'shadow-lg shadow-blue-200' : ''}`}>
                <Image src="/trust16.svg" alt={mode} width={50} height={50} className={`transition-all duration-300 ease-in-out ${isHovered ? 'brightness-110' : ''}`} />
                <p className={`mt-2 text-sm font-semibold transition-all duration-300 ease-in-out ${isHovered ? 'text-blue-600' : ''}`}>{mode}</p>
            </CardContent>
        </Card>
    );
};

const LandingPage: React.FC = () => {
    return (
        <Main width="80vw" height="70vh">
            <div className="w-full h-full p-4 flex flex-col gap-4">
                {/* Rewards pool liquidity */}
                <Card className="w-full">
                    <CardContent className="p-2 flex justify-between items-center">
                        <p className="text-sm font-semibold">Rewards pool liquidity</p>
                        <p className="text-lg font-bold">$$$$$$$$$$$$$$$$$$$$$$$$$</p>
                    </CardContent>
                </Card>

                {/* Active players, Total games, Power-up section */}
                <div className="flex gap-4">
                    <Card className="flex-1">
                        <CardContent className="p-3 flex flex-row justify-between items-center">
                            <p className="text-sm font-semibold">Active players</p>
                            <p className="text-lg font-bold">1,234</p>
                        </CardContent>
                    </Card>
                    <Card className="flex-1">
                        <CardContent className="p-3 flex flex-row justify-between items-center">
                            <p className="text-sm font-semibold">Total games</p>
                            <p className="text-lg font-bold">5,678</p>
                        </CardContent>
                    </Card>
                    <Card className="flex-1 border-red-500">
                        <CardContent className="p-3 flex flex-row justify-between items-center">
                            <p className="text-sm font-semibold">Power-up</p>
                            <p className="text-lg font-bold">Available</p>
                        </CardContent>
                    </Card>
                </div>
                <div className="flex-1  rounded-lg flex items-center justify-center">

                    {/* Game modes selector */}
                    <div className="flex-1 rounded-lg flex flex-col bg-white justify-between items-center pb-9" >
                        <h3 className="text-lg font-semibold mb-2">Select Game Mode</h3>
                        <div className="flex gap-4 flex-2">
                            <GameModeCard mode="Campaign" />
                            <GameModeCard mode="Short" />
                            <GameModeCard mode="5-minutes" />
                            <GameModeCard mode="Tournament" />
                        </div>
                    </div>
                </div>
            </div>
        </Main>
    );
};

export default LandingPage;