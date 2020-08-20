import { GameLoop } from "kontra";
import { gameLoopCallbacksStore } from "./stores/gameLoopCallbacksStore";
import "./imports";

export const game = GameLoop({
  update: (deltaTime) => {
    for (const gameUpdateCallback of gameLoopCallbacksStore.get().onUpdate) {
      gameUpdateCallback(deltaTime);
    }
  },
  render: () => {
    for (const gameRenderCallback of gameLoopCallbacksStore.get().onRender) {
      gameRenderCallback();
    }
  },
});
