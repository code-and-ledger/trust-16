import React from 'react';
import { AptosWalletAdapterProvider, useWallet, Wallet, WalletName, WalletReadyState } from '@aptos-labs/wallet-adapter-react';
import { cn } from '@/lib/utils';

const WalletProvider: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  return (
    <AptosWalletAdapterProvider autoConnect={true}>
      {children}
    </AptosWalletAdapterProvider>
  );
};

export default WalletProvider;

export const WalletButtons = () => {
  const { wallets, connected, disconnect } = useWallet();

  if (!wallets || wallets.length === 0) {
    return <p>No wallets found</p>;
  }

  return (
    <div>
      {wallets.map((wallet, idx) => (
        <WalletView key={idx} wallet={wallet} />
      ))}
    </div>
  );
};

// Type guard to check if the wallet is of type `Wallet`
const isWallet = (wallet: any): wallet is Wallet => {
  return (wallet as Wallet).readyState !== undefined;
};

const WalletView = ({ wallet }: { wallet: Wallet | any }) => {
  const { connect } = useWallet();
  
  // Only proceed if the wallet is of type `Wallet`
  if (!isWallet(wallet)) {
    return <p>Invalid wallet</p>;
  }

  const isWalletReady =
    wallet.readyState === WalletReadyState.Installed ||
    wallet.readyState === WalletReadyState.Loadable;

  const onWalletConnectRequest = async (walletName: WalletName) => {
    try {
      console.log(`Attempting to connect to ${walletName}`);
      await connect(walletName);
      console.log(`Connected to ${walletName}`);
    } catch (error) {
      console.warn(error);
      window.alert("Failed to connect wallet");
    }
  };

  return (
    <button
      className={cn(
        "p-2 text-white rounded", // basic button styles
        isWalletReady ? "hover:bg-blue-700 bg-blue-500" : "opacity-50 cursor-not-allowed"
      )}
      disabled={!isWalletReady}
      onClick={() => onWalletConnectRequest(wallet.name)}
    >
      {isWalletReady ? `Connect ${wallet.name}` : `${wallet.name} Not Ready`}
    </button>
  );
};
