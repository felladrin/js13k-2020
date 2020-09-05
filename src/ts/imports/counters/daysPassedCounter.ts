import { gameStore } from "../../gameStore";
import { gameTicksPerGameDay } from "../../constants";
import { GameScene, GameEvent } from "../../enums";
import { on } from "kontra";

let ticksPassed = 0;

on(GameEvent.GameTick, () => {
  if (!gameStore.get().activeGameScenes.includes(GameScene.GamePlay)) return;

  ticksPassed++;

  if (
    Math.floor(ticksPassed / gameTicksPerGameDay) > gameStore.get().daysPassed
  ) {
    gameStore.dispatch("addOneDayPassed");
  }
});
