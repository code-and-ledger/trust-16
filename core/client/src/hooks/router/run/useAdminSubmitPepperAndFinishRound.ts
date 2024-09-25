import { ENDPOINTS, MODULE_NAMES } from '@/utils/constants';
import { useWallet } from '@aptos-labs/wallet-adapter-react';

const useAdminSubmitPepperAndFinishRound = (
    accountAddress: string,
    sessionID: string,
    roundIndex: number,
    pepper: string
) => {
    const { signAndSubmitTransaction } = useWallet();
    const payload = async () => {
        const response = await signAndSubmitTransaction({
            sender: accountAddress,
            data: {
                function: ENDPOINTS[MODULE_NAMES.ROUTER].SUBMIT_PEPPER_AND_FINISH_ROUND as `${string}::${string}::${string}`,
                typeArguments: [],
                functionArguments: [ sessionID, roundIndex, pepper ],
            }
        })
        console.log(response);
    }
    return payload;
}
export default useAdminSubmitPepperAndFinishRound;