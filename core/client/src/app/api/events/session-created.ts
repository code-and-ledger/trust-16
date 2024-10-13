import {
    AccountAddress,
    Aptos,
    AptosConfig,
    GetEventsResponse,
  } from "@aptos-labs/ts-sdk";
import { ENDPOINTS, MODULE_NAMES } from "../../../utils/constants";
  
  export async function sessionCreated(aptos: Aptos): Promise<GetEventsResponse> {
    /**
     * Get the event for a pre-sale created
     */
    const sessionCreatedEvent = await aptos.getModuleEventsByEventType({
      eventType: ENDPOINTS[MODULE_NAMES.ROUTER].SESSION_CREATED as `${string}::${string}::${string}`,
      minimumLedgerVersion: 0,
    });
  
    return sessionCreatedEvent;
  }
  