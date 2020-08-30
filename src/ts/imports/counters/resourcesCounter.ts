import { gameStore, GameStoreAction } from "../../gameStore";
import { tickStore } from "../../tickStore";

tickStore.on("@changed", () => {
  const gameState = gameStore.get();
  const resourcesCreatedPerTick = gameState.scavenging * 2;
  const resourcesConsumedPerTick =
    gameState.constructing + gameState.researching;
  const resources =
    gameState.resources + resourcesCreatedPerTick - resourcesConsumedPerTick;

  gameStore.dispatch(GameStoreAction.UpdateResourcesStats, {
    resources,
    resourcesCreatedPerTick,
    resourcesConsumedPerTick,
  });
});
