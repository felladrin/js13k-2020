import "inobounce";
import "./canvas";
import { game } from "./game";

document.addEventListener(
  "touchmove",
  function (event) {
    const { scale } = (event as unknown) as { scale: number };
    if (scale !== 1) {
      event.preventDefault();
    }
  },
  { passive: false }
);

game.start();
