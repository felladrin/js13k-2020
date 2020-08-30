import { Text, Vector, Sprite } from "kontra";
import { Action } from "../../enums";
import { getKeysFromEnum } from "../../functions";
import { actionToSVGPathMap } from "../../constants";
import { gameStore } from "../../gameStore";

const actionAreas: Sprite[] = [];
const actionsAmount = Object.keys(Action).length;
const centralPosition = Vector(380, 560);
const radius = 260;

for (const action of getKeysFromEnum(Action)) {
  const currentActionIndex = actionAreas.length;
  const fractionOfTheCircle = currentActionIndex / actionsAmount;
  const angle = fractionOfTheCircle * Math.PI * 2;
  const x = Math.sin(angle) * radius;
  const y = Math.cos(angle) * radius;
  const positionInTheCircle = Vector(x, y).add(centralPosition);

  const icon = Sprite({
    x: 0,
    y: 30,
    width: 512,
    height: 512,
    scaleX: 120 / 512,
    scaleY: 120 / 512,
    anchor: { x: 0.5, y: 0.5 },
    opacity: 0.3,
    color: "white",
    render: function (this: Sprite) {
      this.context.fillStyle = this.color;
      this.context.beginPath();
      const path = new Path2D(actionToSVGPathMap[Action[action]]);
      this.context.fill(path);
    },
  });

  const peopleActingLabel = Text({
    x: 0,
    y: -85,
    text: "0",
    font: "32px Arial",
    color: "white",
    anchor: { x: 0.5, y: 0.5 },
    textAlign: "center",
    opacity: 0.3,
    update: function (this: Text) {
      const actionNameInLowerCase = Action[action].toLocaleLowerCase() as
        | "resting"
        | "exploring"
        | "researching"
        | "farming"
        | "scavenging"
        | "constructing";
      this.text = gameStore.get()[actionNameInLowerCase].toString();
    },
  });

  const actionNameLabel = Text({
    x: 0,
    y: -55,
    text: Action[action],
    font: "32px Arial",
    color: "white",
    anchor: { x: 0.5, y: 0.5 },
    textAlign: "center",
    opacity: 0.3,
  });

  const circle = Sprite({
    x: positionInTheCircle.x,
    y: positionInTheCircle.y,
    color: "white",
    radius: 120,
    opacity: 0.3,
    anchor: { x: 0.5, y: 0.5 },
    action: Action[action],
    render: function (this: Sprite) {
      this.context.fillStyle = this.color;
      this.context.beginPath();
      this.context.arc(0, 0, this.radius, 0, 2 * Math.PI);
      this.context.fill();
    },
    children: [peopleActingLabel, actionNameLabel, icon],
  });

  actionAreas.push(circle);
}

export function getActionAreaLabel(action: Action): Sprite {
  return actionAreas.find((area) => area.action === action) as NonNullable<
    Sprite
  >;
}

export function getAllActionAreaLabels(): Sprite[] {
  return Object.values(actionAreas);
}
