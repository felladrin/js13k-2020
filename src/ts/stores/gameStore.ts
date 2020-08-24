import { createStoreon, StoreonModule } from "storeon";
import { initialPopulation } from "../constants";

export enum GameStoreAction {
  AddUpdateCallback,
  AddRenderCallback,
  AddOneDayPassed,
}

type GameUpdateCallback = (deltaTime?: number) => void;
type GameRenderCallback = () => void;

interface GameState {
  onUpdateCallbacks: GameUpdateCallback[];
  onRenderCallbacks: GameRenderCallback[];
  population: number;
  daysPassed: number;
  food: number;
  resources: number;
  farming: number;
  scavenging: number;
  researching: number;
  constructing: number;
  exploring: number;
  resting: number;
}

const gameStoreModule: StoreonModule<GameState> = (store) => {
  store.on("@init", () => ({
    onUpdateCallbacks: [],
    onRenderCallbacks: [],
    population: initialPopulation,
    daysPassed: 0,
    food: 0,
    resources: 0,
    farming: 0,
    scavenging: 0,
    researching: 0,
    constructing: 0,
    exploring: 0,
    resting: 0,
  }));

  store.on(
    GameStoreAction.AddUpdateCallback,
    ({ onUpdateCallbacks: onUpdate }, callback: GameUpdateCallback) => ({
      onUpdateCallbacks: onUpdate.concat([callback]),
    })
  );

  store.on(
    GameStoreAction.AddRenderCallback,
    ({ onRenderCallbacks: onRender }, callback: GameRenderCallback) => ({
      onRenderCallbacks: onRender.concat([callback]),
    })
  );

  store.on(GameStoreAction.AddOneDayPassed, ({ daysPassed }) => ({
    daysPassed: daysPassed + 1,
  }));
};

export const gameStore = createStoreon<GameState>([gameStoreModule]);
