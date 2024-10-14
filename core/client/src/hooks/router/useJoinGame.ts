import { ENDPOINTS, MODULE_NAMES } from '@/utils/constants';
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
                function: ENDPOINTS[MODULE_NAMES.ROUTER].JOIN_GAME as `${string}::${string}::${string}`,
                typeArguments: [],
                functionArguments: [ sessionID ],
            }
        })
        console.log(response);
    }
    return payload;
}
export default useJoinGame;
