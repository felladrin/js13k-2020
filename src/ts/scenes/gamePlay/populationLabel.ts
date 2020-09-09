import { Text } from "kontra";
import { gameStore } from "../../gameStore";
import { defaultFontFamily, gameWidth, gameHeight } from "../../constants";
import { Color } from "../../enums";

function getPopulationText(population: number) {
  return `POPULATION\n${population}`;
}

export const populationLabel = Text({
  x: gameWidth / 2,
  y: gameHeight / 2 + 30,
  text: getPopulationText(gameStore.get().population),
  lineHeight: 1.5,
  font: `40px ${defaultFontFamily}`,
  color: Color.Gray,
  anchor: { x: 0.5, y: 0.5 },
  textAlign: "center",
});

gameStore.on("@changed", (state) => {
  if (state.population)
    populationLabel.text = getPopulationText(state.population);
});
