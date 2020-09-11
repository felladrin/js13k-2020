import { Action } from "./enums";

export const gameWidth = 1024;

export const gameHeight = 1024;

export const initialPopulation = 404;

export const endGameDay = 365;

export const secondsPerGameTick = 0.333;

export const gameTicksPerGameDay = 3;

export const requiredFoodAndResourcesAmount = 500000;

export const defaultFontFamily = "Verdana, Geneva, sans-serif";

export const actionsImprovedByConstruction: Action[] = [
  Action.Researching,
  Action.Farming,
  Action.Resting,
];

export const actionsImprovedByResearch: Action[] = [
  Action.Constructing,
  Action.Scavenging,
  Action.Exploring,
];
