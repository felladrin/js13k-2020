import { Text } from "kontra";
import { gameStore } from "../../gameStore";

function getResearchingText() {
  return `Researching: ${gameStore.get().researching}`;
}

export const researchingLabel = Text({
  x: 516,
  y: 111,
  text: getResearchingText(),
  font: "24px Arial",
  color: "white",
  anchor: { x: 0.5, y: 0.5 },
  textAlign: "center",
});

gameStore.on("@changed", () => {
  researchingLabel.text = getResearchingText();
});
