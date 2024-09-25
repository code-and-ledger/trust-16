import { ENDPOINTS, MODULE_NAMES } from '@/utils/constants';
import { useWallet } from '@aptos-labs/wallet-adapter-react';

// Access fields / functions from the adapter
const { signAndSubmitTransaction } = useWallet();

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
