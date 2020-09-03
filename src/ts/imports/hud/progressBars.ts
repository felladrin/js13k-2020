import { Sprite, Text } from "kontra";
import { gameStore } from "../../gameStore";
import { defaultFontFamily } from "../../constants";

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

gameStore.on("@changed", (state) => {
  if (state.researchProgressPercentage) {
    const [researchProgressBarForeground] = researchProgressBar.children;
    researchProgressBarForeground.width =
      researchProgressBar.width * (state.researchProgressPercentage / 100);
  }

  if (state.constructionProgressPercentage) {
    const [
      constructionProgressBarForeground,
    ] = constructionProgressBar.children;
    constructionProgressBarForeground.width =
      constructionProgressBar.width *
      (state.constructionProgressPercentage / 100);
  }

  if (state.explorationProgressPercentage) {
    const [explorationProgressBarForeground] = explorationProgressBar.children;
    if (explorationProgressBarForeground.parent) {
      explorationProgressBarForeground.width =
        explorationProgressBarForeground.parent.width *
        (state.explorationProgressPercentage / 100);
    }
  }
});

const commonTextProperties = {
  font: `24px ${defaultFontFamily}`,
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
