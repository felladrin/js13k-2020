import { Text, Vector, Sprite, Button } from "kontra";
import { Action } from "../../enums";
import { getKeysFromEnum } from "../../functions";
import {
  actionToSVGPathMap,
  gameHeight,
  defaultFontFamily,
  gameWidth,
} from "../../constants";
import { gameStore } from "../../gameStore";

const actionAreas: Sprite[] = [];
const actionsAmount = Object.keys(Action).length;
const centralPosition = Vector(gameWidth / 2, gameHeight / 2);
const radius = 350;
const buttonProperties = {
  width: 140 * 2,
  height: 140 * 2,
  anchor: { x: 0.5, y: 0.5 },
  action: null,
  text: {
    y: -8,
    color: "white",
    font: `32px ${defaultFontFamily}`,
    textAlign: "center",
    lineHeight: 1.2,
    anchor: { x: 0.5, y: 0.5 },
  },
  onDown: function (this: Button) {
    gameStore.dispatch("setActionToBoost", this.action);

    const [childText] = this.children;
    childText.y = -5;
  },
  onUp: function (this: Button) {
    gameStore.dispatch("setActionToBoost", null);

    const [childText] = this.children;
    childText.y = -8;
  },
  update: function (this: Button) {
    const { hoveredButton } = gameStore.get();
    if (this.hovered && hoveredButton != this) {
      gameStore.dispatch("setHoveredButton", this);
      const [childText] = this.children;
      childText.text = "Hold to Boost!";
    } else if (!this.hovered && hoveredButton == this) {
      gameStore.dispatch("setHoveredButton", null);
      const [childText] = this.children;
      childText.text = "";
    }
  },
};

for (const key of getKeysFromEnum(Action)) {
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
      const path = new Path2D(actionToSVGPathMap[Action[key]]);
      this.context.fill(path);
    },
  });

  const peopleActingLabel = Text({
    x: 0,
    y: -85,
    text: "0",
    font: `30px ${defaultFontFamily}`,
    color: "white",
    anchor: { x: 0.5, y: 0.5 },
    textAlign: "center",
    opacity: 0.3,
    update: function (this: Text) {
      const actionNameInLowerCase = Action[key].toLocaleLowerCase() as
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
    text: Action[key],
    font: `30px ${defaultFontFamily}`,
    color: "white",
    anchor: { x: 0.5, y: 0.5 },
    textAlign: "center",
    opacity: 0.3,
  });

  const boostActionButton = Button({
    ...buttonProperties,
    action: Action[key],
  });

  if (Action[key] == Action.Resting) {
    boostActionButton.disable();
  }

  const circle = Sprite({
    x: positionInTheCircle.x,
    y: positionInTheCircle.y,
    color: "white",
    radius: 140,
    opacity: 0.3,
    anchor: { x: 0.5, y: 0.5 },
    action: Action[key],
    render: function (this: Sprite) {
      this.context.fillStyle = this.color;
      this.context.beginPath();
      this.context.arc(0, 0, this.radius, 0, 2 * Math.PI);
      this.context.fill();
    },
    children: [peopleActingLabel, actionNameLabel, icon, boostActionButton],
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
