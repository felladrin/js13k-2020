import { Sprite, randInt, Text } from "kontra";
import { tickStore } from "../../tickStore";

const commonProgressBarProperties: Partial<Sprite> = {
  x: 0,
  anchor: { x: 0, y: 0 },
  height: 10,
  width: 0,
};

const progressBarForeground = Sprite({
  ...commonProgressBarProperties,
  y: 0,
  color: "yellow",
});

const progressBarBackground = Sprite({
  ...commonProgressBarProperties,
  y: 40,
  color: "black",
  children: [progressBarForeground],
});

tickStore.on("@changed", () => {
  if (!progressBarForeground.parent?.width) return;

  progressBarForeground.width =
    (progressBarForeground.parent?.width * randInt(1, 100)) / 100;
});

export const constructionProgressLabel = Text({
  x: 420,
  y: 930,
  text: "Construction Progress",
  font: "24px Arial",
  color: "white",
  anchor: { x: 0, y: 0 },
  textAlign: "center",
  children: [progressBarBackground],
});

progressBarBackground.width = constructionProgressLabel.width;
