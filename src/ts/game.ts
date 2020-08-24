import { GameLoop } from "kontra";
import "./imports";
import { gameStore } from "./gameStore";

export const game = GameLoop({
  update: (deltaTime) => {
    for (const gameUpdateCallback of gameStore.get().onUpdateCallbacks) {
      gameUpdateCallback(deltaTime);
    }
  },
  render: () => {
    for (const gameRenderCallback of gameStore.get().onRenderCallbacks) {
      gameRenderCallback();
    }
  },
});
