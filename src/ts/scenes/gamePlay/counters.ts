import { gameStore } from "../../gameStore";
import { GameScene, GameEvent } from "../../enums";
import { on } from "kontra";
import { gameTicksPerGameDay, endGameDay } from "../../constants";

let ticksPassed = 0;

gameStore.on("resetDaysPassed", () => {
  ticksPassed = 0;
});

on(GameEvent.GameTick, () => {
  if (gameStore.get().paused) return;

  if (!gameStore.get().activeGameScenes.includes(GameScene.GamePlay)) return;

  const gameState = gameStore.get();

  const foodCreatedPerTick = gameState.farming * gameState.farmingConstructions;
  const foodConsumedPerTick =
    gameState.constructing +
    gameState.exploring +
    gameState.researching +
    gameState.resting +
    gameState.scavenging;
  const food = gameState.food + foodCreatedPerTick - foodConsumedPerTick;

  gameStore.dispatch("update", {
    food,
    foodCreatedPerTick,
    foodConsumedPerTick,
  });

  gameStore.dispatch("increaseResearchProgress");
  gameStore.dispatch("increaseExplorationProgress");
  gameStore.dispatch("increaseConstructionProgress");

  const resourcesCreatedPerTick =
    gameState.scavenging * gameState.scavengingImprovements;
  const resourcesConsumedPerTick =
    gameState.constructing + gameState.researching;
  const resources =
    gameState.resources + resourcesCreatedPerTick - resourcesConsumedPerTick;

  gameStore.dispatch("update", {
    resources,
    resourcesCreatedPerTick,
    resourcesConsumedPerTick,
  });

  ticksPassed++;

  if (
    Math.floor(ticksPassed / gameTicksPerGameDay) > gameStore.get().daysPassed
  ) {
    gameStore.dispatch("addOneDayPassed");
  }

  if (gameStore.get().daysPassed == endGameDay) {
    if (!gameStore.get().hasShownGameOverDialog) {
      gameStore.dispatch("update", {
        paused: true,
        showingGameOverDialog: true,
      });
    }

    gameStore.dispatch("resetDaysPassed");
    gameStore.dispatch("update", {
      population: gameStore.get().population * 2,
    });
  }
});
