import { gameStore } from "../../gameStore";
import { tickStore } from "../../tickStore";

tickStore.on("@changed", () => {
  const gameState = gameStore.get();
  const foodCreatedPerTick = gameState.farming * 2;
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
