import { init, initPointer } from "kontra";
import { gameWidth, gameHeight } from "./constants";
import { gameStore } from "./gameStore";
import { tickStore } from "./tickStore";

export const { canvas } = init("gameCanvas");
canvas.width = gameWidth;
canvas.height = gameHeight;

const lastRecordedWindowSize = {
  width: window.innerWidth,
  height: window.innerHeight,
};

function handleWindowResize() {
  if (!canvas.parentElement) return;

  const proportion = {
    width:
      Math.min(canvas.parentElement.clientWidth, lastRecordedWindowSize.width) /
      canvas.width,
    height:
      Math.min(
        canvas.parentElement.clientHeight,
        lastRecordedWindowSize.height
      ) / canvas.height,
  };

  const scale =
    proportion.width < proportion.height ? proportion.width : proportion.height;

  const topPercentage =
    50 * (lastRecordedWindowSize.height / canvas.parentElement.clientHeight);

  const style: Partial<CSSStyleDeclaration> = {
    position: "relative",
    top: `${topPercentage}%`,
    left: "50%",
    transform: `translate(-50%, -50%) scale(${scale})`,
    transformOrigin: "center center",
    cursor: gameStore.get().cursorStyle,
  };

  for (const declaration of Object.keys(style)) {
    canvas.style.setProperty(
      declaration,
      (style as Record<string, string>)[declaration]
    );
  }

  window.scrollTo(1, 0);
  initPointer(canvas);
}

handleWindowResize();

gameStore.on("@changed", (state) => {
  if (state.cursorStyle) canvas.style.cursor = state.cursorStyle;
});

tickStore.on("@changed", () => {
  const currentWidth = window.innerWidth;
  const currentHeight = window.innerHeight;

  if (
    currentWidth != lastRecordedWindowSize.width ||
    currentHeight != lastRecordedWindowSize.height
  ) {
    lastRecordedWindowSize.width = currentWidth;
    lastRecordedWindowSize.height = currentHeight;
    handleWindowResize();
  }
});
