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

  gameStore.dispatch("updateFoodStats", {
    food,
    foodCreatedPerTick,
    foodConsumedPerTick,
  });

  gameStore.dispatch(
    "increaseResearchProgress",
    (gameState.researching * gameState.researchingConstructions) / 100
  );

  gameStore.dispatch(
    "increaseExplorationProgress",
    (gameState.exploring * gameState.exploringImprovements) / 100
  );

  gameStore.dispatch(
    "increaseConstructionProgress",
    (gameState.constructing * gameState.constructingImprovements) / 100
  );

  const resourcesCreatedPerTick =
    gameState.scavenging * gameState.scavengingImprovements;
  const resourcesConsumedPerTick =
    gameState.constructing + gameState.researching;
  const resources =
    gameState.resources + resourcesCreatedPerTick - resourcesConsumedPerTick;

  gameStore.dispatch("updateResourcesStats", {
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
      gameStore.dispatch("pauseGame");
      gameStore.dispatch("showGameOverDialog");
    }

    gameStore.dispatch("resetDaysPassed");
    gameStore.dispatch("doublePopulation");
  }
});
