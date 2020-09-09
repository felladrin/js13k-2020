import { Sprite } from "kontra";
import { gameStore } from "../../gameStore";
import { Color } from "../../enums";

const commonProgressBarProperties: Partial<Sprite> = {
  anchor: { x: 0, y: 0 },
  height: 8,
};

function createProgressBar(foregroundColor: string, backgroundColor: string) {
  const progressBarForeground = Sprite({
    ...commonProgressBarProperties,
    color: foregroundColor,
  });

  const progressBarBackground = Sprite({
    ...commonProgressBarProperties,
    color: backgroundColor,
    children: [progressBarForeground],
  });

  return progressBarBackground;
}

export const researchProgressBar = createProgressBar(
  Color.Cyan,
  Color.DarkGreen
);
export const constructionProgressBar = createProgressBar(
  Color.Yellow,
  Color.DarkGreen
);
export const explorationProgressBar = createProgressBar(
  Color.LightGreen,
  Color.DarkGreen
);

gameStore.on("@changed", (state) => {
  if (!isNaN(state.researchProgressPercentage)) {
    const [researchProgressBarForeground] = researchProgressBar.children;
    researchProgressBarForeground.width =
      researchProgressBar.width * (state.researchProgressPercentage / 100);
  }

  if (!isNaN(state.constructionProgressPercentage)) {
    const [
      constructionProgressBarForeground,
    ] = constructionProgressBar.children;
    constructionProgressBarForeground.width =
      constructionProgressBar.width *
      (state.constructionProgressPercentage / 100);
  }

  if (!isNaN(state.explorationProgressPercentage)) {
    const [explorationProgressBarForeground] = explorationProgressBar.children;
    if (explorationProgressBarForeground.parent) {
      explorationProgressBarForeground.width =
        explorationProgressBarForeground.parent.width *
        (state.explorationProgressPercentage / 100);
    }
  }
});
