import { gameStore } from "../../gameStore";
import { GameScene, GameEvent } from "../../enums";
import { on } from "kontra";

on(GameEvent.GameTick, () => {
  if (!gameStore.get().activeGameScenes.includes(GameScene.GamePlay)) return;

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
