import { Scene } from "kontra";
import { idleText } from "../gameObjects/idleText";
import {
  gameLoopCallbacksStore,
  GameLoopCallbacksStoreAction,
} from "../stores/gameLoopCallbacksStore";

export const scene2 = Scene({
  id: "scene2",
  children: [idleText],
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
