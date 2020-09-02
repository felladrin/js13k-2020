import { gameStore } from "../../gameStore";
import { tickStore } from "../../tickStore";

tickStore.on("@changed", () => {
  const gameState = gameStore.get();

  gameStore.dispatch("increaseResearchProgress", gameState.researching / 100);

  gameStore.dispatch("increaseExplorationProgress", gameState.exploring / 100);

  gameStore.dispatch(
    "increaseConstructionProgress",
    gameState.constructing / 100
  );
});
