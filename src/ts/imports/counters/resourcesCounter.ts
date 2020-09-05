import { gameStore } from "../../gameStore";
import { GameScene, GameEvent } from "../../enums";
import { on } from "kontra";

on(GameEvent.GameTick, () => {
  if (!gameStore.get().activeGameScenes.includes(GameScene.GamePlay)) return;

  const gameState = gameStore.get();
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
});
