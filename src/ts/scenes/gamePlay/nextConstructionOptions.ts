import { Text, Button } from "kontra";
import {
  defaultFontFamily,
  actionsImprovedByConstruction,
} from "../../constants";
import { getKeysFromEnum } from "../../functions";
import { Action } from "../../enums";
import { gameStore } from "../../gameStore";

export const nextConstructionOptions = Text({
  x: 210,
  y: 850,
  text: "NEXT CONSTRUCTION",
  font: `23px ${defaultFontFamily}`,
  lineHeight: 1.3,
  color: "#83908f",
  anchor: { x: 0.5, y: 0.5 },
  textAlign: "center",
});

let actionIndex = 0;

for (const key of getKeysFromEnum(Action)) {
  if (!actionsImprovedByConstruction.includes(Action[key])) continue;

  const actionButton = Button({
    x: 0,
    y: 40 + actionIndex * 50,
    anchor: { x: 0.5, y: 0.5 },
    text: {
      text: Action[key],
      color: "white",
      font: `25px ${defaultFontFamily}`,
      anchor: { x: 0.5, y: 0.5 },
    },
    padX: 16,
    padY: 8,
    onDown: () => {
      gameStore.dispatch("setNextConstruction", Action[key]);
    },
    update: () => {
      const { hoveredButton } = gameStore.get();

      if (!actionButton.hovered && hoveredButton == actionButton) {
        gameStore.dispatch("setHoveredButton", null);
      } else if (actionButton.hovered && hoveredButton != actionButton) {
        gameStore.dispatch("setHoveredButton", actionButton);
      }
    },
    render: () => {
      if (gameStore.get().nextConstruction == Action[key]) {
        actionButton.context.setLineDash([10, 10]);
        actionButton.context.lineWidth = 3;
        actionButton.context.strokeStyle = "white";
        actionButton.context.strokeRect(
          0,
          0,
          actionButton.width,
          actionButton.height
        );
      }
    },
  });

  nextConstructionOptions.addChild(actionButton);

  actionIndex++;
}
