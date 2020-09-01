import { Action } from "./enums";

type GameUpdateCallback = (deltaTime?: number) => void;
type GameRenderCallback = () => void;

interface GameState {
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

interface TickState {
  ticksPassed: number;
}
