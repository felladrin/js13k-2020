import { Sprite, Text } from "kontra";
import { tickStore } from "../../tickStore";
import { gameStore } from "../../gameStore";

const commonProgressBarProperties: Partial<Sprite> = {
  x: 0,
  anchor: { x: 0, y: 0 },
  height: 10,
  width: 0,
};

function createProgressBar(foregroundColor: string, backgroundColor: string) {
  const progressBarForeground = Sprite({
    ...commonProgressBarProperties,
    y: 0,
    color: foregroundColor,
  });

  const progressBarBackground = Sprite({
    ...commonProgressBarProperties,
    y: 40,
    color: backgroundColor,
    children: [progressBarForeground],
  });

  return progressBarBackground;
}

const researchProgressBar = createProgressBar("cyan", "black");
const constructionProgressBar = createProgressBar("yellow", "black");
const explorationProgressBar = createProgressBar("lightGreen", "black");

tickStore.on("@changed", () => {
  const [researchProgressBarForeground] = researchProgressBar.children;
  if (researchProgressBarForeground.parent) {
    researchProgressBarForeground.width =
      researchProgressBarForeground.parent.width *
      (gameStore.get().researchProgressPercentage / 100);
  }

  const [constructionProgressBarForeground] = constructionProgressBar.children;
  if (constructionProgressBarForeground.parent) {
    constructionProgressBarForeground.width =
      constructionProgressBarForeground.parent.width *
      (gameStore.get().constructionProgressPercentage / 100);
  }

  const [explorationProgressBarForeground] = explorationProgressBar.children;
  if (explorationProgressBarForeground.parent) {
    explorationProgressBarForeground.width =
      explorationProgressBarForeground.parent.width *
      (gameStore.get().explorationProgressPercentage / 100);
  }
});

const commonTextProperties = {
  font: "24px Arial",
  color: "white",
  anchor: { x: 0, y: 0 },
  textAlign: "center",
};

export const researchProgressLabel = Text({
  ...commonTextProperties,
  x: 790,
  y: 930,
  text: "Research Progress",
  children: [researchProgressBar],
});

export const explorationProgressLabel = Text({
  ...commonTextProperties,
  x: 20,
  y: 930,
  text: "Exploration Progress",
  children: [explorationProgressBar],
});

export const constructionProgressLabel = Text({
  ...commonTextProperties,
  x: 420,
  y: 930,
  text: "Construction Progress",
  children: [constructionProgressBar],
});

researchProgressBar.width = researchProgressLabel.width;
constructionProgressBar.width = constructionProgressLabel.width;
explorationProgressBar.width = explorationProgressLabel.width;
