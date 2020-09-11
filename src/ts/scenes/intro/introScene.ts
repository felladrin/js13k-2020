import { Scene, getCanvas } from "kontra";
import { gameStore } from "../../gameStore";
import { GameScene } from "../../enums";
import { introTextTitle } from "./introText";
import { addOneTimeListenerForClickTouchEndOnElement } from "../../functions";

const fadeSpeed = 0.8;
let fadeOutDelayInSeconds = 2;
let isFadingIn = false;
let isFadingOut = false;

export const introScene = Scene({
  id: GameScene.Intro,
  children: [introTextTitle],
  opacity: 0,
  hidden: true,
  onShow: () => {
    isFadingIn = true;

    for (const child of introScene.children) {
      child.opacity = introScene.opacity;
    }

    addOneTimeListenerForClickTouchEndOnElement(getCanvas(), () => {
      isFadingIn = false;
      isFadingOut = true;
    });
  },
  update: (deltaTime) => {
    if (!deltaTime) return;

    if (isFadingIn || isFadingOut) {
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
    }

    if (!isFadingIn && !isFadingOut) {
      fadeOutDelayInSeconds -= deltaTime;

      if (fadeOutDelayInSeconds <= 0) isFadingOut = true;
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
