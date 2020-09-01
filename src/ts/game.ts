import { GameLoop } from "kontra";
import { gameStore } from "./gameStore";
import { secondsPerGameTick } from "./constants";
import { tickStore } from "./tickStore";

let accumulatedDeltaTimeForTickCounting = 0;

export const game = GameLoop({
  update: (deltaTime) => {
    for (const gameUpdateCallback of gameStore.get().onUpdateCallbacks) {
      gameUpdateCallback(deltaTime);
    }

    if (deltaTime) {
      accumulatedDeltaTimeForTickCounting += deltaTime;
      if (accumulatedDeltaTimeForTickCounting > secondsPerGameTick) {
        accumulatedDeltaTimeForTickCounting -= secondsPerGameTick;
        tickStore.dispatch("incrementTicksPassed");
      }
    }
  },
  render: () => {
    for (const gameRenderCallback of gameStore.get().onRenderCallbacks) {
      gameRenderCallback();
    }
  },
});
