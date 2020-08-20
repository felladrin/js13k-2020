import { createStoreon, StoreonModule } from "storeon";

export enum GameLoopCallbacksStoreAction {
  AddUpdateCallback,
  AddRenderCallback,
}

type GameUpdateCallback = (deltaTime?: number) => void;
type GameRenderCallback = () => void;

interface GameLoopCallbacksState {
  onUpdate: GameUpdateCallback[];
  onRender: GameRenderCallback[];
}

const gameLoopCallbacksStoreModule: StoreonModule<GameLoopCallbacksState> = (
  store
) => {
  store.on("@init", () => ({
    onUpdate: [],
    onRender: [],
  }));

  store.on(
    GameLoopCallbacksStoreAction.AddUpdateCallback,
    ({ onUpdate }, callback: GameUpdateCallback) => ({
      onUpdate: onUpdate.concat([callback]),
    })
  );

  store.on(
    GameLoopCallbacksStoreAction.AddRenderCallback,
    ({ onRender }, callback: GameRenderCallback) => ({
      onRender: onRender.concat([callback]),
    })
  );
};

export const gameLoopCallbacksStore = createStoreon<GameLoopCallbacksState>([
  gameLoopCallbacksStoreModule,
]);
