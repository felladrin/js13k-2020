import { Text } from "kontra";
import { gameStore } from "../../stores/gameStore";

function getResourcesText() {
  return `Resources: ${gameStore.get().resources}`;
}

export const resourcesLabel = Text({
  x: 316,
  y: 11,
  text: getResourcesText(),
  font: "24px Arial",
  color: "white",
  anchor: { x: 0.5, y: 0.5 },
  textAlign: "center",
});

gameStore.on("@changed", () => {
  resourcesLabel.text = getResourcesText();
});
