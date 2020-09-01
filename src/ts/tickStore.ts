import { createStoreon } from "storeon";

interface Events {
  incrementTicksPassed: void;
}

interface State {
  ticksPassed: number;
}

export const tickStore = createStoreon<State, Events>([
  (store) => {
    store.on("@init", () => ({
      ticksPassed: 0,
    }));

    store.on("incrementTicksPassed", ({ ticksPassed }) => ({
      ticksPassed: ticksPassed + 1,
    }));
  },
]);
