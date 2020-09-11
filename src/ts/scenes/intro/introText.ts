import { Text } from "kontra";
import { gameWidth, gameHeight } from "../../constants";
import { Color } from "../../enums";

export const introTextTitle = Text({
  x: gameWidth / 2,
  y: gameHeight / 2,
  anchor: { x: 0.5, y: 0.5 },
  textAlign: "center",
  text: "POPULATION: 404",
  font: `70px "Trebuchet MS", Helvetica, sans-serif`,
  color: Color.White,
});
