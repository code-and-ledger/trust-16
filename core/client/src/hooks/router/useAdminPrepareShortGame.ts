import { ENDPOINTS, MODULE_NAMES } from '@/utils/constants';
import { useWallet } from '@aptos-labs/wallet-adapter-react';

const useAdminPrepareShortGame = (
    accountAddress: string,
    players: string[],
) => {
    const { signAndSubmitTransaction } = useWallet();
    const payload = async () => {
        const response = await signAndSubmitTransaction({
            sender: accountAddress,
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