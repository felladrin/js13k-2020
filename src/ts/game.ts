import { GameLoop } from "kontra";
import "./imports";
import { gameStore } from "./stores/gameStore";

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
