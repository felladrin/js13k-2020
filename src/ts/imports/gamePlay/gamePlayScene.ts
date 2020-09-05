import { Scene } from "kontra";
import { getAllActionAreaLabels } from "./actionAreas";
import { gameStore } from "../../gameStore";
import { daysPassedLabel } from "./daysPassedLabel";
import { foodLabel } from "./foodLabel";
import { resourcesLabel } from "./resourcesLabel";
import { populationLabel } from "./populationLabel";
import {
  researchProgressLabel,
  constructionProgressLabel,
  explorationProgressLabel,
} from "./progressBars";

export const gamePlayScene = Scene({
  id: "map",
  children: [
    ...getAllActionAreaLabels(),
    foodLabel,
    resourcesLabel,
    daysPassedLabel,
    populationLabel,
    researchProgressLabel,
    constructionProgressLabel,
    explorationProgressLabel,
  ],
});

gameStore.dispatch("addUpdateCallback", () => {
  gamePlayScene.update();
});

gameStore.dispatch("addRenderCallback", () => {
  gamePlayScene.render();
});
