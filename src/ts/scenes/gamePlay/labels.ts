import { Text } from "kontra";
import { gameStore } from "../../gameStore";
import {
  defaultFontFamily,
  gameWidth,
  gameHeight,
  endGameDay,
} from "../../constants";
import { Color } from "../../enums";

function getPopulationText(population: number) {
  return `POPULATION\n${population}`;
}

const commonPopulationAndDaysPassedLabelProperties = {
  x: gameWidth / 2,
  lineHeight: 1.5,
  font: `40px ${defaultFontFamily}`,
  color: Color.Gray,
  anchor: { x: 0.5, y: 0.5 },
  textAlign: "center",
};

export const populationLabel = Text({
  ...commonPopulationAndDaysPassedLabelProperties,
  y: gameHeight / 2 - 110,
  text: getPopulationText(gameStore.get().population),
});

function getDaysPassedText(daysPassed: number) {
  return `NEXT ARRIVAL\n${endGameDay - daysPassed}`;
}

export const daysPassedLabel = Text({
  ...commonPopulationAndDaysPassedLabelProperties,
  y: gameHeight / 2 + 30,
  text: getDaysPassedText(gameStore.get().daysPassed),
});

function getConstructionSlotsText(availableConstructionSlots: number) {
  return `AVAILABLE SPOTS FOR\nCONSTRUCTION: ${availableConstructionSlots}`;
}

export const constructionSlotsLabel = Text({
  x: gameWidth / 2,
  y: gameHeight / 2 + 150,
  text: getConstructionSlotsText(gameStore.get().availableConstructionSlots),
  lineHeight: 1.5,
  font: `22px ${defaultFontFamily}`,
  color: Color.Gray,
  anchor: { x: 0.5, y: 0.5 },
  textAlign: "center",
});

function getFoodText() {
  const gameState = gameStore.get();
  const food = gameState.food.toLocaleString();
  const foodCreatedPerTick = gameState.foodCreatedPerTick.toLocaleString();
  const foodConsumedPerTick = gameState.foodConsumedPerTick.toLocaleString();
  return `FOOD\n${food}\n⇧${foodCreatedPerTick} ⇩${foodConsumedPerTick}`;
}

const commonTextProperties = {
  y: 100,
  font: `38px ${defaultFontFamily}`,
  lineHeight: 1.3,
  color: Color.Gray,
  anchor: { x: 0.5, y: 0.5 },
  textAlign: "center",
};

export const foodLabel = Text({
  ...commonTextProperties,
  x: 210,
  text: getFoodText(),
});

function getResourcesText() {
  const gameState = gameStore.get();
  const resources = gameState.resources.toLocaleString();
  const resourcesCreatedPerTick = gameState.resourcesCreatedPerTick.toLocaleString();
  const resourcesConsumedPerTick = gameState.resourcesConsumedPerTick.toLocaleString();
  return `RESOURCES\n${resources}\n⇧${resourcesCreatedPerTick} ⇩${resourcesConsumedPerTick}`;
}

export const resourcesLabel = Text({
  ...commonTextProperties,
  x: gameWidth - 210,
  text: getResourcesText(),
});

gameStore.on("@changed", (state) => {
  if (state.population)
    populationLabel.text = getPopulationText(state.population);

  if (state.daysPassed)
    daysPassedLabel.text = getDaysPassedText(state.daysPassed);

  if (!isNaN(state.availableConstructionSlots))
    constructionSlotsLabel.text = getConstructionSlotsText(
      state.availableConstructionSlots
    );

  if (state.food || state.foodCreatedPerTick || state.foodConsumedPerTick) {
    foodLabel.text = getFoodText();
  }

  if (
    state.resources ||
    state.resourcesCreatedPerTick ||
    state.resourcesConsumedPerTick
  ) {
    resourcesLabel.text = getResourcesText();
  }
});
