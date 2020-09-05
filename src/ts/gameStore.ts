import { createStoreon } from "storeon";
import { initialPopulation } from "./constants";
import { Action } from "./enums";
import { clamp, Button } from "kontra";

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
  incrementAvailableImprovementSlots: void;
  setHoveredButton: Button | null;
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
  availableImprovementSlots: number;
  farmingConstructions: number;
  researchingConstructions: number;
  restingConstructions: number;
  constructingImprovements: number;
  exploringImprovements: number;
  scavengingImprovements: number;
  actionToBoost: Action | null;
  cursorStyle: CSSStyleDeclaration["cursor"];
  hoveredButton: Button | null;
}

export const gameStore = createStoreon<State, Events>([
  process.env.NODE_ENV === "development" &&
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    require("storeon/devtools").storeonDevtools,
  (store) => {
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
      availableImprovementSlots: 0,
      farmingConstructions: 1,
      researchingConstructions: 1,
      restingConstructions: 1,
      constructingImprovements: 1,
      exploringImprovements: 1,
      scavengingImprovements: 1,
      actionToBoost: null,
      hoveredButton: null,
      cursorStyle: "auto",
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
      ({ constructionProgressPercentage }, percentage) => {
        let newPercentage = clamp(
          0,
          100,
          constructionProgressPercentage + percentage
        );

        if (newPercentage == 100) {
          newPercentage = 0;
        }

        return {
          constructionProgressPercentage: newPercentage,
        };
      }
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
      "increaseResearchProgress",
      ({ researchProgressPercentage }, percentage) => {
        let newPercentage = clamp(
          0,
          100,
          researchProgressPercentage + percentage
        );

        if (newPercentage == 100) {
          newPercentage = 0;
          store.dispatch("incrementAvailableImprovementSlots");
        }

        return {
          researchProgressPercentage: newPercentage,
        };
      }
    );

    store.on(
      "incrementAvailableImprovementSlots",
      ({ availableImprovementSlots }) => ({
        availableImprovementSlots: availableImprovementSlots + 1,
      })
    );

    store.on(
      "incrementAvailableConstructionSlots",
      ({ availableConstructionSlots }) => ({
        availableConstructionSlots: availableConstructionSlots + 1,
      })
    );

    store.on("setHoveredButton", (_, hoveredButton) => ({
      hoveredButton,
      cursorStyle: hoveredButton ? "pointer" : "auto",
    }));
  },
]);
