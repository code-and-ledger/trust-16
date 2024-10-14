import { createSurfClient } from '@thalalabs/surf';
import { Aptos, AptosConfig, Account, Ed25519PrivateKey } from "@aptos-labs/ts-sdk";
import dotenv from 'dotenv';
import { HexString, Network } from 'aptos';
import { ABI } from '@/utils/abi';

// Load environment variables
dotenv.config();

// Create an Aptos client for the TESTNET network
const aptos = new Aptos(new AptosConfig({ network: Network.TESTNET }));

// Create a SurfClient with the Aptos client and ABI
const surfClient = createSurfClient(aptos).useABI(ABI);

const privateKeyHex = process.env.NEXT_PUBLIC_SESSION_MANAGER_PK || '';
if (!privateKeyHex) {
  throw new Error('Private key not found in environment variables');
}
const privateKeyBytes = HexString.ensure(privateKeyHex).toUint8Array();
const privateKey = new Ed25519PrivateKey(privateKeyBytes);
const account = Account.fromPrivateKey({ privateKey });

/**
 * Hook to prepare a short game using the admin wallet with Surf.
 * 
 * @param player_1 - The first player address.
 * @param player_2 - The second player address.
 * @returns An async function that executes the operation and returns the response.
 */
const useAdminPrepareShortGame = (player_1: string, player_2: string) => {
  const payload = async () => {
    try {
      // Execute the PREPARE_SHORT_GAME entry function using Surf
      const response = await surfClient.entry.admin_prepare_short_game({
        functionArguments: [[player_1, player_2] as any],
        typeArguments: [],
        account: account,
      });
      
      // Return the response from the entry function
      return response;
    } catch (error) {
      console.error('Failed to prepare short game:', error);
      throw error; // Rethrow the error if you want to handle it later
    }
  };

  return payload;
};

export default useAdminPrepareShortGame;
