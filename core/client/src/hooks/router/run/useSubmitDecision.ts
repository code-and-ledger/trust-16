import { ENDPOINTS, MODULE_NAMES } from '@/utils/constants';
import { useWallet } from '@aptos-labs/wallet-adapter-react';

const useSubmitDecision = (
    accountAddress: string,
    sessionID: string,
    roundIndex: number,
    decision: string
) => {
    const { signAndSubmitTransaction } = useWallet();
    const payload = async () => {
        const response = await signAndSubmitTransaction({
            sender: accountAddress,
            data: {
                function: ENDPOINTS[MODULE_NAMES.ROUTER].SUBMIT_DECISION as `${string}::${string}::${string}`,
                typeArguments: [],
                functionArguments: [ sessionID, roundIndex, decision ],
            }
        })
        console.log(response);
    }
    return payload;
}
export default useSubmitDecision;