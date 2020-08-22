export function getKeysFromEnum<E>(e: E): (keyof E)[] {
  return Object.keys(e) as (keyof E)[];
}

export function disablePinchToZoom(): void {
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
}
