import { ENDPOINTS, MODULE_NAMES, TRUST_16_TESTNET } from '@/utils/constants';
import { useWallet } from '@aptos-labs/wallet-adapter-react';

const useJoinGame = (accountAddress: string, sessionID: string) => {
  const { signAndSubmitTransaction } = useWallet();

  const payload = async () => {
    try {
      const response = await signAndSubmitTransaction({
        sender: accountAddress,
        data: {
          function: `${TRUST_16_TESTNET}::${MODULE_NAMES.ROUTER}::${ENDPOINTS[MODULE_NAMES.ROUTER].JOIN_GAME}`,
          typeArguments: [],
          functionArguments: [sessionID],
        }
      });
      console.log(response);
      return response;
    } catch (error) {
      console.error('Error joining game:', error);
      throw error;
    }
  };

  return payload;
};

export default useJoinGame;