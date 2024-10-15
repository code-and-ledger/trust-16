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

    eventType: `0xcf4bffccb2fda4d8bade961d03514d9daa06f2de0f43c8122ecbe1bbd6c9742::router::SessionCreated`,
      minimumLedgerVersion: 0,
    });
  
    return sessionCreatedEvent;
  }
  