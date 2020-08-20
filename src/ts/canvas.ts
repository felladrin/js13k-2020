import { init } from "kontra";
import { configStore } from "./stores/configStore";

export const { canvas } = init("gameCanvas");
canvas.width = configStore.get().gameWidth;
canvas.height = configStore.get().gameHeight;

function handleWindowResize() {
  if (!canvas.parentElement) return;

  const proportion = {
    width: canvas.parentElement.clientWidth / canvas.width,
    height: canvas.parentElement.clientHeight / canvas.height,
  };

  const scale =
    proportion.width < proportion.height ? proportion.width : proportion.height;

  const style: Partial<CSSStyleDeclaration> = {
    position: "relative",
    top: "50%",
    left: "50%",
    transform: `translate(-50%, -50%) scale(${scale})`,
    transformOrigin: "center center",
  };

  for (const declaration of Object.keys(style)) {
    canvas.style.setProperty(
      declaration,
      (style as Record<string, string>)[declaration]
    );
  }
}

handleWindowResize();

window.addEventListener("resize", handleWindowResize, false);
