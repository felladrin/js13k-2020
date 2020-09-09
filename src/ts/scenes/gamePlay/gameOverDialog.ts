import { Text, getCanvas } from "kontra";
import {
  gameWidth,
  gameHeight,
  defaultFontFamily,
  requiredFoodAndResourcesAmount,
} from "../../constants";
import { gameStore } from "../../gameStore";
import wrap from "word-wrap";
import { addOneTimeListenerForClickTouchEndOnElement } from "../../functions";
import { Color } from "../../enums";

export const gameOverDialog = Text({
  x: gameWidth / 2,
  y: gameHeight / 2,
  text: "",
  lineHeight: 1.3,
  font: `26px ${defaultFontFamily}`,
  color: Color.Gray,
  anchor: { x: 0.5, y: 0.5 },
  textAlign: "center",
});

gameStore.on("@changed", (state) => {
  if (!state.showingGameOverDialog) return;

  if (state.hasShownGameOverDialog) return;

  let messageParagraphs = [
    "Mission Failed!",
    "The lack of food or resources made it impossible to receive the newcomers.",
    "Click here to restart.",
  ];

  let clickOnCanvasCallback = () => {
    window.document.location.reload();
  };

  if (
    gameStore.get().food > requiredFoodAndResourcesAmount &&
    gameStore.get().resources > requiredFoodAndResourcesAmount
  ) {
    messageParagraphs = [
      "Mission Complete!",
      "The land is ready to receive the newcomers with plenty of food and comfort!",
      "Click here if you wish to keep playing just for fun.",
    ];

    clickOnCanvasCallback = () => {
      gameStore.dispatch("hideGameOverDialog");
      gameStore.dispatch("resumeGame");
    };
  }

  gameOverDialog.text = wrap(messageParagraphs.join("\n\n"), { width: 22 });

  setTimeout(() => {
    addOneTimeListenerForClickTouchEndOnElement(
      getCanvas(),
      clickOnCanvasCallback
    );
  }, 3000);
});
