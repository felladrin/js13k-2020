import { gameStore, GameStoreAction } from "../../gameStore";
import { tickStore } from "../../tickStore";

tickStore.on("@changed", () => {
  const gameState = gameStore.get();
  const percentage = gameState.exploring / 100;

  gameStore.dispatch(GameStoreAction.IncreaseExplorationProgress, percentage);
});
