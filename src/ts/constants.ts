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

export const actionToSVGPathMap: {
  [key in Action]: {
    path: string;
    originalWidth: number;
    originalHeight: number;
    desiredWidth: number;
    desiredHeight: number;
  };
} = {
  /** @see https://www.iconfinder.com/icons/2002553/building_construction_hammer_herramienta_de_mano_martillo_repair_tool_icon */
  Constructing: {
    path: "M19 3h-3v1h-1V3H9L4 4v1h5v2h2v14h2V7h2V6h1v1h3V4 3z",
    originalWidth: 24,
    originalHeight: 24,
    desiredWidth: 130,
    desiredHeight: 130,
  },
  /** @see https://www.iconfinder.com/icons/353412/flag_icon */
  Exploring: {
    path:
      "M54 13l-1-1-1 1-3 1-3 1-3 1-2-1-6-2-5-1c-4 0-7 1-11 3l-2 1-1-3a4 4 0 00-2-7 4 4 0 00-3 8l6 42a3 3 0 005-1l-2-17c4-2 7-3 11-3l3 1 3 1 3 1 4 1a22 22 0 0010-4l1-1V14l-1-1z",
    originalWidth: 64,
    originalHeight: 64,
    desiredWidth: 130,
    desiredHeight: 130,
  },
  /** @see https://www.iconfinder.com/icons/3765546/carrot_root_vegetable_icon */
  Farming: {
    path:
      "M30 13c-1-3-5-4-7-2h-1l1-11h-3l-1 9-4-7-3 1 5 8-8-4-1 2 9 5h-1c-2 2-3 5-2 7l2 2 5-3 1 2-5 3 8 9 5-3 2 2-5 3 12 14 3-2-8-25-5 3-1-2 5-3-3-8",
    originalWidth: 50,
    originalHeight: 50,
    desiredWidth: 116,
    desiredHeight: 116,
  },
  /** @see https://www.iconfinder.com/icons/111098/chemistry_science_icon */
  Researching: {
    path:
      "M186 208L39 410a36 36 0 0029 58h364a36 36 0 0029-58L314 208V77h4a23 23 0 000-45H182a23 23 0 000 45h4v131zm46-131h36v137l64 91H168l64-91V77z",
    originalWidth: 500,
    originalHeight: 500,
    desiredWidth: 116,
    desiredHeight: 116,
  },
  /** @see https://www.iconfinder.com/icons/5402450/building_construction_home_house_property_real_estate_icon */
  Resting: {
    path:
      "M22 12a1 1 0 01-1 1 1 1 0 01-1-1v7a2 2 0 01-2 2h-3a1 1 0 01-1-1v-4a1 1 0 00-1-1h-2a1 1 0 00-1 1v4a1 1 0 01-1 1H6a2 2 0 01-2-2v-7a1 1 0 01-2-1l8-7a3 3 0 014 0l8 7a1 1 0 010 1z",
    originalWidth: 24,
    originalHeight: 24,
    desiredWidth: 140,
    desiredHeight: 130,
  },
  /** @see https://www.iconfinder.com/icons/3553096/building_construction_pickaxe_icon */
  Scavenging: {
    path:
      "M22 6v2l-1 1h-6l-1-1V6L0 9c0-2 9-7 16-8l1-1h2l1 1c7 1 16 6 16 8L22 6zm-5 4h3l1 1v21l-3 2-2-2V11l1-1z",
    originalWidth: 36,
    originalHeight: 34,
    desiredWidth: 116,
    desiredHeight: 110,
  },
};
