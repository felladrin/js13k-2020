import { init } from "kontra";
import { configStore } from "./stores/configStore";

export const { canvas } = init("gameCanvas");
canvas.width = configStore.get().gameWidth;
canvas.height = configStore.get().gameHeight;

function handleWindowResize() {
  const proportion = {
    width: canvas.parentElement.clientWidth / canvas.width,
    height: canvas.parentElement.clientHeight / canvas.height,
  };

  const scale =
    proportion.width < proportion.height ? proportion.width : proportion.height;

  canvas.style.transformOrigin = "left top";
  canvas.style.transform = `scale(${scale})`;
}

handleWindowResize();

window.addEventListener("resize", handleWindowResize, false);
