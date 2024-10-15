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
 * Hook to submit pepper and finish the round using the admin wallet.
 * 
 * @param sessionID - The ID of the session.
 * @param roundIndex - The index of the round.
 * @param hash - The hash used to retrieve the stored pepper.
 * @returns An async function to execute the operation.
 */
const useAdminSubmitPepperAndFinishRound = (
  sessionID: string,
  roundIndex: number,
  // hash: string
) => {
  // This is for PoC purposes only 
  // in a real-world scenario, the pepper is randomly generated and stored in a encrypted database
  // 0x706570706572
  const hash = "[112,101,112,112,101,114]";
  const payload = async () => {
    try {
      // Execute the PREPARE_SHORT_GAME entry function using Surf
      const response = await surfClient.entry.admin_submit_pepper_and_finish_round({
        functionArguments: [sessionID as any, roundIndex, hash],
        typeArguments: [],
        account: account,
      });
      
      // Return the response from the entry function
      return response;
    } catch (error) {
      throw error;
    }
  };

  return payload;
};

export default useAdminSubmitPepperAndFinishRound;