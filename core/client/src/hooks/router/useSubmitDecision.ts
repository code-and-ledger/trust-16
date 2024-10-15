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
    // Utility function to convert hex string to byte array
    const hexToBytes = (hex: string) => {
        hex = hex.replace(/^0x/, ''); // Remove "0x" prefix if it exists
        const bytes = [];
        for (let i = 0; i < hex.length; i += 2) {
            bytes.push(parseInt(hex.substr(i, 2), 16));
        }
        return bytes;
    };

    // This is for PoC purposes only
    // In a real-world scenario, the hash should be generated using a pepper that is randomly generated and stored in an encrypted database
    const hash = is_cooperate 
        // cooperate
        ? hexToBytes("0xa2bf74d4fbd95ade11cafd0add934a4bf100b028420cdd4a8eff2ac8794d489b") 
        // compete
        : hexToBytes("0xa54e395960f659b2deace0d946fb838948d65b31a8daab6a7fab013181aa5c0c");

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