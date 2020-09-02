import { createStoreon } from "storeon";

interface Events {
  incrementTicksPassed: void;
}

interface State {
  ticksPassed: number;
}

export const tickStore = createStoreon<State, Events>([
  process.env.NODE_ENV === "development" &&
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    require("storeon/devtools").storeonDevtools,
  (store) => {
    store.on("@init", () => ({
      ticksPassed: 0,
    }));

    store.on("incrementTicksPassed", ({ ticksPassed }) => ({
      ticksPassed: ticksPassed + 1,
    }));
  },
]);
