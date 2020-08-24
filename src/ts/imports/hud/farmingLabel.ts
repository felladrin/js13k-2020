import { Text } from "kontra";
import { gameStore } from "../../gameStore";

function getFarmingText() {
  return `Farming: ${gameStore.get().farming}`;
}

export const farmingLabel = Text({
  x: 116,
  y: 111,
  text: getFarmingText(),
  font: "24px Arial",
  color: "white",
  anchor: { x: 0.5, y: 0.5 },
  textAlign: "center",
});

gameStore.on("@changed", () => {
  farmingLabel.text = getFarmingText();
});
