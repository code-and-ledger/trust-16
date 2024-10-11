import { useWallet, Wallet, WalletName, WalletReadyState } from '@aptos-labs/wallet-adapter-react';
import { useState } from 'react';
import LandingPage from '@/components/landing-page'; // Import the LandingPage component

export const WalletButton = () => {
  const { wallets, connected, disconnect } = useWallet();
  const [started, setStarted] = useState(false); // State to track if the "Start" button was clicked

  if (!wallets || wallets.length === 0) {
    return <p>No wallets found</p>;
  }

  const firstWallet = wallets[2]; // Select only aptos connect

  if (started) {
    // Render the LandingPage component once the "Start" button is clicked
    return <LandingPage />;
  }

  return (
    <div>
      {connected ? (
        <>
          <p>Connected</p>
          <button
            className="ml-4 p-2 text-white bg-blue-500 hover:bg-blue-700 rounded"
            disabled={!connected} // Disable the button if disconnected
            onClick={() => setStarted(true)} // When clicked, set "started" to true
          >
            Start
          </button>
          <button
            className="p-2 text-white bg-red-500 hover:bg-red-700 rounded"
            onClick={disconnect}
          >
            Disconnect
          </button>
        </>
      ) : (
        <WalletView wallet={firstWallet} />
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
      className={`p-2 text-white rounded ${
        isWalletReady ? 'hover:bg-blue-700 bg-blue-500' : 'opacity-50 cursor-not-allowed'
      }`}
      disabled={!isWalletReady}
      onClick={() => onWalletConnectRequest(wallet.name)}
    >
      {isWalletReady ? `Start` : `${wallet.name} Not Ready`}
    </button>
  );
};
