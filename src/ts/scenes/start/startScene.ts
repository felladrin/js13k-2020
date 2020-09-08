import { Scene, getCanvas } from "kontra";
import { gameStore } from "../../gameStore";
import { GameScene } from "../../enums";
import { startText } from "./startText";
import { addOneTimeListenerForClickTouchEndOnElement } from "../../functions";

const fadeSpeed = 0.8;
let isFadingIn = false;
let isFadingOut = false;

export const startScene = Scene({
  id: GameScene.Start,
  children: [startText],
  opacity: 0,
  hidden: true,
  onShow: () => {
    isFadingIn = true;

    for (const child of startScene.children) {
      child.opacity = startScene.opacity;
    }

    addOneTimeListenerForClickTouchEndOnElement(getCanvas(), () => {
      isFadingIn = false;
      isFadingOut = true;
    });
  },
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
  },
});

for (const child of startScene.children) {
  child.opacity = startScene.opacity;
}

gameStore.dispatch("addUpdateCallback", (deltaTime) => {
  startScene.update(deltaTime);
});

gameStore.dispatch("addRenderCallback", () => {
  startScene.render();
});

gameStore.on("@changed", (state) => {
  if (!state.activeGameScenes) return;

  state.activeGameScenes.includes(GameScene.Start)
    ? startScene.show()
    : startScene.hide();
});
