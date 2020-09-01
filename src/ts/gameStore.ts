import { createStoreon, StoreonModule } from "storeon";
import { initialPopulation } from "./constants";
import { Action } from "./enums";
import { clamp } from "kontra";

type GameUpdateCallback = (deltaTime?: number) => void;
type GameRenderCallback = () => void;

interface Events {
  addUpdateCallback: GameUpdateCallback;
  addRenderCallback: GameRenderCallback;
  addOneDayPassed: void;
  updatePopulationStats: {
    [key in Action]: number;
  };
  updateFoodStats: {
    food: number;
    foodCreatedPerTick: number;
    foodConsumedPerTick: number;
  };
  updateResourcesStats: {
    resources: number;
    resourcesCreatedPerTick: number;
    resourcesConsumedPerTick: number;
  };
  setActionToBoost: Action | null;
  increaseExplorationProgress: number;
  increaseConstructionProgress: number;
  increaseResearchProgress: number;
  incrementAvailableConstructionSlots: void;
}

interface State {
  onUpdateCallbacks: GameUpdateCallback[];
  onRenderCallbacks: GameRenderCallback[];
  population: number;
  daysPassed: number;
  food: number;
  foodCreatedPerTick: number;
  foodConsumedPerTick: number;
  resources: number;
  resourcesCreatedPerTick: number;
  resourcesConsumedPerTick: number;
  farming: number;
  scavenging: number;
  researching: number;
  constructing: number;
  exploring: number;
  resting: number;
  explorationProgressPercentage: number;
  constructionProgressPercentage: number;
  researchProgressPercentage: number;
  availableConstructionSlots: number;
  actionToBoost: Action | null;
}

const gameStoreModule: StoreonModule<State, Events> = (store) => {
  store.on("@init", () => ({
    onUpdateCallbacks: [],
    onRenderCallbacks: [],
    population: initialPopulation,
    daysPassed: 0,
    food: 10000,
    foodCreatedPerTick: 0,
    foodConsumedPerTick: 0,
    resources: 10000,
    resourcesCreatedPerTick: 0,
    resourcesConsumedPerTick: 0,
    farming: 0,
    scavenging: 0,
    researching: 0,
    constructing: 0,
    exploring: 0,
    resting: 0,
    explorationProgressPercentage: 0,
    constructionProgressPercentage: 0,
    researchProgressPercentage: 0,
    availableConstructionSlots: 0,
    actionToBoost: null,
  }));

  store.on("addUpdateCallback", ({ onUpdateCallbacks }, callback) => ({
    onUpdateCallbacks: onUpdateCallbacks.concat([callback]),
  }));

  store.on("addRenderCallback", ({ onRenderCallbacks }, callback) => ({
    onRenderCallbacks: onRenderCallbacks.concat([callback]),
  }));

  store.on("addOneDayPassed", ({ daysPassed }) => ({
    daysPassed: daysPassed + 1,
  }));

  store.on("updatePopulationStats", (_, newStats) => ({
    farming: newStats.Farming,
    scavenging: newStats.Scavenging,
    researching: newStats.Researching,
    constructing: newStats.Constructing,
    exploring: newStats.Exploring,
    resting: newStats.Resting,
  }));

  store.on("setActionToBoost", (_, actionToBoost) => ({
    actionToBoost,
  }));

  store.on("updateFoodStats", (_, foodStats) => ({ ...foodStats }));

  store.on("updateResourcesStats", (_, resourcesStats) => ({
    ...resourcesStats,
  }));

  store.on(
    "increaseConstructionProgress",
    ({ constructionProgressPercentage }, percentage) => ({
      constructionProgressPercentage: clamp(
        0,
        100,
        constructionProgressPercentage + percentage
      ),
    })
  );

  store.on(
    "increaseExplorationProgress",
    ({ explorationProgressPercentage }, percentage) => {
      let newPercentage = clamp(
        0,
        100,
        explorationProgressPercentage + percentage
      );

      if (newPercentage == 100) {
        newPercentage = 0;
        store.dispatch("incrementAvailableConstructionSlots");
      }

      return {
        explorationProgressPercentage: newPercentage,
      };
    }
  );

  store.on(
    "incrementAvailableConstructionSlots",
    ({ availableConstructionSlots }) => ({
      availableConstructionSlots: availableConstructionSlots + 1,
    })
  );

  store.on(
    "increaseResearchProgress",
    ({ researchProgressPercentage }, percentage) => ({
      researchProgressPercentage: clamp(
        0,
        100,
        researchProgressPercentage + percentage
      ),
    })
  );
};

export const gameStore = createStoreon<State, Events>([gameStoreModule]);
