"use client"

import { useWallet, Wallet, WalletName, WalletReadyState } from '@aptos-labs/wallet-adapter-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { LogOut, Play } from 'lucide-react'

export const WalletButton = () => {
  const { wallets, connected, disconnect } = useWallet()
  const router = useRouter()

  // Only "Continue with Google" is supported for now
  const googleWallet = wallets ? wallets.find((wallet) => wallet.name === "Continue with Google") : null

  if (!wallets || wallets.length === 0) {
    return <p className="text-white">No wallets found</p>
  }

  if (!googleWallet) {
    return <p className="text-white">Wallet not found</p>
  }

  return (
    <div className="space-y-4">
      {connected ? (
        <>
          <p className="text-white text-center">Connected</p>
          <div className="flex justify-center space-x-4">
            <Link href="/landing">
              <Button className="bg-black text-white border border-white px-4 py-2 rounded flex items-center text-sm transition-all duration-300 ease-in-out hover:bg-white hover:text-black hover:scale-105">
                <Play className="w-4 h-4 mr-2" />
                Start
              </Button>
            </Link>
            <Button
              onClick={disconnect}
              className="bg-black text-white border border-white px-4 py-2 rounded flex items-center text-sm transition-all duration-300 ease-in-out hover:bg-white hover:text-black hover:scale-105"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Disconnect
            </Button>
          </div>
        </>
      ) : (
        <WalletView wallet={googleWallet} />
      )}
    </div>
  )
}

const WalletView = ({ wallet }: { wallet: Wallet | any }) => {
  const { connect } = useWallet()

  const onWalletConnectRequest = async (walletName: WalletName) => {
    try {
      await connect(walletName)
    } catch (error) {
      console.warn(error)
      window.alert('Failed to connect wallet')
    }
  }

  const isWalletReady = wallet.readyState === WalletReadyState.Installed || wallet.readyState === WalletReadyState.Loadable

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
  )
}