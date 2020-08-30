import { GameLoop } from "kontra";
import { gameStore } from "./gameStore";
import { secondsPerGameTick } from "./constants";
import { tickStore, TickStoreAction } from "./tickStore";

let accumulatedDeltaTimeForTickCounting = 0;

export const game = GameLoop({
  update: (deltaTime) => {
    for (const gameUpdateCallback of gameStore.get().onUpdateCallbacks) {
      gameUpdateCallback(deltaTime);
    }

    accumulatedDeltaTimeForTickCounting += deltaTime ?? 0;
    if (accumulatedDeltaTimeForTickCounting > secondsPerGameTick) {
      accumulatedDeltaTimeForTickCounting -= secondsPerGameTick;
      tickStore.dispatch(TickStoreAction.IncrementTicksPassed);
    }
  },
  render: () => {
    for (const gameRenderCallback of gameStore.get().onRenderCallbacks) {
      gameRenderCallback();
    }
  },
});
