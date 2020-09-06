import { Scene, getCanvas } from "kontra";
import { gameStore } from "../../gameStore";
import { GameScene } from "../../enums";
import { startText } from "./startText";

const fadeSpeed = 0.5;
let isFadingIn = true;
let isFadingOut = false;

export const startScene = Scene({
  id: GameScene.Start,
  children: [startText],
  opacity: 0,
  hidden: true,
  onShow: () => {
    for (const child of startScene.children) {
      child.opacity = startScene.opacity;
    }
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

const eventsToListen = ["click", "touchend"];

for (const eventToAdd of eventsToListen) {
  getCanvas().addEventListener(eventToAdd, function onClickAnywhere() {
    isFadingIn = false;
    isFadingOut = true;
    for (const eventToRemove of eventsToListen) {
      getCanvas().removeEventListener(eventToRemove, onClickAnywhere);
    }
  });
}

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
