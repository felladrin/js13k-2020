import { gameStore, GameStoreAction } from "../../gameStore";
import { tickStore } from "../../tickStore";

tickStore.on("@changed", () => {
  const gameState = gameStore.get();
  const percentage = gameState.researching / 100;

  gameStore.dispatch(GameStoreAction.IncreaseResearchProgress, percentage);
});
