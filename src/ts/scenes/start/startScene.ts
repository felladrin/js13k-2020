import { Scene } from "kontra";
import { gameStore } from "../../gameStore";
import { GameScene } from "../../enums";
import { startText } from "./startText";
import { startButton } from "./startButton";

const fadeSpeed = 0.5;
let isFadingIn = true;
let isFadingOut = false;

export const startScene = Scene({
  id: GameScene.Start,
  children: [startText, startButton],
  opacity: 0,
  update: (deltaTime) => {
    if (!deltaTime) return;

    if (isFadingIn) {
      startScene.opacity += fadeSpeed * deltaTime;

      for (const child of startScene.children) {
        child.opacity = startScene.opacity;
      }

      if (startScene.opacity >= 1) {
        isFadingIn = false;
      }
    }

    if (isFadingOut) {
      startScene.opacity -= fadeSpeed * deltaTime;

      for (const child of startScene.children) {
        child.opacity = startScene.opacity;
      }

      if (startScene.opacity <= 0) {
        isFadingOut = false;
        gameStore.dispatch("deactivateGameScene", GameScene.Start);
        gameStore.dispatch("activateGameScene", GameScene.GamePlay);
      }
    }

    if (!isFadingIn && !isFadingOut && startButton.pressed) {
      isFadingOut = true;
    }
  },
});

for (const child of startScene.children) {
  child.opacity = startScene.opacity;
}

gameStore.dispatch("addUpdateCallback", (deltaTime) => {
  if (gameStore.get().activeGameScenes.includes(GameScene.Start)) {
    startScene.update(deltaTime);
  }
});

gameStore.dispatch("addRenderCallback", () => {
  if (gameStore.get().activeGameScenes.includes(GameScene.Start)) {
    startScene.render();
  }
});
