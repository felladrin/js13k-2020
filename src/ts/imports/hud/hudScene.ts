import { Scene } from "kontra";
import { buttons } from "./buttons";
import { daysPassedLabel } from "./daysPassedLabel";
import { foodLabel } from "./foodLabel";
import { resourcesLabel } from "./resourcesLabel";
import { populationLabel } from "./populationLabel";
import { gameStore, GameStoreAction } from "../../gameStore";
import { farmingLabel } from "./farmingLabel";
import { scavengingLabel } from "./scavengingLabel";
import { researchingLabel } from "./researchingLabel";
import { constructingLabel } from "./constructingLabel";
import { exploringLabel } from "./exploringLabel";
import { restingLabel } from "./restingLabel";

export const hudScene = Scene({
  id: "hud",
  children: [
    buttons,
    foodLabel,
    resourcesLabel,
    daysPassedLabel,
    populationLabel,
    farmingLabel,
    scavengingLabel,
    researchingLabel,
    constructingLabel,
    exploringLabel,
    restingLabel,
  ],
});

gameStore.dispatch(GameStoreAction.AddUpdateCallback, () => {
  hudScene.update();
});

gameStore.dispatch(GameStoreAction.AddRenderCallback, () => {
  hudScene.render();
});
