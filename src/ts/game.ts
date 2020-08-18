import { GameLoop } from "kontra";
import { scene } from "./scenes/scene";
import { population, fillPopulation } from "./game-objects/population";

export const game = GameLoop({
  update: () => {
    scene.update();
    fillPopulation();
    population.update();
  },
  render: () => {
    scene.render();
    population.render();
  },
});
