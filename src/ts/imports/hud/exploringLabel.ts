import { Text } from "kontra";
import { gameStore } from "../../gameStore";

function getExploringText() {
  return `Exploring: ${gameStore.get().exploring}`;
}

export const exploringLabel = Text({
  x: 916,
  y: 111,
  text: getExploringText(),
  font: "24px Arial",
  color: "white",
  anchor: { x: 0.5, y: 0.5 },
  textAlign: "center",
});

gameStore.on("@changed", () => {
  exploringLabel.text = getExploringText();
});
