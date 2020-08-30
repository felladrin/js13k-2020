import { Text } from "kontra";
import { gameStore } from "../../gameStore";

function getResourcesText() {
  const gameState = gameStore.get();
  const hasResourcesProfit =
    gameState.resourcesCreatedPerTick - gameState.resourcesConsumedPerTick > 0;
  return `Resources: ${gameState.resources}\n${hasResourcesProfit ? "⬆" : "⇧"}${
    gameState.resourcesCreatedPerTick
  } ${hasResourcesProfit ? "⇩" : "⬇"}${gameState.resourcesConsumedPerTick}`;
}

export const resourcesLabel = Text({
  x: 316,
  y: 50,
  text: getResourcesText(),
  font: "24px Arial",
  color: "white",
  anchor: { x: 0.5, y: 0.5 },
  textAlign: "center",
});

gameStore.on("@changed", () => {
  resourcesLabel.text = getResourcesText();
});
