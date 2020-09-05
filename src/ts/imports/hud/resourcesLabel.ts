import { Text } from "kontra";
import { gameStore } from "../../gameStore";
import { defaultFontFamily } from "../../constants";

function getResourcesText() {
  const gameState = gameStore.get();
  return `Resources: ${gameState.resources}\n⇧${gameState.resourcesCreatedPerTick} ⇩${gameState.resourcesConsumedPerTick}`;
}

export const resourcesLabel = Text({
  x: 316,
  y: 50,
  text: getResourcesText(),
  font: `24px ${defaultFontFamily}`,
  lineHeight: 1.3,
  color: "white",
  anchor: { x: 0.5, y: 0.5 },
  textAlign: "center",
});

gameStore.on("@changed", (state) => {
  if (
    state.resources ||
    state.resourcesCreatedPerTick ||
    state.resourcesConsumedPerTick
  ) {
    resourcesLabel.text = getResourcesText();
  }
});
