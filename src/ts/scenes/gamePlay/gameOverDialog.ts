import { Text, randInt, Sprite } from "kontra";
import { gameWidth, gameHeight, defaultFontFamily } from "../../constants";
import { gameStore } from "../../gameStore";
import wrap from "word-wrap";

function getRandomGoodTitle() {
  const goodTitles = ["Conqueror", "Magnificent", "Glorious"];
  return `The ${goodTitles[randInt(0, goodTitles.length - 1)]}`;
}

function getRandomBadTitle() {
  const badTitles = ["Foolish", "Lunatic", "Weak"];
  return `The ${badTitles[randInt(0, badTitles.length - 1)]}`;
}

function getSuccessMessage() {
  return wrap(
    [
      "You've made it! The new land is ready to receive the new comers with plenty of food and comfort!",
      `The population will always remember you as ${getRandomGoodTitle()}.`,
    ].join("\n"),
    { width: 38 }
  );
}

function getFailureMessage() {
  return wrap(
    [
      "Unfortunately, the mission was aborted due to the lack of food or resources to receive the new comers.",
      "Earth is chaos. Hopeless. This is the end of the humanity.",
      `For the rest of their lives, they'll remember you as ${getRandomBadTitle()}.`,
    ].join("\n"),
    { width: 38 }
  );
}

const endText = Text({
  x: 0,
  y: 0,
  text: "",
  font: `24px ${defaultFontFamily}`,
  color: "white",
  anchor: { x: 0.5, y: 0.5 },
  textAlign: "center",
});

gameStore.on("@changed", (state) => {
  if (state.showingGameOverDialog && !endText.text.length) {
    if (gameStore.get().food > 100000 && gameStore.get().resources > 100000) {
      endText.text = getSuccessMessage();
    } else {
      endText.text = getFailureMessage();
    }
  }
});

export const gameOverDialog = Sprite({
  x: gameWidth / 2,
  y: gameHeight / 2,
  anchor: { x: 0.5, y: 0.5 },
  width: 512,
  height: 300,
  color: "black",
  opacity: 0.8,
  children: [endText],
});
