import { Text } from "kontra";
import { gameWidth, gameHeight, defaultFontFamily } from "../../constants";
import wrap from "word-wrap";

const targetAmount = Number(1000000).toLocaleString();

export const startText = Text({
  text: wrap(
    [
      "Earth is dying.",
      "In a joint effort from humankind, a spaceship was crafted.",
      "Large enough to transport supplies, animals and 404 astronauts, it was launched into space for a light-year trip to the nearest habitable planet: Secunda.",
      "Get ready to conquer: You can start by exploring it to find new sites for construction, then research tools, strategies and techniques to improve the work efficiency.",
      "Guide the population: Press and hold the action areas.",
      `Objective: Have at least ${targetAmount} units of Food and Resources in stock before the next spaceship arrives.`,
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
