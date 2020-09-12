import { Scene } from "kontra";
import { getAllActionAreaLabels } from "./actionAreas";
import { gameStore } from "../../gameStore";
import {
  daysPassedLabel,
  populationLabel,
  constructionSlotsLabel,
  foodLabel,
  resourcesLabel,
  requiredFoodAmountLabel,
  requiredResourcesAmountLabel,
} from "./labels";
import { GameScene } from "../../enums";
import { gameOverDialog } from "./gameOverDialog";
import {
  nextConstructionOptions,
  nextResearchOptions,
} from "./selectableOptions";

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
    requiredFoodAmountLabel,
    requiredResourcesAmountLabel,
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

  const labelsToToggle = [
    daysPassedLabel,
    populationLabel,
    constructionSlotsLabel,
  ];

  if (
    state.showingGameOverDialog &&
    !gamePlayScene.children.includes(gameOverDialog)
  ) {
    gamePlayScene.addChild(gameOverDialog);
    for (const labelToRemove of labelsToToggle) {
      gamePlayScene.removeChild(labelToRemove);
    }
  } else if (
    !state.showingGameOverDialog &&
    gamePlayScene.children.includes(gameOverDialog)
  ) {
    gamePlayScene.removeChild(gameOverDialog);
    for (const labelToAdd of labelsToToggle) {
      gamePlayScene.addChild(labelToAdd);
    }
  }

  if (state.hasShownGameOverDialog) {
    gamePlayScene.removeChild(requiredFoodAmountLabel);
    gamePlayScene.removeChild(requiredResourcesAmountLabel);
  }
});
