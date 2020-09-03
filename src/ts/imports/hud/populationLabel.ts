import { Text } from "kontra";
import { gameStore } from "../../gameStore";
import { defaultFontFamily } from "../../constants";

function getPopulationText(population: number) {
  return `Population: ${population}`;
}

export const populationLabel = Text({
  x: 786,
  y: 50,
  text: getPopulationText(gameStore.get().population),
  font: `24px ${defaultFontFamily}`,
  color: "white",
  anchor: { x: 0.5, y: 0.5 },
  textAlign: "center",
});

gameStore.on("@changed", (state) => {
  if (state.population)
    populationLabel.text = getPopulationText(state.population);
});
