import { gameStore } from "../../gameStore";
import { gameTicksPerGameDay } from "../../constants";
import { tickStore } from "../../tickStore";

tickStore.on("@changed", () => {
  if (
    Math.floor(tickStore.get().ticksPassed / gameTicksPerGameDay) >
    gameStore.get().daysPassed
  ) {
    gameStore.dispatch("addOneDayPassed");
  }
});
