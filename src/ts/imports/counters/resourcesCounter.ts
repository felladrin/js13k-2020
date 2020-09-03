import { gameStore } from "../../gameStore";
import { tickStore } from "../../tickStore";

tickStore.on("@changed", () => {
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
