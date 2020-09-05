import { Text } from "kontra";
import { gameWidth, gameHeight, defaultFontFamily } from "../../constants";
import wrap from "word-wrap";

export const startText = Text({
  text: wrap(
    [
      "After many years of wild exploration, the Earth has become a difficult place to live.",
      "Poisoned oxygen, infertile land, polluted water, and lack of natural resources resulted in a decision to migrate, at all costs, to the nearest habitable planet.",
      "The first ship was built, and had the capacity to carry tools, animals, supplies and 404 crew members, who would be responsible for populating and developing the new land in a period of 365 days, when the next human ship will arrive with more people.",
      "Press Anywhere To Start The Game",
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
