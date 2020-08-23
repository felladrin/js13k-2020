import { Scene } from "kontra";

import {
  gameLoopCallbacksStore,
  GameLoopCallbacksStoreAction,
} from "../../stores/gameLoopCallbacksStore";
import { getAllActionAreaLabels } from "./actionAreas";
import { mapArea } from "./mapArea";

export const scene = Scene({
  id: "map",
  children: [mapArea, ...getAllActionAreaLabels()],
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
