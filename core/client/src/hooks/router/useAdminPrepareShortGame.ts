import { ENDPOINTS, MODULE_NAMES } from '@/utils/constants';
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
 * Hook to prepare a short game using the admin wallet.
 * 
 * @param players - The list of player addresses.
 * @returns An async function to execute the operation.
 */
const useAdminPrepareShortGame = (
    players: string[],
) => {
    const { signAndSubmitTransaction } = useWallet();
    const payload = async () => {
        const response = await signAndSubmitTransaction({
            sender: account.accountAddress,
            data: {
                function: ENDPOINTS[MODULE_NAMES.ROUTER].PREPARE_SHORT_GAME as `${string}::${string}::${string}`,
                typeArguments: [],
                functionArguments: [ players ],
            }
        })
        console.log(response);
    }
    return payload;
}
export default useAdminPrepareShortGame;