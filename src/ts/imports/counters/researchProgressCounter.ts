import { gameStore } from "../../gameStore";
import { tickStore } from "../../tickStore";

tickStore.on("@changed", () => {
  const gameState = gameStore.get();
  const percentage = gameState.researching / 100;

  gameStore.dispatch("increaseResearchProgress", percentage);
});
