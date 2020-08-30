import { Text } from "kontra";
import { gameStore } from "../../gameStore";

function getResourcesText() {
  const gameState = gameStore.get();
  return `Resources: ${gameState.resources}\n⬆${gameState.resourcesCreatedPerTick} ⬇${gameState.resourcesConsumedPerTick}`;
}

export const resourcesLabel = Text({
  x: 316,
  y: 111,
  text: getResourcesText(),
  font: "24px Arial",
  color: "white",
  anchor: { x: 0.5, y: 0.5 },
  textAlign: "center",
});

gameStore.on("@changed", () => {
  resourcesLabel.text = getResourcesText();
});
