import { gameStore } from "../../gameStore";
import { tickStore } from "../../tickStore";

tickStore.on("@changed", () => {
  const gameState = gameStore.get();

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
});
