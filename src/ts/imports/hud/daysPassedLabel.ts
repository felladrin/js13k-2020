import { Text } from "kontra";
import { gameStore } from "../../gameStore";
import { defaultFontFamily } from "../../constants";

function getDaysPassedText(daysPassed: number) {
  return `Days Passed: ${daysPassed}`;
}

export const daysPassedLabel = Text({
  x: 556,
  y: 50,
  text: getDaysPassedText(gameStore.get().daysPassed),
  font: `24px ${defaultFontFamily}`,
  color: "white",
  anchor: { x: 0.5, y: 0.5 },
  textAlign: "center",
});

gameStore.on("@changed", (state) => {
  if (state.daysPassed)
    daysPassedLabel.text = getDaysPassedText(state.daysPassed);
});
