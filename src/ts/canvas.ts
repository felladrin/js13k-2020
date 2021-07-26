import { init, initPointer } from "kontra";
import { gameWidth, gameHeight } from "./constants";
import { gameStore } from "./gameStore";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import fit from "math-fit";

export const { canvas } = init("gameCanvas");
canvas.width = gameWidth;
canvas.height = gameHeight;

function handleWindowResize() {
  if (!canvas.parentElement) return;

  const fittingProps = fit.contain(
    { w: canvas.width, h: canvas.height },
    {
      w: canvas.parentElement.clientWidth,
      h: canvas.parentElement.clientHeight,
    }
  );

  const style: Partial<CSSStyleDeclaration> = {
    marginTop: `${fittingProps.top}px`,
    marginLeft: `${fittingProps.left}px`,
    width: `${fittingProps.width}px`,
    height: `${fittingProps.height}px`,
  };

  for (const declaration of Object.keys(style)) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    canvas.style[declaration] = (style as Record<string, string>)[declaration];
  }

  window.scrollTo(1, 0);
  initPointer(canvas);
}

handleWindowResize();

window.addEventListener("resize", handleWindowResize);

gameStore.on("@changed", (state) => {
  if (state.hoveredButton) {
    canvas.style.cursor = "pointer";
  } else if (state.hoveredButton === null) {
    canvas.style.cursor = "auto";
  }
});
