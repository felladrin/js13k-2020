import { Text } from "kontra";
import { gameWidth, gameHeight, defaultFontFamily } from "../../constants";
import { Color } from "../../enums";

export const introTextTitle = Text({
  x: gameWidth / 2,
  y: gameHeight / 2,
  anchor: { x: 0.5, y: 0.5 },
  textAlign: "center",
  text: "POPULATION: 404",
  font: `70px ${defaultFontFamily}`,
  color: Color.White,
});
