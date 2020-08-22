import { Text, Vector, Sprite } from "kontra";
import { Action } from "../../enums";
import { getKeysFromEnum } from "../../functions";
import { actionToSVGPathMap, gameWidth, gameHeight } from "../../constants";

const actionAreas: Sprite[] = [];
const actionsAmount = Object.keys(Action).length;
const centralPosition = Vector(gameWidth / 2, gameHeight / 2);
const radiusX = 350;
const radiusY = 350;

for (const action of getKeysFromEnum(Action)) {
  const currentActionIndex = actionAreas.length;
  const fractionOfTheCircle = currentActionIndex / actionsAmount;
  const angle = fractionOfTheCircle * Math.PI * 2;
  const x = Math.sin(angle) * radiusX;
  const y = Math.cos(angle) * radiusY;
  const positionInTheCircle = Vector(x, y).add(centralPosition);

  const icon = Sprite({
    x: -60,
    y: -30,
    scaleX: 120 / 512,
    scaleY: 120 / 512,
    opacity: 0.3,
    color: "white",
    render: function (this: Sprite) {
      this.context.fillStyle = this.color;
      this.context.beginPath();
      const path = new Path2D(actionToSVGPathMap[Action[action]]);
      this.context.fill(path);
    },
  });

  const label = Text({
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
    action: Action[action],
    render: function (this: Sprite) {
      this.context.fillStyle = this.color;
      this.context.beginPath();
      this.context.arc(0, 0, this.radius, 0, 2 * Math.PI);
      this.context.fill();
    },
  });

  circle.addChild(label);
  circle.addChild(icon);

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
