import { Scene } from "kontra";
import { workingText } from "./workingText";
import { idleText } from "../map/idleText";

import {
  gameLoopCallbacksStore,
  GameLoopCallbacksStoreAction,
} from "../../stores/gameLoopCallbacksStore";

export const scene = Scene({
  id: "map",
  children: [idleText, workingText],
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
