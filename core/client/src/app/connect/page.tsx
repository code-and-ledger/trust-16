'use client';
import React from 'react';
import { AptosWalletAdapterProvider } from "@aptos-labs/wallet-adapter-react";
import Image from 'next/image';
import { WalletButton } from '../wallet-button';

const ConnectPage: React.FC = () => {
  return (
    <AptosWalletAdapterProvider autoConnect={true}>
      <div className="bg-background w-screen h-screen flex items-center justify-center">
        <div className="text-center">
          <Image
            src="/trust16.svg"
            alt="Trust SVG"
            width={256}
            height={256}
          />
          <WalletButton />
        </div>
      </div>
    </AptosWalletAdapterProvider>
  );
};

export default ConnectPage;
