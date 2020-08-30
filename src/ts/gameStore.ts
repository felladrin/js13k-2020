import { createStoreon, StoreonModule } from "storeon";
import { initialPopulation } from "./constants";
import { Action } from "./enums";
import {
  GameState,
  GameRenderCallback,
  GameUpdateCallback,
} from "./declarations";

export enum GameStoreAction {
  AddUpdateCallback,
  AddRenderCallback,
  AddOneDayPassed,
  UpdatePopulationStats,
  UpdateFoodStats,
  UpdateResourcesStats,
  SetActionToBoost,
}

const gameStoreModule: StoreonModule<GameState> = (store) => {
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
    actionToBoost: null,
  }));

  store.on(
    GameStoreAction.AddUpdateCallback,
    ({ onUpdateCallbacks }, callback: GameUpdateCallback) => ({
      onUpdateCallbacks: onUpdateCallbacks.concat([callback]),
    })
  );

  store.on(
    GameStoreAction.AddRenderCallback,
    ({ onRenderCallbacks }, callback: GameRenderCallback) => ({
      onRenderCallbacks: onRenderCallbacks.concat([callback]),
    })
  );

  store.on(GameStoreAction.AddOneDayPassed, ({ daysPassed }) => ({
    daysPassed: daysPassed + 1,
  }));

  store.on(
    GameStoreAction.UpdatePopulationStats,
    (
      _,
      newStats: {
        [key in Action]: number;
      }
    ) => ({
      farming: newStats.Farming,
      scavenging: newStats.Scavenging,
      researching: newStats.Researching,
      constructing: newStats.Constructing,
      exploring: newStats.Exploring,
      resting: newStats.Resting,
    })
  );

  store.on(GameStoreAction.SetActionToBoost, (_, actionToBoost: Action) => ({
    actionToBoost,
  }));

  store.on(
    GameStoreAction.UpdateFoodStats,
    (
      _,
      foodStats: {
        food: number;
        foodCreatedPerTick: number;
        foodConsumedPerTick: number;
      }
    ) => ({ ...foodStats })
  );

  store.on(
    GameStoreAction.UpdateResourcesStats,
    (
      _,
      resourcesStats: {
        resources: number;
        resourcesCreatedPerTick: number;
        resourcesConsumedPerTick: number;
      }
    ) => ({ ...resourcesStats })
  );
};

export const gameStore = createStoreon<GameState>([gameStoreModule]);
