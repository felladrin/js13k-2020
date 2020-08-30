import { Text } from "kontra";
import { gameStore } from "../../gameStore";

function getDaysPassedText() {
  return `Days Passed: ${gameStore.get().daysPassed}`;
}

export const daysPassedLabel = Text({
  x: 556,
  y: 111,
  text: getDaysPassedText(),
  font: "24px Arial",
  color: "white",
  anchor: { x: 0.5, y: 0.5 },
  textAlign: "center",
});

gameStore.on("@changed", () => {
  daysPassedLabel.text = getDaysPassedText();
});
