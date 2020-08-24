import { Scene } from "kontra";
import { getAllActionAreaLabels } from "./actionAreas";
import { mapArea } from "./mapArea";
import { gameStore, GameStoreAction } from "../../stores/gameStore";

export const mapScene = Scene({
  id: "map",
  children: [mapArea, ...getAllActionAreaLabels()],
});

gameStore.dispatch(GameStoreAction.AddUpdateCallback, () => {
  mapScene.update();
});

gameStore.dispatch(GameStoreAction.AddRenderCallback, () => {
  mapScene.render();
});
