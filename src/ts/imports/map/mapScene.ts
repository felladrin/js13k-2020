import { Scene } from "kontra";
import { getAllActionAreaLabels } from "./actionAreas";
import { gameStore, GameStoreAction } from "../../gameStore";

export const mapScene = Scene({
  id: "map",
  children: [...getAllActionAreaLabels()],
});

gameStore.dispatch(GameStoreAction.AddUpdateCallback, () => {
  mapScene.update();
});

gameStore.dispatch(GameStoreAction.AddRenderCallback, () => {
  mapScene.render();
});
