import { Aptos, InputViewFunctionData, MoveValue } from '@aptos-labs/ts-sdk';
import { ENDPOINTS, MODULE_NAMES } from '@/utils/constants';

/**
 * Retrieves the hashed decision for a given session, round, and player.
 * 
 * @param aptos - An instance of the Aptos SDK.
 * @param sessionID - The ID of the session.
 * @param roundIndex - The index of the round.
 * @param playerAddress - The address of the player.
 * @returns The hashed decision or an empty array in case of an error.
 */
const getHashedDecision = async (
  aptos: Aptos,
  sessionID: string,
  roundIndex: number,
  playerAddress: string,
): Promise<MoveValue> => {
  try {
    const payload: InputViewFunctionData = {
      function: ENDPOINTS[MODULE_NAMES.MECHANICS].HASHED_DECISION as `${string}::${string}::${string}`,
      typeArguments: [],
      functionArguments: [sessionID, roundIndex, playerAddress],
    };

    const response = await aptos.view({ payload });

    return response;
  } catch (error) {
    console.error(`Error fetching hashed decision: `, error);
    return [];
  }
};

export default getHashedDecision;
