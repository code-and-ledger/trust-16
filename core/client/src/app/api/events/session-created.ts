import {
    Aptos,
    GetEventsResponse,
  } from "@aptos-labs/ts-sdk";

  
  export async function sessionCreated(aptos: Aptos): Promise<GetEventsResponse> {
    /**
     * Get the event for a pre-sale created
     */
    const sessionCreatedEvent = await aptos.getModuleEventsByEventType({

    eventType: `0x4ea53251f99386571e1c48ff1ad595d84b8cb4c6ba814526990f560e9a90a3c7::router::SessionCreated`,
      minimumLedgerVersion: 0,
    });
  
    return sessionCreatedEvent;
  }
  