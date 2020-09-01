import { Button, Grid, GameObject } from "kontra";
import { buttonImage, buttonPressedImage, gameHeight } from "../../constants";
import { gameStore } from "../../gameStore";
import { Action } from "../../enums";
import { getKeysFromEnum } from "../../functions";

const buttonProperties = {
  anchor: { x: 0.5, y: 0.5 },
  image: buttonImage,
  action: null,
  onDown: function (this: Button) {
    gameStore.dispatch("setActionToBoost", this.action);
    this.image = buttonPressedImage;

    const [childText] = this.children;
    childText.y = -2;
  },
  onUp: function (this: Button) {
    gameStore.dispatch("setActionToBoost", null);
    this.image = buttonImage;

    const [childText] = this.children;
    childText.y = -5;
  },
};

const textCommonProperties = {
  y: -5,
  color: "white",
  font: "32px Arial",
  textAlign: "center",
  lineHeight: 1.2,
  anchor: { x: 0.5, y: 0.5 },
};

const children: GameObject[] = [];

for (const key of getKeysFromEnum(Action)) {
  if (Action[key] == Action.Resting) continue;

  const button = Button({
    ...buttonProperties,
    action: Action[key],
    text: {
      ...textCommonProperties,
      text: `Hold to Boost\n${Action[key]}`,
    },
  });

  children.push(button);
}

export const buttons = Grid({
  x: 880,
  y: gameHeight / 2,
  anchor: { x: 0.5, y: 0.5 },
  rowGap: 20,
  justify: "center",
  children,
});
