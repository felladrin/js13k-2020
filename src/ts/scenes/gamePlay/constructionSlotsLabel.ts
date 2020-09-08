import { Text } from "kontra";
import { gameStore } from "../../gameStore";
import { defaultFontFamily, gameWidth, gameHeight } from "../../constants";

function getConstructionSlotsText(availableConstructionSlots: number) {
  return `CONSTRUCTION SLOTS\n${availableConstructionSlots}`;
}

export const constructionSlotsLabel = Text({
  x: gameWidth / 2,
  y: gameHeight / 2 + 150,
  text: getConstructionSlotsText(gameStore.get().availableConstructionSlots),
  lineHeight: 1.5,
  font: `22px ${defaultFontFamily}`,
  color: "#83908f",
  anchor: { x: 0.5, y: 0.5 },
  textAlign: "center",
});

gameStore.on("@changed", (state) => {
  if (!isNaN(state.availableConstructionSlots))
    constructionSlotsLabel.text = getConstructionSlotsText(
      state.availableConstructionSlots
    );
});
