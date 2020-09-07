import { Text } from "kontra";
import { gameStore } from "../../gameStore";
import { defaultFontFamily, gameWidth } from "../../constants";

function getFoodText() {
  const gameState = gameStore.get();
  const food = gameState.food.toLocaleString();
  const foodCreatedPerTick = gameState.foodCreatedPerTick.toLocaleString();
  const foodConsumedPerTick = gameState.foodConsumedPerTick.toLocaleString();
  return `FOOD\n${food}\n⇧${foodCreatedPerTick} ⇩${foodConsumedPerTick}`;
}

export const foodLabel = Text({
  x: gameWidth - 210,
  y: 100,
  text: getFoodText(),
  font: `38px ${defaultFontFamily}`,
  lineHeight: 1.3,
  color: "#83908f",
  anchor: { x: 0.5, y: 0.5 },
  textAlign: "center",
});

gameStore.on("@changed", (state) => {
  if (state.food || state.foodCreatedPerTick || state.foodConsumedPerTick) {
    foodLabel.text = getFoodText();
  }
});
