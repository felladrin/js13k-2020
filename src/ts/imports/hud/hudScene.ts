import { Scene } from "kontra";
import { buttons } from "./buttons";
import { daysPassedLabel } from "./daysPassedLabel";
import { foodLabel } from "./foodLabel";
import { resourcesLabel } from "./resourcesLabel";
import { populationLabel } from "./populationLabel";
import { gameStore, GameStoreAction } from "../../gameStore";
import {
  researchProgressLabel,
  constructionProgressLabel,
  explorationProgressLabel,
} from "./progressBars";

export const hudScene = Scene({
  id: "hud",
  children: [
    buttons,
    foodLabel,
    resourcesLabel,
    daysPassedLabel,
    populationLabel,
    researchProgressLabel,
    constructionProgressLabel,
    explorationProgressLabel,
  ],
});

gameStore.dispatch(GameStoreAction.AddUpdateCallback, () => {
  hudScene.update();
});

gameStore.dispatch(GameStoreAction.AddRenderCallback, () => {
  hudScene.render();
});
