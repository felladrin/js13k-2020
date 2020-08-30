import { Button, Grid, GameObject } from "kontra";
import { buttonImage, buttonPressedImage } from "../../constants";
import { gameStore, GameStoreAction } from "../../gameStore";
import { Action } from "../../enums";

const buttonProperties = {
  anchor: { x: 0.5, y: 0.5 },
  image: buttonImage,
  action: null,
  onDown: function (this: Button) {
    gameStore.dispatch(GameStoreAction.SetActionToBoost, this.action);
    this.image = buttonPressedImage;

    const [childText] = this.children;
    childText.y = -2;
  },
  onUp: function (this: Button) {
    gameStore.dispatch(GameStoreAction.SetActionToBoost, null);
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

for (const action in Action) {
  if (action == Action.Resting) continue;

  const button = Button({
    ...buttonProperties,
    action,
    text: {
      ...textCommonProperties,
      text: `Boost\n${action}`,
    },
  });

  children.push(button);
}

export const buttons = Grid({
  x: 880,
  y: 1024 / 2,
  anchor: { x: 0.5, y: 0.5 },
  rowGap: 20,
  justify: "center",
  children,
});
