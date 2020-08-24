import { Scene } from "kontra";
import { button } from "./button";
import { daysPassedLabel } from "./daysPassedLabel";
import { foodLabel } from "./foodLabel";
import { resourcesLabel } from "./resourcesLabel";
import { populationLabel } from "./populationLabel";
import { gameStore, GameStoreAction } from "../../gameStore";

export const hudScene = Scene({
  id: "hud",
  children: [
    button,
    foodLabel,
    resourcesLabel,
    daysPassedLabel,
    populationLabel,
  ],
});

gameStore.dispatch(GameStoreAction.AddUpdateCallback, () => {
  hudScene.update();
});

gameStore.dispatch(GameStoreAction.AddRenderCallback, () => {
  hudScene.render();
});
