import { Text } from "kontra";
import {
  gameWidth,
  gameHeight,
  defaultFontFamily,
  requiredFoodAndResourcesAmount,
} from "../../constants";
import wrap from "word-wrap";
import { Color } from "../../enums";

const targetAmount = Number(requiredFoodAndResourcesAmount).toLocaleString();

export const startText = Text({
  text: wrap(
    [
      "Earth is dying.",
      "In a joint effort to save the humankind, a spaceship was crafted.",
      "Large enough to transport 404 astronauts, it was launched into space for a light-year trip to the nearest habitable planet.",
      "Guide the population: Press and hold the action areas to move people.",
      "Prepare to conquer: Explore the land to find good spots for construction.",
      "Be wise: Select Researches and Constructions carefully to boost the areas you need more performance.",
      `Focus on your goal: Have at least ${targetAmount} units of Food and Resources in stock before the next spaceship arrives.`,
      "Press anywhere to start the mission.",
    ].join("\n\n"),
    { width: 60 }
  ),
  font: `32px ${defaultFontFamily}`,
  lineHeight: 1.3,
  color: Color.White,
  x: gameWidth / 2,
  y: gameHeight / 2,
  anchor: { x: 0.5, y: 0.5 },
});
