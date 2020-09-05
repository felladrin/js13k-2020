import { Text } from "kontra";
import { gameStore } from "../../gameStore";
import { defaultFontFamily } from "../../constants";

function getFoodText() {
  const gameState = gameStore.get();
  return `Food: ${gameState.food}\n⇧${gameState.foodCreatedPerTick} ⇩${gameState.foodConsumedPerTick}`;
}

export const foodLabel = Text({
  x: 106,
  y: 50,
  text: getFoodText(),
  font: `24px ${defaultFontFamily}`,
  lineHeight: 1.3,
  color: "white",
  anchor: { x: 0.5, y: 0.5 },
  textAlign: "center",
});

gameStore.on("@changed", (state) => {
  if (state.food || state.foodCreatedPerTick || state.foodConsumedPerTick) {
    foodLabel.text = getFoodText();
  }
});
