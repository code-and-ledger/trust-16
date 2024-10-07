import { ENDPOINTS, MODULE_NAMES } from '@/utils/constants';
import { deletePepper, getPepper } from '@/utils/encryption';
import { Account, CreateEd25519AccountFromPrivateKeyArgs, Ed25519PrivateKey } from '@aptos-labs/ts-sdk';
import { useWallet } from '@aptos-labs/wallet-adapter-react';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Load the private key from the environment variable
const adminPrivateKey = new Ed25519PrivateKey(process.env.SESSION_MANAGER_PK || '');
// Check if the private key is defined
if (!adminPrivateKey) {
    throw new Error('Admin wallet private key is not defined in the .env file');
  }
let args: CreateEd25519AccountFromPrivateKeyArgs = {
    privateKey: adminPrivateKey,
}
// Initialize the Aptos account using the private key
let account = Account.fromPrivateKey(args);

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
  hash: string
) => {
  const { signAndSubmitTransaction, connected } = useWallet();

  // Async function to handle the operation
  const payload = async (): Promise<{ success: boolean; message: string }> => {
    if (!connected) {
      return { success: false, message: 'Wallet is not connected' };
    }

    try {
      // Retrieve the pepper using the hash
      const pepper = await getPepper(hash);

      if (!pepper) {
        return { success: false, message: 'Pepper not found for the given hash' };
      }

      // Submit the transaction with the retrieved pepper
      const response = await signAndSubmitTransaction({
        sender: account.accountAddress,
        data: {
          function: ENDPOINTS[MODULE_NAMES.ROUTER].SUBMIT_PEPPER_AND_FINISH_ROUND as `${string}::${string}::${string}`,
          typeArguments: [],
          functionArguments: [sessionID, roundIndex, pepper],
        },
      });

      // Delete the pepper after the transaction is submitted
      await deletePepper(hash);

      console.log('Transaction response:', response);
      return { success: true, message: 'Transaction submitted successfully' };
    } catch (error) {
      console.error('Error submitting transaction:', error);
      return { success: false, message: `Error submitting transaction: ${error instanceof Error ? error.message : error}` };
    }
  };

  return payload;
};

export default useAdminSubmitPepperAndFinishRound;