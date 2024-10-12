import { useWallet, Wallet, WalletName, WalletReadyState } from '@aptos-labs/wallet-adapter-react';
import { useState, useEffect } from 'react';
import Link from 'next/link'; // Import Next.js Link component
import { useRouter } from 'next/navigation'; // Import router for programmatic navigation

export const WalletButton = () => {
  const { wallets, connected, disconnect } = useWallet();
  const router = useRouter();

  // Select "Continue with Google" wallet
  const googleWallet = wallets ? wallets.find((wallet) => wallet.name === "Continue with Google") : null;

  if (!wallets || wallets.length === 0) {
    return <p>No wallets found</p>;
  }

  if (!googleWallet) {
    return <p>wallet not found</p>;
  }

  return (
    <div>
      {connected ? (
        <>
          <p>Connected</p>
          <Link href="/pages/landing">
            <button className="bg-blue-500 text-white py-2 px-4 rounded-lg">Start</button>
          </Link>
          <button
            className="p-2 text-white bg-red-500 hover:bg-red-700 rounded"
            onClick={disconnect}
          >
            Disconnect
          </button>
        </>
      ) : (
        <WalletView wallet={googleWallet} />
      )}
    </div>
  );
};

// Ensure WalletView is properly updated as before
const WalletView = ({ wallet }: { wallet: Wallet | any }) => {
  const { connect } = useWallet();

  const onWalletConnectRequest = async (walletName: WalletName) => {
    try {
      await connect(walletName);
    } catch (error) {
      console.warn(error);
      window.alert('Failed to connect wallet');
    }
  };

  const isWalletReady = wallet.readyState === WalletReadyState.Installed || wallet.readyState === WalletReadyState.Loadable;

  return (
    <button
      className={`p-2 text-black rounded ${
        isWalletReady ? 'text-3xl font-bold mt-4 mb-4' : 'opacity-50 cursor-not-allowed'
      }`}
      disabled={!isWalletReady}
      onClick={() => onWalletConnectRequest(wallet.name)}
    >
      {isWalletReady ? `Connect` : `${wallet.name} Not Ready`}
    </button>
  );
};
