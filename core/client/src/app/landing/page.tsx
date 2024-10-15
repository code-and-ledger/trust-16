"use client";
import React, { useEffect, useState } from "react";
import { Card, CardContent } from "../../components/ui/card";
import Main from "../../components/main"; // Assuming Main component is in the same directory
import SplashScreen from "../../components/splash-screen";
import GameModeSelector from "../../components/game-mode-selector";
import PlayerDashboard from "../../components/ui/answer-history";
import { EvervaultCard } from "../../components/ui/evervault-card";
import { sessionCreated } from "../api/events/session-created";
import { Aptos, AptosConfig, Network } from "@aptos-labs/ts-sdk";

const LandingPage: React.FC = () => {
    const [totalGames, setTotalGames] = useState<number>(0);

    // Function to fetch the total games from the sessionCreated event
    const fetchTotalGames = async () => {
        try {
            const aptos = new Aptos(new AptosConfig({ network: Network.TESTNET }));
            const events = await sessionCreated(aptos); // Assuming sessionCreated is a valid function
            if (events.length > 0) {
                setTotalGames(events.length); // Total number of sessions created
            }
        } catch (error) {
            console.error("Error fetching total games:", error);
        }
    };

    // Fetch total games on component mount
    useEffect(() => {
        fetchTotalGames();
    }, []);

    return (
        <>
            {false && <SplashScreen />}
            <div className="bg-background w-screen h-screen overflow-hidden relative">
                <div className={`absolute top-0 bottom-0 right-1/2 bg-black transition-all duration-500 ease-in-out w-1/2 h-full`} />

                {true && (
                    <Main width="80vw" height="70vh">
                        <div className="w-full h-full p-4 flex flex-col gap-4">
                            {/* Active players, Total games, Power-up section */}
                            <div className="flex gap-4">
                                <Card className="bg-white flex-1 ">
                                    <CardContent className="p-2 flex justify-between items-center">
                                        <p className="text-sm font-semibold">Rewards pool in $:</p>
                                        <p className="text-lg font-bold">N/A</p>
                                    </CardContent>
                                </Card>
                                <Card className="flex-1">
                                    <CardContent className="p-3 flex flex-row justify-between items-center">
                                        <p className="text-sm font-semibold">Active players</p>
                                        <p className="text-lg font-bold">N/A</p>
                                    </CardContent>
                                </Card>
                                <Card className="flex-1 text-white bg-black">
                                    <CardContent className="p-3 flex flex-row justify-between items-center">
                                        <p className="text-sm font-semibold">Total games</p>
                                        <p className="text-lg font-bold">{totalGames}</p>
                                    </CardContent>
                                </Card>
                                <Card className="flex-1 text-white bg-black border-red-500">
                                    <CardContent className="p-3 flex flex-row justify-between items-center">
                                        <p className="text-sm font-semibold">Power-up</p>
                                        <p className="text-lg font-bold">Not available</p>
                                    </CardContent>
                                </Card>
                            </div>
                            {/* Middle section with game mode selector */}
                            <div className="flex-1 rounded-lg flex items-center justify-center">
                                <GameModeSelector />
                            </div>

                            {/* Bottom section with left and right sides */}
                            <div className="flex-grow flex">
                                {/* Left side with CryptoBackground and EvervaultCard */}
                                <div className="w-1/2  relative group flex items-center justify-center">
                                    <div className="relative z-10 p-4 flex flex-col items-center justify-center">
                                        <div className="max-w-sm mx-auto relative h-[20rem]">
                                            <EvervaultCard imageUrl="/flinch.png" level={5} money={10000} />
                                        </div>
                                    </div>
                                </div>

                                {/* Right side with Answer History */}
                                <div className="w-1/2  p-4 flex flex-col items-center justify-center">
                                    <PlayerDashboard answers={["trust", "bail", "bail", "trust", "bail", "bail", "trust", "bail", "bail"]} />
                                </div>
                            </div>
                        </div>
                    </Main>
                )}
            </div>
        </>
    );
};

export default LandingPage;
