import { EVENTS_NAMES, MODULE_NAMES, TRUST_16_TESTNET } from "@/utils/constants";
import {
    Aptos,
    GetEventsResponse,
  } from "@aptos-labs/ts-sdk";

  
  export async function sessionCreated(aptos: Aptos): Promise<GetEventsResponse> {
    /**
     * Get the event for a pre-sale created
     */
    const sessionCreatedEvent = await aptos.getModuleEventsByEventType({

    eventType: `0x71907fa0ce462844261c89c85711a9e20d906281f87dc95f6f9010ebe991bebb::${MODULE_NAMES.ROUTER}::${EVENTS_NAMES.SESSION_CREATED}` as any,
      minimumLedgerVersion: 0,
    });
  
    return sessionCreatedEvent;
  }
  