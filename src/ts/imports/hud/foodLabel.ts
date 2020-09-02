import { Text } from "kontra";
import { gameStore } from "../../gameStore";

function getFoodText() {
  const gameState = gameStore.get();
  const hasFoodProfit =
    gameState.foodCreatedPerTick - gameState.foodConsumedPerTick > 0;
  return `Food: ${gameState.food}\n${hasFoodProfit ? "⬆" : "⇧"}${
    gameState.foodCreatedPerTick
  } ${hasFoodProfit ? "⇩" : "⬇"}${gameState.foodConsumedPerTick}`;
}

export const foodLabel = Text({
  x: 106,
  y: 50,
  text: getFoodText(),
  font: "24px Arial",
  color: "white",
  anchor: { x: 0.5, y: 0.5 },
  textAlign: "center",
});

gameStore.on("@changed", (state) => {
  if (state.food || state.foodCreatedPerTick || state.foodConsumedPerTick) {
    foodLabel.text = getFoodText();
  }
});
