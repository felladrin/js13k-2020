import { Scene } from "kontra";
import {
  gameLoopCallbacksStore,
  GameLoopCallbacksStoreAction,
} from "../../stores/gameLoopCallbacksStore";
import { button } from "./button";
import { daysPassedLabel } from "./daysPassedLabel";

export const scene2 = Scene({
  id: "hud",
  children: [button, daysPassedLabel],
});

gameLoopCallbacksStore.dispatch(
  GameLoopCallbacksStoreAction.AddUpdateCallback,
  () => {
    scene2.update();
  }
);

gameLoopCallbacksStore.dispatch(
  GameLoopCallbacksStoreAction.AddRenderCallback,
  () => {
    scene2.render();
  }
);
