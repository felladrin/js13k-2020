import { Text, getCanvas } from "kontra";
import { gameWidth, gameHeight, defaultFontFamily } from "../../constants";
import { gameStore } from "../../gameStore";
import wrap from "word-wrap";
import { addOneTimeListenerForClickTouchEndOnElement } from "../../functions";

function getSuccessMessage() {
  return wrap(
    [
      "Mission Complete!",
      "The land is ready to receive the newcomers with plenty of food and comfort!",
      "Click here if you wish to keep playing just for fun.",
    ].join("\n\n"),
    { width: 22 }
  );
}

function getFailureMessage() {
  return wrap(
    [
      "Mission Failed!",
      "The lack of food or resources made it impossible to receive the newcomers.",
      "Click here to restart.",
    ].join("\n\n"),
    { width: 22 }
  );
}

export const gameOverDialog = Text({
  x: gameWidth / 2,
  y: gameHeight / 2,
  text: "",
  lineHeight: 1.3,
  font: `26px ${defaultFontFamily}`,
  color: "#83908f",
  anchor: { x: 0.5, y: 0.5 },
  textAlign: "center",
});

gameStore.on("@changed", (state) => {
  if (state.showingGameOverDialog && !gameOverDialog.text.length) {
    if (gameStore.get().food > 100000 && gameStore.get().resources > 100000) {
      gameOverDialog.text = getSuccessMessage();
      addOneTimeListenerForClickTouchEndOnElement(getCanvas(), () => {
        gameStore.dispatch("hideGameOverDialog");
        gameStore.dispatch("resumeGame");
      });
    } else {
      gameOverDialog.text = getFailureMessage();
      addOneTimeListenerForClickTouchEndOnElement(getCanvas(), () => {
        window.document.location.reload();
      });
    }
  }
});
