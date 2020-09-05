import { Scene } from "kontra";
import { daysPassedLabel } from "./daysPassedLabel";
import { foodLabel } from "./foodLabel";
import { resourcesLabel } from "./resourcesLabel";
import { populationLabel } from "./populationLabel";
import { gameStore } from "../../gameStore";
import {
  researchProgressLabel,
  constructionProgressLabel,
  explorationProgressLabel,
} from "./progressBars";

export const hudScene = Scene({
  id: "hud",
  children: [
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
  hudScene.update();
});

gameStore.dispatch("addRenderCallback", () => {
  hudScene.render();
});
