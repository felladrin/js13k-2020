import { Text } from "kontra";
import { gameStore } from "../../gameStore";

function getConstructingText() {
  return `Constructing: ${gameStore.get().constructing}`;
}

export const constructingLabel = Text({
  x: 716,
  y: 111,
  text: getConstructingText(),
  font: "24px Arial",
  color: "white",
  anchor: { x: 0.5, y: 0.5 },
  textAlign: "center",
});

gameStore.on("@changed", () => {
  constructingLabel.text = getConstructingText();
});
