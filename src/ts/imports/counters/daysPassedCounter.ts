import { gameStore } from "../../gameStore";
import { gameTicksPerGameDay } from "../../constants";
import { tickStore } from "../../tickStore";

tickStore.on("@changed", (state) => {
  if (
    state.ticksPassed &&
    Math.floor(state.ticksPassed / gameTicksPerGameDay) >
      gameStore.get().daysPassed
  ) {
    gameStore.dispatch("addOneDayPassed");
  }
});
