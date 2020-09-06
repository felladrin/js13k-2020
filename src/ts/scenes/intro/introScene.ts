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
  hidden: true,
  onShow: () => {
    for (const child of introScene.children) {
      child.opacity = introScene.opacity;
    }
  },
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

gameStore.dispatch("addUpdateCallback", (deltaTime) => {
  introScene.update(deltaTime);
});

gameStore.dispatch("addRenderCallback", () => {
  introScene.render();
});

gameStore.on("@changed", (state) => {
  if (!state.activeGameScenes) return;

  state.activeGameScenes.includes(GameScene.Intro)
    ? introScene.show()
    : introScene.hide();
});

gameStore.dispatch("activateGameScene", GameScene.Intro);
