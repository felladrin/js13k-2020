import { Scene } from "kontra";
import { getAllActionAreaLabels } from "./actionAreas";
import { gameStore } from "../../gameStore";
import { daysPassedLabel } from "./daysPassedLabel";
import { foodLabel } from "./foodLabel";
import { resourcesLabel } from "./resourcesLabel";
import { populationLabel } from "./populationLabel";
import { GameScene } from "../../enums";
import { gameOverDialog } from "./gameOverDialog";
import { nextConstructionOptions } from "./nextConstructionOptions";
import { nextResearchOptions } from "./nextResearchOptions";
import { constructionSlotsLabel } from "./constructionSlotsLabel";

export const gamePlayScene = Scene({
  id: GameScene.GamePlay,
  hidden: true,
  children: [
    ...getAllActionAreaLabels(),
    foodLabel,
    resourcesLabel,
    daysPassedLabel,
    populationLabel,
    constructionSlotsLabel,
    nextConstructionOptions,
    nextResearchOptions,
  ],
});

gameStore.dispatch("addUpdateCallback", () => {
  gamePlayScene.update();
});

gameStore.dispatch("addRenderCallback", () => {
  gamePlayScene.render();
});

gameStore.on("@changed", (state) => {
  if (state.activeGameScenes) {
    state.activeGameScenes.includes(GameScene.GamePlay)
      ? gamePlayScene.show()
      : gamePlayScene.hide();
  }

  if (
    state.showingGameOverDialog &&
    !gamePlayScene.children.includes(gameOverDialog)
  ) {
    gamePlayScene.addChild(gameOverDialog);
    gamePlayScene.removeChild(daysPassedLabel);
    gamePlayScene.removeChild(populationLabel);
    gamePlayScene.removeChild(constructionSlotsLabel);
  } else if (
    !state.showingGameOverDialog &&
    gamePlayScene.children.includes(gameOverDialog)
  ) {
    gamePlayScene.removeChild(gameOverDialog);
    gamePlayScene.addChild(daysPassedLabel);
    gamePlayScene.addChild(populationLabel);
    gamePlayScene.addChild(constructionSlotsLabel);
  }
});
