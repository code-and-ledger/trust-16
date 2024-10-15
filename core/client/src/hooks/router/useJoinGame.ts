import { ENDPOINTS, MODULE_NAMES, TRUST_16_TESTNET } from '@/utils/constants';
import { useWallet } from '@aptos-labs/wallet-adapter-react';

const { signAndSubmitTransaction } = useWallet();

/**
 * Hook to join a game using the player's wallet.
 * 
 * @param accountAddress - The address of the player.
 * @param sessionID - The ID of the session.
 * @returns An async function to execute the operation.
 */
const useJoinGame = (
    accountAddress: string,
    sessionID: string
) => {
    const payload = async () => {
        const response = await signAndSubmitTransaction({
            sender: accountAddress,
            data: {
                function: `${TRUST_16_TESTNET}::${MODULE_NAMES.ROUTER}::${ENDPOINTS[MODULE_NAMES.ROUTER].JOIN_GAME}` as any,
                typeArguments: [],
                functionArguments: [ sessionID ],
            }
        })
        console.log(response);
    }
    return payload;
}
export default useJoinGame;
