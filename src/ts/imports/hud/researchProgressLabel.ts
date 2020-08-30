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
  color: "cyan",
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

export const researchProgressLabel = Text({
  x: 790,
  y: 930,
  text: "Research Progress",
  font: "24px Arial",
  color: "white",
  anchor: { x: 0, y: 0 },
  textAlign: "center",
  children: [progressBarBackground],
});

progressBarBackground.width = researchProgressLabel.width;
