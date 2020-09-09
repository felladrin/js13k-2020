import { Text } from "kontra";
import { gameStore } from "../../gameStore";
import {
  defaultFontFamily,
  gameHeight,
  gameWidth,
  endGameDay,
} from "../../constants";
import { Color } from "../../enums";

function getDaysPassedText(daysPassed: number) {
  return `NEXT ARRIVAL\n${endGameDay - daysPassed}`;
}

export const daysPassedLabel = Text({
  x: gameWidth / 2,
  y: gameHeight / 2 - 120,
  text: getDaysPassedText(gameStore.get().daysPassed),
  lineHeight: 1.5,
  font: `40px ${defaultFontFamily}`,
  color: Color.Gray,
  anchor: { x: 0.5, y: 0.5 },
  textAlign: "center",
});

gameStore.on("@changed", (state) => {
  if (state.daysPassed)
    daysPassedLabel.text = getDaysPassedText(state.daysPassed);
});
