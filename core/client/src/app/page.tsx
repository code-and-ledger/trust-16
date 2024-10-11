'use client';
import React, { useState } from 'react';
import Image from "next/image";
import { Button } from "@/components/ui/button";
import PowerButton from '@/components/power-button';
import LandingPage from "@/components/landing-page";
import { WalletButton } from "@/components/wallet-provider";
import { AptosWalletAdapterProvider } from "@aptos-labs/wallet-adapter-react";

const Home: React.FC = () => {
  const [click, setClick] = useState(false);
  const handleClick = () => setClick(!click);

  return (
    <AptosWalletAdapterProvider autoConnect={true}>
      <div className="bg-background w-screen h-screen overflow-hidden relative">
        <div
          className={`absolute top-0 bottom-0 right-1/2 bg-black transition-all duration-500 ease-in-out ${
            click ? 'w-1/2 h-full' : 'w-0 h-0'
          }`}
        />
        <div className="p-8">
          <PowerButton />
          <Button
            variant="ghost"
            className={`absolute transform -translate-x-1/2 -translate-y-1/2 transition-all duration-1000 ease-in-out flex flex-col items-center justify-center bg-transparent hover:bg-transparent focus:bg-transparent active:bg-transparent p-0 ${
              click ? 'top-[90%] left-[94%]' : 'top-1/2 left-1/2'
            }`}
            onClick={handleClick}
          >
            <Image
              src="/trust16.svg"
              alt="logo"
              width={click ? 80 : 200}
              height={click ? 80 : 200}
            />
            {/* Conditionally render the WalletButton based on the click state */}
            {!click && (
              <span className="mt-4 text-current">
                <WalletButton />
              </span>
            )}
          </Button>
          <div className="absolute bottom-4 left-0 right-0 flex justify-evenly">
            {/* Additional elements or buttons */}
          </div>
        </div>
        {/* Render LandingPage component when `click` is true */}
        {click && <LandingPage />}
      </div>
    </AptosWalletAdapterProvider>
  );
};

export default Home;
