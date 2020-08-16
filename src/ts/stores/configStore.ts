import { createStoreon, StoreonModule } from "storeon";

interface ConfigStoreState {
  gameWidth: number;
  gameHeight: number;
}

const configStoreModule: StoreonModule<ConfigStoreState> = (store) => {
  store.on("@init", () => ({
    gameWidth: 1024,
    gameHeight: 1024,
  }));
};

export const configStore = createStoreon<ConfigStoreState>([configStoreModule]);
