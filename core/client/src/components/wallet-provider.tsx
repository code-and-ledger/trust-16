"use client";

import { AptosWalletAdapterProvider, useWallet } from "@aptos-labs/wallet-adapter-react";
import { PropsWithChildren } from "react";
import { Network } from "@aptos-labs/ts-sdk";
import { useAutoConnect } from "./auto-connect-provider";
import { useToast } from "./ui/use-toast";


export const WalletProvider = ({ children }: PropsWithChildren) => {
  const { autoConnect } = useAutoConnect();
  const { toast } = useToast();
  const { wallets, connected, disconnect } = useWallet();

  // Select "Continue with Google" only
  const googleWallet = wallets ? wallets.find((wallet) => wallet.name === "Continue with Google") : null;

  return (
    <AptosWalletAdapterProvider
    //   plugins={wallets}
      autoConnect={autoConnect}
      dappConfig={{
        network: Network.TESTNET,
        aptosApiKey: process.env.NEXT_PUBLIC_APTOS_API_KEY,
        aptosConnect: { dappId: "57fa42a9-29c6-4f1e-939c-4eefa36d9ff5" },
        mizuwallet: {
          manifestURL:
            "https://assets.mz.xyz/static/config/mizuwallet-connect-manifest.json",
        },
      }}
      onError={(error) => {
        toast({
          variant: "destructive",
          title: "Error",
          description: error || "Unknown wallet error",
        });
      }}
    >
      {children}
    </AptosWalletAdapterProvider>
  );
};