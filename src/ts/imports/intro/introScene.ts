import { Scene } from "kontra";
import { gameStore } from "../../gameStore";
import { GameScene } from "../../enums";
import { introText } from "./introText";

const fadeSpeed = 0.5;
let isFadingIn = true;

export const introScene = Scene({
  id: GameScene.Intro,
  children: [introText],
  opacity: 0,
  update: (deltaTime) => {
    if (!deltaTime) return;

    introScene.opacity += (isFadingIn ? fadeSpeed : -fadeSpeed) * deltaTime;

    for (const child of introScene.children) {
      child.opacity = introScene.opacity;
    }

    if (introScene.opacity >= 1) {
      isFadingIn = false;
    } else if (introScene.opacity <= 0) {
      gameStore.dispatch("deactivateGameScene", GameScene.Intro);
      gameStore.dispatch("activateGameScene", GameScene.Start);
    }
  },
});

for (const child of introScene.children) {
  child.opacity = introScene.opacity;
}

gameStore.dispatch("activateGameScene", GameScene.Intro);

gameStore.dispatch("addUpdateCallback", (deltaTime) => {
  if (gameStore.get().activeGameScenes.includes(GameScene.Intro)) {
    introScene.update(deltaTime);
  }
});

gameStore.dispatch("addRenderCallback", () => {
  if (gameStore.get().activeGameScenes.includes(GameScene.Intro)) {
    introScene.render();
  }
});
