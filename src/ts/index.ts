import "inobounce";
import "./canvas";
import "./scenes";
import { game } from "./game";
import { disablePinchToZoom } from "./functions";

if (process.env.NODE_ENV === "development") {
  const chiiScript = document.createElement("script");
  chiiScript.src = `//${window.location.hostname}:1233/target.js`;
  document.body.appendChild(chiiScript);
}

disablePinchToZoom();
game.start();
