import { Text } from "kontra";
import { gameStore } from "../../gameStore";

function getRestingText() {
  return `Resting: ${gameStore.get().resting}`;
}

export const restingLabel = Text({
  x: 916,
  y: 11,
  text: getRestingText(),
  font: "24px Arial",
  color: "white",
  anchor: { x: 0.5, y: 0.5 },
  textAlign: "center",
});

gameStore.on("@changed", () => {
  restingLabel.text = getRestingText();
});
