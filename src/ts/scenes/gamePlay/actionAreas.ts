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
    color: "white",
    font: `32px ${defaultFontFamily}`,
    textAlign: "center",
    lineHeight: 1.2,
    anchor: { x: 0.5, y: 0.5 },
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
    color: "#83908f",
    render: () => {
      icon.context.fillStyle = icon.color;
      icon.context.beginPath();
      const path = new Path2D(actionToSVGPathMap[Action[key]]);
      icon.context.fill(path);
    },
  });

  const peopleActingLabel = Text({
    x: 0,
    y: -85,
    text: "0",
    font: `30px ${defaultFontFamily}`,
    color: "#83908f",
    anchor: { x: 0.5, y: 0.5 },
    textAlign: "center",
    update: () => {
      const actionNameInLowerCase = Action[key].toLocaleLowerCase() as
        | "resting"
        | "exploring"
        | "researching"
        | "farming"
        | "scavenging"
        | "constructing";
      peopleActingLabel.text = gameStore
        .get()
        [actionNameInLowerCase].toString();
    },
  });

  const actionNameLabel = Text({
    x: 0,
    y: -55,
    text: Action[key],
    font: `30px ${defaultFontFamily}`,
    color: "#83908f",
    anchor: { x: 0.5, y: 0.5 },
    textAlign: "center",
  });

  const boostActionButton = Button({
    ...buttonProperties,
    action: Action[key],
    onDown: () => {
      gameStore.dispatch("setActionToBoost", boostActionButton.action);

      const [childText] = boostActionButton.children;
      childText.text = "Boosting!";
    },
    onUp: () => {
      gameStore.dispatch("setActionToBoost", null);
      boostActionButton.hovered = false;

      const [childText] = boostActionButton.children;
      childText.text = "";
    },
    update: () => {
      const { hoveredButton } = gameStore.get();

      if (!boostActionButton.hovered && hoveredButton == boostActionButton) {
        gameStore.dispatch("setHoveredButton", null);
      } else if (
        boostActionButton.hovered &&
        hoveredButton != boostActionButton
      ) {
        gameStore.dispatch("setHoveredButton", boostActionButton);
      }
    },
  });

  if (Action[key] == Action.Resting) {
    boostActionButton.disable();
  }

  const circle = Sprite({
    x: positionInTheCircle.x,
    y: positionInTheCircle.y,
    color: "#4d5f5e",
    radius: 140,
    anchor: { x: 0.5, y: 0.5 },
    action: Action[key],
    render: () => {
      circle.context.fillStyle = circle.color;
      circle.context.beginPath();
      circle.context.arc(0, 0, circle.radius, 0, 2 * Math.PI);
      circle.context.fill();
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
