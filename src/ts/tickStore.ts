import { createStoreon, StoreonModule } from "storeon";

interface State {
  ticksPassed: number;
}
interface Events {
  incrementTicksPassed: void;
}

const tickStoreModule: StoreonModule<State, Events> = (store) => {
  store.on("@init", () => ({
    ticksPassed: 0,
  }));

  store.on("incrementTicksPassed", ({ ticksPassed }) => ({
    ticksPassed: ticksPassed + 1,
  }));
};

export const tickStore = createStoreon<State, Events>([tickStoreModule]);
