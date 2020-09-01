import { Scene } from "kontra";
import { getAllActionAreaLabels } from "./actionAreas";
import { gameStore } from "../../gameStore";

export const mapScene = Scene({
  id: "map",
  children: [...getAllActionAreaLabels()],
});

gameStore.dispatch("addUpdateCallback", () => {
  mapScene.update();
});

gameStore.dispatch("addRenderCallback", () => {
  mapScene.render();
});
