import { Text } from "kontra";
import { gameStore } from "../../gameStore";
import { defaultFontFamily } from "../../constants";

function getResourcesText() {
  const gameState = gameStore.get();
  return `Resources\n${gameState.resources}\n⇧${gameState.resourcesCreatedPerTick} ⇩${gameState.resourcesConsumedPerTick}`;
}

export const resourcesLabel = Text({
  x: 190,
  y: 100,
  text: getResourcesText(),
  font: `38px ${defaultFontFamily}`,
  lineHeight: 1.3,
  color: "#83908f",
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
