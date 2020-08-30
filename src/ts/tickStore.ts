import { createStoreon, StoreonModule } from "storeon";
import { TickState } from "./declarations";

export enum TickStoreAction {
  IncrementTicksPassed,
}

const tickStoreModule: StoreonModule<TickState> = (store) => {
  store.on("@init", () => ({
    ticksPassed: 0,
  }));

  store.on(TickStoreAction.IncrementTicksPassed, ({ ticksPassed }) => ({
    ticksPassed: ticksPassed + 1,
  }));
};

export const tickStore = createStoreon<TickState>([tickStoreModule]);
