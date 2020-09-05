import { gameStore } from "../../gameStore";
import { GameScene, GameEvent } from "../../enums";
import { on } from "kontra";

on(GameEvent.GameTick, () => {
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
});
