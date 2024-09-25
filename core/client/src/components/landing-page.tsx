import React, { useEffect, useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import Main from './main';  // Assuming Main component is in the same directory
import SplashScreen from './splash-screen';
import { EvervaultCard } from './ui/evervault-card';
import GameModeSelector from './game-mode-selector';
import PlayerDashboard from './ui/answer-history';
import { motion, useMotionTemplate, useMotionValue } from 'framer-motion';
const CryptoBackground = () => {
    let mouseX = useMotionValue(0);
    let mouseY = useMotionValue(0);

    const [randomString, setRandomString] = useState("");

    useEffect(() => {
        let str = generateRandomString(3000);
        setRandomString(str);
    }, []);

    function onMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent<HTMLDivElement>) {
        let { left, top } = currentTarget.getBoundingClientRect();
        mouseX.set(clientX - left);
        mouseY.set(clientY - top);

        const str = generateRandomString(3000);
        setRandomString(str);
    }

    let maskImage = useMotionTemplate`radial-gradient(150px at ${mouseX}px ${mouseY}px, white, transparent)`;
    let style = { maskImage, WebkitMaskImage: maskImage };

    return (
        <div className="absolute inset-0 overflow-hidden" onMouseMove={onMouseMove}>
            <div className="absolute inset-0 bg-black opacity-80"></div>
            <motion.div
                className="absolute inset-0 bg-gradient-to-r from-green-500 to-blue-700 opacity-0 group-hover:opacity-100 transition duration-500"
                style={style}
            />
            <motion.div
                className="absolute inset-0 opacity-0 mix-blend-overlay group-hover:opacity-100"
                style={style}
            >
                <p className="absolute inset-x-0 text-xs h-full break-words whitespace-pre-wrap text-white font-mono font-bold transition duration-500">
                    {randomString}
                </p>
            </motion.div>
        </div>
    );
};

const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
const generateRandomString = (length: number) => {
    let result = "";
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
};



const LandingPage: React.FC = () => {
    return (
        <>{false && <SplashScreen />}
            {true && <Main width="80vw" height="70vh">
                <div className="w-full h-full flex flex-col">
                    
                    {/* Top section with cards */}
                    <div className="flex-none p-4">
                        <div className="flex gap-4">
                            <Card className="bg-transparent text-white border-white flex-1">
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
                            <Card className="flex-1 text-white bg-gradient-to-r from-black to-red-900 border-red-500">
                                <CardContent className="p-3 flex flex-row justify-between items-center">
                                    <p className="text-sm font-semibold">Power-up</p>
                                    <p className="text-lg font-bold">Available</p>
                                </CardContent>
                            </Card>
                        </div>
                        
                    </div>

                    {/* Middle section with game mode selector */}
                    <div className="flex-none h-1/4 flex items-center justify-center">
                        <GameModeSelector />
                    </div>

                    {/* Bottom section with left and right sides */}
                    <div className="flex-grow flex">
                        {/* Left side with CryptoBackground and EvervaultCard */}
                        <div className="w-1/2 relative group flex items-center justify-center">
                            <CryptoBackground />
                            <div className="relative z-10 p-4 flex flex-col items-center justify-center">
                                <div className="max-w-sm mx-auto relative h-[20rem]">
                                    <EvervaultCard
                                        imageUrl="/chicken.jpg"
                                        level={5}
                                        money={10000}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Right side with Answer History */}
                        <div className="w-1/2 bg-white p-4 flex flex-col items-center justify-center">
                            <PlayerDashboard answers={['trust', 'bail', 'bail', 'trust', 'bail', 'bail', 'trust', 'bail', 'bail']} />
                        </div>
                    </div>
                </div>
            </Main>}
        </>
    );
};


export default LandingPage;
