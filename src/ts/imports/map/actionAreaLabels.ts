import { Text, Vector, Sprite } from "kontra";
import { Action } from "../../enums";
import { getKeysFromEnum } from "../../functions";
import { actionToSVGPathMap, gameWidth, gameHeight } from "../../constants";

const actionAreaLabels: Text[] = [];
const actionsAmount = Object.keys(Action).length;
const centralPosition = Vector(gameWidth / 2, gameHeight / 2);
const radiusX = 350;
const radiusY = 350;

for (const action of getKeysFromEnum(Action)) {
  const currentActionIndex = actionAreaLabels.length;
  const fractionOfTheCircle = currentActionIndex / actionsAmount;
  const angle = fractionOfTheCircle * Math.PI * 2;
  const x = Math.sin(angle) * radiusX;
  const y = Math.cos(angle) * radiusY;
  const positionInTheCircle = Vector(x, y).add(centralPosition);

  const icon = Sprite({
    x: -60,
    y: 25,
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
    x: positionInTheCircle.x,
    y: positionInTheCircle.y,
    text: Action[action],
    font: "32px Arial",
    color: "white",
    anchor: { x: 0.5, y: 0.5 },
    textAlign: "center",
    opacity: 0.3,
  });

  const circle = Sprite({
    x: 0,
    y: 55,
    color: "white",
    radius: 120,
    opacity: 0.3,
    anchor: { x: 0.5, y: 0.5 },
    render: function (this: Sprite) {
      this.context.fillStyle = this.color;
      this.context.beginPath();
      this.context.arc(0, 0, this.radius, 0, 2 * Math.PI);
      this.context.fill();
    },
  });

  label.addChild(circle);
  label.addChild(icon);

  actionAreaLabels.push(label);
}

export function getActionAreaLabel(action: Action): Text {
  return actionAreaLabels.find((item) => item.text === action) as NonNullable<
    Text
  >;
}

export function getAllActionAreaLabels(): Text[] {
  return Object.values(actionAreaLabels);
}
