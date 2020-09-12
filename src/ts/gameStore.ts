import { createStoreon } from "storeon";
import { initialPopulation } from "./constants";
import { Action, GameScene } from "./enums";
import { clamp, Button } from "kontra";

type GameUpdateCallback = (deltaTime?: number) => void;
type GameRenderCallback = () => void;

interface Events {
  update: Partial<State>;
  addUpdateCallback: GameUpdateCallback;
  addRenderCallback: GameRenderCallback;
  addOneDayPassed: void;
  increaseExplorationProgress: void;
  increaseConstructionProgress: void;
  increaseResearchProgress: void;
  incrementAvailableConstructionSlots: void;
  activateGameScene: GameScene;
  deactivateGameScene: GameScene;
  pauseGame: void;
  resumeGame: void;
  showGameOverDialog: void;
  hideGameOverDialog: void;
  doublePopulation: void;
  resetDaysPassed: void;
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
  farmingConstructions: number;
  researchingConstructions: number;
  restingConstructions: number;
  constructingImprovements: number;
  exploringImprovements: number;
  scavengingImprovements: number;
  actionToBoost: Action | null;
  hoveredButton: Button | null;
  activeGameScenes: GameScene[];
  paused: boolean;
  showingGameOverDialog: boolean;
  hasShownGameOverDialog: boolean;
  nextConstruction: Action;
  nextResearch: Action;
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
      availableConstructionSlots: 1,
      farmingConstructions: 1,
      researchingConstructions: 1,
      restingConstructions: 1,
      constructingImprovements: 1,
      exploringImprovements: 1,
      scavengingImprovements: 1,
      actionToBoost: null,
      hoveredButton: null,
      activeGameScenes: [],
      paused: false,
      showingGameOverDialog: false,
      hasShownGameOverDialog: false,
      nextConstruction: Action.Farming,
      nextResearch: Action.Scavenging,
    }));

    store.on("update", (_, state) => state);

    store.on("addUpdateCallback", ({ onUpdateCallbacks }, callback) => ({
      onUpdateCallbacks: onUpdateCallbacks.concat([callback]),
    }));

    store.on("addRenderCallback", ({ onRenderCallbacks }, callback) => ({
      onRenderCallbacks: onRenderCallbacks.concat([callback]),
    }));

    store.on("addOneDayPassed", ({ daysPassed }) => ({
      daysPassed: daysPassed + 1,
    }));

    store.on(
      "increaseConstructionProgress",
      ({
        constructing,
        constructingImprovements,
        constructionProgressPercentage,
        nextConstruction,
        farmingConstructions,
        researchingConstructions,
        restingConstructions,
        availableConstructionSlots,
      }) => {
        const percentage = (constructing * constructingImprovements) / 100;

        let newPercentage = clamp(
          0,
          100,
          constructionProgressPercentage + percentage
        );

        if (newPercentage == 100) {
          newPercentage = 0;

          switch (nextConstruction) {
            case Action.Farming:
              farmingConstructions++;
              availableConstructionSlots--;
              break;
            case Action.Researching:
              researchingConstructions++;
              availableConstructionSlots--;
              break;
            case Action.Resting:
              restingConstructions++;
              availableConstructionSlots--;
              break;
          }
        }

        return {
          constructionProgressPercentage: newPercentage,
          farmingConstructions,
          researchingConstructions,
          restingConstructions,
          availableConstructionSlots,
        };
      }
    );

    store.on(
      "increaseExplorationProgress",
      ({ exploring, exploringImprovements, explorationProgressPercentage }) => {
        const percentage = (exploring * exploringImprovements) / 100;
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
      ({
        researching,
        researchingConstructions,
        researchProgressPercentage,
        nextResearch,
        constructingImprovements,
        exploringImprovements,
        scavengingImprovements,
      }) => {
        const percentage = (researching * researchingConstructions) / 100;

        let newPercentage = clamp(
          0,
          100,
          researchProgressPercentage + percentage
        );

        if (newPercentage == 100) {
          newPercentage = 0;

          switch (nextResearch) {
            case Action.Constructing:
              constructingImprovements++;
              break;
            case Action.Exploring:
              exploringImprovements++;
              break;
            case Action.Scavenging:
              scavengingImprovements++;
              break;
          }
        }

        return {
          researchProgressPercentage: newPercentage,
          constructingImprovements,
          exploringImprovements,
          scavengingImprovements,
        };
      }
    );

    store.on(
      "incrementAvailableConstructionSlots",
      ({ availableConstructionSlots }) => ({
        availableConstructionSlots: availableConstructionSlots + 1,
      })
    );

    store.on("activateGameScene", ({ activeGameScenes }, gameScene) => ({
      activeGameScenes: activeGameScenes.concat([gameScene]),
    }));

    store.on("deactivateGameScene", ({ activeGameScenes }, gameScene) => ({
      activeGameScenes: activeGameScenes.filter((scene) => scene != gameScene),
    }));

    store.on("pauseGame", () => ({ paused: true }));

    store.on("resumeGame", () => ({ paused: false }));

    store.on("showGameOverDialog", () => ({ showingGameOverDialog: true }));

    store.on("hideGameOverDialog", () => ({
      showingGameOverDialog: false,
      hasShownGameOverDialog: true,
    }));

    store.on("doublePopulation", ({ population }) => ({
      population: population * 2,
    }));

    store.on("resetDaysPassed", () => ({ daysPassed: 0 }));
  },
]);
