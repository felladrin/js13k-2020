import { Text } from "kontra";
import { gameStore } from "../../gameStore";

function getFoodText() {
  const gameState = gameStore.get();
  return `Food: ${gameState.food}\n⇧${gameState.foodCreatedPerTick} ⇩${gameState.foodConsumedPerTick}`;
}

export const foodLabel = Text({
  x: 106,
  y: 111,
  text: getFoodText(),
  font: "24px Arial",
  color: "white",
  anchor: { x: 0.5, y: 0.5 },
  textAlign: "center",
});

gameStore.on("@changed", () => {
  foodLabel.text = getFoodText();
});
