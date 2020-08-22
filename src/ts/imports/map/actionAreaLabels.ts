import { Text, Vector } from "kontra";
import { Action } from "../../enums";
import { getKeysFromEnum } from "../../functions";
import { configStore } from "../../stores/configStore";

const actionAreaLabels: Text[] = [];
const actionsAmount = Object.keys(Action).length;
const centralPosition = Vector(
  configStore.get().gameWidth / 2,
  configStore.get().gameHeight / 2
);
const radiusX = 350;
const radiusY = 350;

for (const action of getKeysFromEnum(Action)) {
  const currentActionIndex = actionAreaLabels.length;
  const fractionOfTheCircle = currentActionIndex / actionsAmount;
  const angle = fractionOfTheCircle * Math.PI * 2;
  const x = Math.sin(angle) * radiusX;
  const y = Math.cos(angle) * radiusY;
  const positionInTheCircle = Vector(x, y).add(centralPosition);

  actionAreaLabels.push(
    Text({
      text: Action[action],
      font: "20px Arial",
      color: "white",
      x: positionInTheCircle.x,
      y: positionInTheCircle.y,
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

export function getAllActionAreaLabels(): Text[] {
  return Object.values(actionAreaLabels);
}
