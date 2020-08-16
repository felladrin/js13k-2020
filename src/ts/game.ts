import { GameLoop } from "kontra";
import { scene } from "./scenes/scene";

export const game = GameLoop({
  update: () => {
    scene.update();
  },
  render: () => {
    scene.render();
  },
});
