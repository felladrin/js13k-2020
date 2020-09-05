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
import { GameScene } from "../../enums";

export const gamePlayScene = Scene({
  id: GameScene.GamePlay,
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
  if (gameStore.get().activeGameScenes.includes(GameScene.GamePlay)) {
    gamePlayScene.update();
  }
});

gameStore.dispatch("addRenderCallback", () => {
  if (gameStore.get().activeGameScenes.includes(GameScene.GamePlay)) {
    gamePlayScene.render();
  }
});
