import { gameStore, GameStoreAction } from "../../gameStore";
import { secondsPerInGameDay } from "../../constants";

let accumulatedDeltaTime = 0;

export function increaseAccumulatedDeltaTime(deltaTime: number): void {
  accumulatedDeltaTime += deltaTime;

  if (accumulatedDeltaTime > secondsPerInGameDay) {
    gameStore.dispatch(GameStoreAction.AddOneDayPassed);
    accumulatedDeltaTime -= secondsPerInGameDay;
  }
}

gameStore.dispatch(GameStoreAction.AddUpdateCallback, (deltaTime: number) => {
  increaseAccumulatedDeltaTime(deltaTime);
});
