import { Scene } from "kontra";
import { gameStore } from "../../gameStore";
import { GameScene } from "../../enums";

export const endScene = Scene({
  id: GameScene.End,
  children: [],
});

gameStore.dispatch("addUpdateCallback", () => {
  endScene.update();
});

gameStore.dispatch("addRenderCallback", () => {
  endScene.render();
});
