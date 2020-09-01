import { gameStore } from "../../gameStore";
import { tickStore } from "../../tickStore";

tickStore.on("@changed", () => {
  gameStore.dispatch(
    "increaseResearchProgress",
    gameStore.get().researching / 100
  );

  gameStore.dispatch(
    "increaseExplorationProgress",
    gameStore.get().exploring / 100
  );

  gameStore.dispatch(
    "increaseConstructionProgress",
    gameStore.get().constructing / 100
  );
});
