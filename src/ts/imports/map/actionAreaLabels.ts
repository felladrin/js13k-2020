import { Text, Vector } from "kontra";
import { Action } from "../../enums";
import { getKeysFromEnum } from "../../functions";

const actionAreaLabels: Text[] = [];

const actionToPositionMap: { [key in Action]: Vector } = {
  Constructing: Vector(300, 100),
  Exploring: Vector(800, 500),
  Farming: Vector(800, 500),
  GatheringResources: Vector(800, 500),
  Recovering: Vector(800, 500),
  Researching: Vector(800, 500),
};

for (const action of getKeysFromEnum(Action)) {
  actionAreaLabels.push(
    Text({
      text: Action[action],
      font: "32px Arial",
      color: "white",
      x: actionToPositionMap[action].x,
      y: actionToPositionMap[action].y,
      anchor: { x: 0.5, y: 0.5 },
      textAlign: "center",
    })
  );
}

export function getActionAreaLabel(action: Action): Text {
  return actionAreaLabels.find((item) => item.text === action) as NonNullable<
    Text
  >;
}
