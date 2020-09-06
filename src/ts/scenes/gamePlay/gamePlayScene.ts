import { Scene } from "kontra";
import { getAllActionAreaLabels } from "./actionAreas";
import { gameStore } from "../../gameStore";
import { daysPassedLabel } from "./daysPassedLabel";
import { foodLabel } from "./foodLabel";
import { resourcesLabel } from "./resourcesLabel";
import { populationLabel } from "./populationLabel";
import { GameScene } from "../../enums";
import { gameOverDialog } from "./gameOverDialog";

export const gamePlayScene = Scene({
  id: GameScene.GamePlay,
  hidden: true,
  children: [
    ...getAllActionAreaLabels(),
    foodLabel,
    resourcesLabel,
    daysPassedLabel,
    populationLabel,
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
  }
});
