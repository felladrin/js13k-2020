import { Scene } from "kontra";
import {
  gameLoopCallbacksStore,
  GameLoopCallbacksStoreAction,
} from "../../stores/gameLoopCallbacksStore";
import { button } from "./button";
import { daysPassedLabel } from "./daysPassedLabel";
import { foodLabel } from "./foodLabel";
import { resourcesLabel } from "./resourcesLabel";
import { populationLabel } from "./populationLabel";

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

gameLoopCallbacksStore.dispatch(
  GameLoopCallbacksStoreAction.AddUpdateCallback,
  () => {
    hudScene.update();
  }
);

gameLoopCallbacksStore.dispatch(
  GameLoopCallbacksStoreAction.AddRenderCallback,
  () => {
    hudScene.render();
  }
);
