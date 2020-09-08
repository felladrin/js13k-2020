import { gameStore } from "../../gameStore";
import { gameTicksPerGameDay, endGameDay } from "../../constants";
import { GameScene, GameEvent } from "../../enums";
import { on } from "kontra";

let ticksPassed = 0;

on(GameEvent.GameTick, () => {
  if (gameStore.get().paused) return;

  if (!gameStore.get().activeGameScenes.includes(GameScene.GamePlay)) return;

  ticksPassed++;

  if (
    Math.floor(ticksPassed / gameTicksPerGameDay) > gameStore.get().daysPassed
  ) {
    gameStore.dispatch("addOneDayPassed");
  }

  if (gameStore.get().daysPassed == endGameDay) {
    if (!gameStore.get().hasShownGameOverDialog) {
      gameStore.dispatch("pauseGame");
      gameStore.dispatch("showGameOverDialog");
    }

    gameStore.dispatch("resetDaysPassed");
    gameStore.dispatch("doublePopulation");
  }
});

gameStore.on("resetDaysPassed", () => {
  ticksPassed = 0;
});
