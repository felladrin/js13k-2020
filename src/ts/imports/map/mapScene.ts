import { Scene } from "kontra";

import {
  gameLoopCallbacksStore,
  GameLoopCallbacksStoreAction,
} from "../../stores/gameLoopCallbacksStore";
import { getAllActionAreaLabels } from "./actionAreas";
import { mapArea } from "./mapArea";

export const mapScene = Scene({
  id: "map",
  children: [mapArea, ...getAllActionAreaLabels()],
});

gameLoopCallbacksStore.dispatch(
  GameLoopCallbacksStoreAction.AddUpdateCallback,
  () => {
    mapScene.update();
  }
);

gameLoopCallbacksStore.dispatch(
  GameLoopCallbacksStoreAction.AddRenderCallback,
  () => {
    mapScene.render();
  }
);
