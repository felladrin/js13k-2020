import { Text } from "kontra";
import { gameStore } from "../../gameStore";
import { defaultFontFamily } from "../../constants";

function getResourcesText() {
  const gameState = gameStore.get();
  const resources = gameState.resources.toLocaleString();
  const resourcesCreatedPerTick = gameState.resourcesCreatedPerTick.toLocaleString();
  const resourcesConsumedPerTick = gameState.resourcesConsumedPerTick.toLocaleString();
  return `RESOURCES\n${resources}\n⇧${resourcesCreatedPerTick} ⇩${resourcesConsumedPerTick}`;
}

export const resourcesLabel = Text({
  x: 210,
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
