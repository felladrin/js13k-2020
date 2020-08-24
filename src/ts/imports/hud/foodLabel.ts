import { Text } from "kontra";
import { gameStore } from "../../gameStore";

function getFoodText() {
  return `Food: ${gameStore.get().food}`;
}

export const foodLabel = Text({
  x: 116,
  y: 11,
  text: getFoodText(),
  font: "24px Arial",
  color: "white",
  anchor: { x: 0.5, y: 0.5 },
  textAlign: "center",
});

gameStore.on("@changed", () => {
  foodLabel.text = getFoodText();
});
