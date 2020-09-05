import { Text } from "kontra";
import { gameStore } from "../../gameStore";
import { defaultFontFamily, gameHeight, gameWidth } from "../../constants";

function getDaysPassedText(daysPassed: number) {
  return `Days Passed\n${daysPassed}`;
}

export const daysPassedLabel = Text({
  x: gameWidth / 2,
  y: gameHeight / 2 - 80,
  text: getDaysPassedText(gameStore.get().daysPassed),
  lineHeight: 1.5,
  font: `45px ${defaultFontFamily}`,
  color: "white",
  anchor: { x: 0.5, y: 0.5 },
  textAlign: "center",
});

gameStore.on("@changed", (state) => {
  if (state.daysPassed)
    daysPassedLabel.text = getDaysPassedText(state.daysPassed);
});
