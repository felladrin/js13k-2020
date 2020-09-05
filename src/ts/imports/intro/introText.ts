import { Text } from "kontra";
import { gameWidth, gameHeight, defaultFontFamily } from "../../constants";

export const introText = Text({
  text: "POPULATION: 404\nA JS13K GAME BY FELLADRIN",
  font: `45px ${defaultFontFamily}`,
  lineHeight: 1.5,
  color: "white",
  x: gameWidth / 2,
  y: gameHeight / 2,
  anchor: { x: 0.5, y: 0.5 },
  textAlign: "center",
});
