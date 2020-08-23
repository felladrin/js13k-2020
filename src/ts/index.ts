import "inobounce";
import "./canvas";
import { game } from "./game";
import { disablePinchToZoom } from "./functions";

if (process.env.NODE_ENV === "development") {
  try {
    const chiiScript = document.createElement("script");
    chiiScript.src = `//${window.location.hostname}:1233/target.js`;
    document.head.appendChild(chiiScript);
  } catch (error) {
    console.error(`Chii was not initialized due to ${error}`);
  }
}

disablePinchToZoom();
game.start();
