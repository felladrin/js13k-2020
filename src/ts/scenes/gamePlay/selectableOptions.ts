import { Text, Button } from "kontra";
import {
  defaultFontFamily,
  actionsImprovedByConstruction,
  actionsImprovedByResearch,
} from "../../constants";
import { getKeysFromEnum } from "../../functions";
import { Action, Color } from "../../enums";
import { gameStore } from "../../gameStore";

const commonTextProperties = {
  y: 850,
  font: `23px ${defaultFontFamily}`,
  lineHeight: 1.3,
  color: Color.Gray,
  anchor: { x: 0.5, y: 0.5 },
  textAlign: "center",
};

export const nextConstructionOptions = Text({
  ...commonTextProperties,
  x: 210,
  text: "NEXT CONSTRUCTION",
});

export const nextResearchOptions = Text({
  ...commonTextProperties,
  x: 825,
  text: "NEXT RESEARCH",
});

function getCommonButtonPropertiesForAction(action: Action) {
  return {
    anchor: { x: 0.5, y: 0.5 },
    text: {
      text: action,
      color: Color.White,
      font: `25px ${defaultFontFamily}`,
      anchor: { x: 0.5, y: 0.5 },
    },
    padX: 16,
    padY: 8,
  };
}

for (const key of getKeysFromEnum(Action)) {
  const actionCanBeImprovedByConstruction = actionsImprovedByConstruction.includes(
    Action[key]
  );
  const actionCanBeImprovedByResearch = actionsImprovedByResearch.includes(
    Action[key]
  );

  let yAndOnDownButtonProperties = {};

  if (actionCanBeImprovedByConstruction) {
    yAndOnDownButtonProperties = {
      y: 40 + actionsImprovedByConstruction.indexOf(Action[key]) * 50,
      onDown: () => {
        gameStore.dispatch("setNextConstruction", Action[key]);
      },
    };
  } else if (actionCanBeImprovedByResearch) {
    yAndOnDownButtonProperties = {
      y: 40 + actionsImprovedByResearch.indexOf(Action[key]) * 50,
      onDown: () => {
        gameStore.dispatch("setNextResearch", Action[key]);
      },
    };
  }

  const actionButton = Button({
    ...getCommonButtonPropertiesForAction(Action[key]),
    ...yAndOnDownButtonProperties,
    update: () => {
      const { hoveredButton } = gameStore.get();

      if (!actionButton.hovered && hoveredButton == actionButton) {
        gameStore.dispatch("setHoveredButton", null);
      } else if (actionButton.hovered && hoveredButton != actionButton) {
        gameStore.dispatch("setHoveredButton", actionButton);
      }
    },
    render: (() => {
      let getSelectedOption: () => Action;

      if (actionCanBeImprovedByConstruction) {
        getSelectedOption = () => gameStore.get().nextConstruction;
      } else if (actionCanBeImprovedByResearch) {
        getSelectedOption = () => gameStore.get().nextResearch;
      }

      return () => {
        if (getSelectedOption() == Action[key]) {
          actionButton.context.setLineDash([10, 10]);
          actionButton.context.lineWidth = 3;
          actionButton.context.strokeStyle = Color.White;
          actionButton.context.strokeRect(
            0,
            0,
            actionButton.width,
            actionButton.height
          );
        }
      };
    })(),
  });

  if (actionCanBeImprovedByConstruction) {
    nextConstructionOptions.addChild(actionButton);
  } else if (actionCanBeImprovedByResearch) {
    nextResearchOptions.addChild(actionButton);
  }
}
