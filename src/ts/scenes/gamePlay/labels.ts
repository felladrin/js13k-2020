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

export const populationLabel = Text({
  x: gameWidth / 2,
  y: gameHeight / 2 + 30,
  text: getPopulationText(gameStore.get().population),
  lineHeight: 1.5,
  font: `40px ${defaultFontFamily}`,
  color: Color.Gray,
  anchor: { x: 0.5, y: 0.5 },
  textAlign: "center",
});

gameStore.on("@changed", (state) => {
  if (state.population)
    populationLabel.text = getPopulationText(state.population);
});

function getDaysPassedText(daysPassed: number) {
  return `NEXT ARRIVAL\n${endGameDay - daysPassed}`;
}

export const daysPassedLabel = Text({
  x: gameWidth / 2,
  y: gameHeight / 2 - 120,
  text: getDaysPassedText(gameStore.get().daysPassed),
  lineHeight: 1.5,
  font: `40px ${defaultFontFamily}`,
  color: Color.Gray,
  anchor: { x: 0.5, y: 0.5 },
  textAlign: "center",
});

gameStore.on("@changed", (state) => {
  if (state.daysPassed)
    daysPassedLabel.text = getDaysPassedText(state.daysPassed);
});

function getConstructionSlotsText(availableConstructionSlots: number) {
  return `CONSTRUCTION SLOTS\n${availableConstructionSlots}`;
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

gameStore.on("@changed", (state) => {
  if (!isNaN(state.availableConstructionSlots))
    constructionSlotsLabel.text = getConstructionSlotsText(
      state.availableConstructionSlots
    );
});

function getFoodText() {
  const gameState = gameStore.get();
  const food = gameState.food.toLocaleString();
  const foodCreatedPerTick = gameState.foodCreatedPerTick.toLocaleString();
  const foodConsumedPerTick = gameState.foodConsumedPerTick.toLocaleString();
  return `FOOD\n${food}\n⇧${foodCreatedPerTick} ⇩${foodConsumedPerTick}`;
}

export const foodLabel = Text({
  x: gameWidth - 210,
  y: 100,
  text: getFoodText(),
  font: `38px ${defaultFontFamily}`,
  lineHeight: 1.3,
  color: Color.Gray,
  anchor: { x: 0.5, y: 0.5 },
  textAlign: "center",
});

gameStore.on("@changed", (state) => {
  if (state.food || state.foodCreatedPerTick || state.foodConsumedPerTick) {
    foodLabel.text = getFoodText();
  }
});

function getResourcesText() {
  const gameState = gameStore.get();
  const resources = gameState.resources.toLocaleString();
  const resourcesCreatedPerTick = gameState.resourcesCreatedPerTick.toLocaleString();
  const resourcesConsumedPerTick = gameState.resourcesConsumedPerTick.toLocaleString();
  return `RESOURCES\n${resources}\n⇧${resourcesCreatedPerTick} ⇩${resourcesConsumedPerTick}`;
}

export const resourcesLabel = Text({
  x: 210,
  y: 100,
  text: getResourcesText(),
  font: `38px ${defaultFontFamily}`,
  lineHeight: 1.3,
  color: Color.Gray,
  anchor: { x: 0.5, y: 0.5 },
  textAlign: "center",
});

gameStore.on("@changed", (state) => {
  if (
    state.resources ||
    state.resourcesCreatedPerTick ||
    state.resourcesConsumedPerTick
  ) {
    resourcesLabel.text = getResourcesText();
  }
});
