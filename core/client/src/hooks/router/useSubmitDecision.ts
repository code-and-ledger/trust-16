import { ENDPOINTS, MODULE_NAMES, TRUST_16_TESTNET } from '../../utils/constants';
// import { hashWithPepper, storePepper } from '../../utils/encryption';
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
    is_cooperate: boolean
) => {
    let hash = ""; 
    if (is_cooperate) {
        // cooperate concatenated with pepper and hashed
        hash = "0xa2bf74d4fbd95ade11cafd0add934a4bf100b028420cdd4a8eff2ac8794d489b";
    } else {
        // compete concatenated with pepper and hashed
        hash = "0xb210061bf2f68ff0e66cc45646b5f61a5b681c3f310aee63b10c6c42e5bec6de";
    }

    // Using the wallet hook
    const { signAndSubmitTransaction } = useWallet();
    // console.log('account address:', accountAddress);

    // Define the payload function as async to use await
    const payload = async () => {
        try {
            // Stores decision hash with pepper
            // await storePepper(hash, pepper);
            console.log('Pepper stored successfully');

            // Create the payload for the transaction
            const response = await signAndSubmitTransaction({
                sender: accountAddress,
                data: {
                    function: `${TRUST_16_TESTNET}::${MODULE_NAMES.ROUTER}::${ENDPOINTS[MODULE_NAMES.ROUTER].SUBMIT_DECISION}` as any,
                    // function: "0xde34c33a63e37a84c44bb038893b5ed605c715736cd1da113931a47874455139::router::submit_decision",
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
