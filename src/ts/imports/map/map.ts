import { Scene } from "kontra";

import {
  gameLoopCallbacksStore,
  GameLoopCallbacksStoreAction,
} from "../../stores/gameLoopCallbacksStore";
import { getActionAreaLabel } from "./actionAreaLabels";
import { Action } from "../../enums";

export const scene = Scene({
  id: "map",
  children: [
    getActionAreaLabel(Action.Constructing),
    getActionAreaLabel(Action.Researching),
  ],
});

gameLoopCallbacksStore.dispatch(
  GameLoopCallbacksStoreAction.AddUpdateCallback,
  () => {
    scene.update();
  }
);

gameLoopCallbacksStore.dispatch(
  GameLoopCallbacksStoreAction.AddRenderCallback,
  () => {
    scene.render();
  }
);
