import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import Image from 'next/image';
import Main from './Main';  // Assuming Main component is in the same directory
import SplashScreen from './splash-screen';
import { EvervaultCard} from './ui/evervault-card';
import GameModeSelector from './game-mode-selector';

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
        <>{false && <SplashScreen />}
            {true && <Main width="80vw" height="70vh">

                <div className="w-full h-full p-4 flex flex-col gap-4">
                    {/* Rewards pool liquidity */}


                    {/* Active players, Total games, Power-up section */}
                    <div className="flex gap-4">
                        <Card className="bg-white flex-1 ">
                            <CardContent className="p-2 flex justify-between items-center">
                                <p className="text-sm font-semibold">Rewards pool liquidity</p>
                                <p className="text-lg font-bold">$$$$$$$$$$$</p>
                            </CardContent>
                        </Card>
                        <Card className="flex-1">
                            <CardContent className="p-3 flex flex-row justify-between items-center">
                                <p className="text-sm font-semibold">Active players</p>
                                <p className="text-lg font-bold">1,234</p>
                            </CardContent>
                        </Card>
                        <Card className="flex-1 text-white bg-black">
                            <CardContent className="p-3 flex flex-row justify-between items-center">
                                <p className="text-sm font-semibold">Total games</p>
                                <p className="text-lg font-bold">5,678</p>
                            </CardContent>
                        </Card>
                        <Card className="flex-1 text-white bg-black border-red-500">
                            <CardContent className="p-3 flex flex-row justify-between items-center">
                                <p className="text-sm font-semibold">Power-up</p>
                                <p className="text-lg font-bold">Available</p>
                            </CardContent>
                        </Card>
                    </div>
                    <div className="flex-1 rounded-lg flex items-center justify-center">
                            <GameModeSelector   />
                    </div>
                    <div className="w-full flex justify-start">
                        <div className="w-1/2 flex items-center justify-center">
                            <div className="max-w-sm mx-auto relative h-[20rem] mb-10">
                                <EvervaultCard
                                    imageUrl="/chicken.jpg"
                                    level={5}
                                    money={10000}
                                />
                            </div>
                        </div>
                    </div>



                </div>
            </Main>}
        </>
    );
};

export default LandingPage;