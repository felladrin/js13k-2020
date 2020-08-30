import { Text } from "kontra";
import { gameStore } from "../../gameStore";

function getPopulationText() {
  return `Population: ${gameStore.get().population}`;
}

export const populationLabel = Text({
  x: 786,
  y: 111,
  text: getPopulationText(),
  font: "24px Arial",
  color: "white",
  anchor: { x: 0.5, y: 0.5 },
  textAlign: "center",
});

gameStore.on("@changed", () => {
  populationLabel.text = getPopulationText();
});
