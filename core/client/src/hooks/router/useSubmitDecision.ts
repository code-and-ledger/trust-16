import { ENDPOINTS, MODULE_NAMES } from '@/utils/constants';
import { hashWithPepper, storePepper } from '@/utils/encryption';
import { useWallet } from '@aptos-labs/wallet-adapter-react';

/**
 * Hook to submit a decision using the player's wallet.
 * 
 * @param accountAddress - The address of the player.
 * @param sessionID - The ID of the session.
 * @param roundIndex - The index of the round.
 * @param decision - The decision to be submitted.
 * @returns An async function to execute the operation.
 */
const useSubmitDecision = (
    accountAddress: string,
    sessionID: string,
    roundIndex: number,
    decision: string
) => {
    // Destructure hash and pepper from hashWithPepper function
    const { hash, pepper } = hashWithPepper(decision);

    // Using the wallet hook
    const { signAndSubmitTransaction } = useWallet();

    // Define the payload function as async to use await
    const payload = async () => {
        try {
            // Stores decision hash with pepper
            await storePepper(hash, pepper);
            console.log('Pepper stored successfully');

            // Create the payload for the transaction
            const response = await signAndSubmitTransaction({
                sender: accountAddress,
                data: {
                    function: ENDPOINTS[MODULE_NAMES.ROUTER].SUBMIT_DECISION as `${string}::${string}::${string}`,
                    typeArguments: [],
                    functionArguments: [sessionID, roundIndex, hash],
                }
            });

            console.log(response);
        } catch (error) {
            console.error('Error submitting decision or storing pepper:', error);
        }
    };

    return payload;
};

export default useSubmitDecision;
