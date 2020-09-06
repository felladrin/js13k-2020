import { Text } from "kontra";
import { gameWidth, gameHeight, defaultFontFamily } from "../../constants";
import wrap from "word-wrap";

export const startText = Text({
  text: wrap(
    [
      "Earth is dying.",
      "In a joint effort from humankind, a spaceship was crafted.",
      "Large enough to transport supplies, animals and 404 astronauts, it was launched into space for a light-year trip to the nearest habitable planet: Secunda.",
      "Get ready to conquer a new land. You can start by exploring it to find new sites for construction, then research tools, strategies and techniques to improve the work efficiency.",
      "To guide the population, press and hold the action areas.",
      "Their objective is to stock a million units of food and resources before the next spaceship arrives.",
      "Press anywhere to start.",
    ].join("\n\n"),
    { width: 60 }
  ),
  font: `32px ${defaultFontFamily}`,
  lineHeight: 1.3,
  color: "white",
  x: gameWidth / 2,
  y: gameHeight / 2,
  anchor: { x: 0.5, y: 0.5 },
});
