import { Scene } from "kontra";
import { workingText } from "./map/workingText";
import {
  gameLoopCallbacksStore,
  GameLoopCallbacksStoreAction,
} from "../stores/gameLoopCallbacksStore";

export const scene = Scene({
  id: "game",
  children: [workingText],
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
