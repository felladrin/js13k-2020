import {
  gameLoopCallbacksStore,
  GameLoopCallbacksStoreAction,
} from "../../stores/gameLoopCallbacksStore";
import { gameStore, GameStoreAction } from "../../stores/gameStore";
import { secondsPerInGameDay } from "../../constants";

let accumulatedDeltaTime = 0;

export function increaseAccumulatedDeltaTime(deltaTime: number): void {
  accumulatedDeltaTime += deltaTime;

  if (accumulatedDeltaTime > secondsPerInGameDay) {
    gameStore.dispatch(GameStoreAction.AddOneDayPassed);
    accumulatedDeltaTime -= secondsPerInGameDay;
  }
}

gameLoopCallbacksStore.dispatch(
  GameLoopCallbacksStoreAction.AddUpdateCallback,
  (deltaTime: number) => {
    increaseAccumulatedDeltaTime(deltaTime);
  }
);
