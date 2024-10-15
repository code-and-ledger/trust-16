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
    // This is for PoC purposes only
    // in a real-world scenario, the hash should be generated using a pepper that is randomly generated and stored in a encrypted database
    const hash = is_cooperate 
    // cooperate
    // "0xa2bf74d4fbd95ade11cafd0add934a4bf100b028420cdd4a8eff2ac8794d489b" 
    ? "[162,191,116,212,251,217,90,222,17,202,253,10,221,147,74,75,241,0,176,40,66,12,221,74,142,255,42,200,121,77,72,155]"
    // compete
    // "0xb210061bf2f68ff0e66cc45646b5f61a5b681c3f310aee63b10c6c42e5bec6de";
    : "[178,16,6,27,242,246,143,240,230,108,196,86,70,181,246,26,91,104,28,63,49,10,238,99,177,12,108,66,229,190,198,222]";

    // Using the wallet hook
    const { signAndSubmitTransaction } = useWallet();

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
