import { createStoreon, StoreonModule } from "storeon";
import { initialPopulation } from "../constants";

export enum GameStoreAction {
  AddOneDayPassed,
}

interface GameState {
  population: number;
  daysPassed: number;
  food: number;
  resources: number;
}

const gameStoreModule: StoreonModule<GameState> = (store) => {
  store.on("@init", () => ({
    population: initialPopulation,
    daysPassed: 0,
    food: 0,
    resources: 0,
  }));

  store.on(GameStoreAction.AddOneDayPassed, ({ daysPassed }) => ({
    daysPassed: daysPassed + 1,
  }));
};

export const gameStore = createStoreon<GameState>([gameStoreModule]);
