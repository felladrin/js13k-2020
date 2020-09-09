import { Text } from "kontra";
import { gameWidth, gameHeight } from "../../constants";

const commonTextProperties: Partial<Text> = {
  x: gameWidth / 2,
  anchor: { x: 0.5, y: 0.5 },
  textAlign: "center",
};

export const introTextTitle = Text({
  ...commonTextProperties,
  text: "POPULATION: 404",
  font: `70px "Trebuchet MS", Helvetica, sans-serif`,
  color: "white",
  y: gameHeight / 2,
});
