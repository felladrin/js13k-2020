import { Button, Grid, GameObject } from "kontra";
import { buttonImage, buttonPressedImage } from "../../constants";
import { gameStore, GameStoreAction } from "../../gameStore";
import { Action } from "../../enums";

const buttonProperties = {
  anchor: { x: 0.5, y: 0.5 },
  image: buttonImage,
  action: null,
  onDown: function () {
    gameStore.dispatch(GameStoreAction.SetActionToBoost, this.action);
    this.image = buttonPressedImage;
  },
  onUp: function () {
    gameStore.dispatch(GameStoreAction.SetActionToBoost, null);
    this.image = buttonImage;
  },
};

const textCommonProperties = {
  color: "white",
  font: "20px Arial",
  anchor: { x: 0.5, y: 0.5 },
};

const children: GameObject[] = [];

for (const action in Action) {
  children.push(
    Button({
      ...buttonProperties,
      text: {
        ...textCommonProperties,
        text: `Boost ${action}`,
      },
      action,
    })
  );
}

export const buttons = Grid({
  x: 860,
  y: 511,
  anchor: { x: 0.5, y: 0.5 },
  rowGap: 15,
  justify: "center",
  children,
});
