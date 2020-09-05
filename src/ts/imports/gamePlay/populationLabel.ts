import { Text } from "kontra";
import { gameStore } from "../../gameStore";
import { defaultFontFamily, gameWidth, gameHeight } from "../../constants";

function getPopulationText(population: number) {
  return `Population\n${population}`;
}

export const populationLabel = Text({
  x: gameWidth / 2,
  y: gameHeight / 2 + 80,
  text: getPopulationText(gameStore.get().population),
  lineHeight: 1.5,
  font: `45px ${defaultFontFamily}`,
  color: "#83908f",
  anchor: { x: 0.5, y: 0.5 },
  textAlign: "center",
});

gameStore.on("@changed", (state) => {
  if (state.population)
    populationLabel.text = getPopulationText(state.population);
});
