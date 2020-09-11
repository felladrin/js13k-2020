import { Action } from "./enums";

export const gameWidth = 1024;

export const gameHeight = 1024;

export const initialPopulation = 404;

export const endGameDay = 365;

export const secondsPerGameTick = 0.333;

export const gameTicksPerGameDay = 6;

export const requiredFoodAndResourcesAmount = 1000000;

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

export const actionToSVGPathMap: { [key in Action]: string } = {
  Constructing:
    "M170 19h-3c-25 0-49 5-69 14 84 8 157 61 119 122l-6 10h1c-1 2-1 5 2 9 3 5 9 10 15 13 6 4 14 7 20 8 6 0 11 0 14-2l5-8c22-9 58 11 66 29a121 121 0 0138-74c-20 7-30-7-38-35-9-26-37-47-59-60-31-18-69-26-105-26zm239 122c-4-1-9 1-15 5-10 6-21 17-29 32-8 14-13 29-13 41-1 11 3 18 7 20s11 2 20-4c10-7 21-18 29-32s13-30 13-41c1-11-2-18-6-20l-4-1h-2zm-210 44C81 367 4 419 22 463c8 20 31 36 55 29 49-16 60-94 173-278l-3-1a74 74 0 01-48-28zm293 72l-110 22 51 16 31 149 19-4-32-149 41-34zm-200 16l-80 79 51-15 68 68-23 85 18 4 21-74 24 24 14-13-33-32 14-51 52-13-109-29 39 37-11 41-60-60 15-51z",
  Exploring:
    "M215 32v140l18-3v-43c45-8 90 32 135 2V48c-45 30-90-10-135-2V32h-18zm41 153a151 151 0 100 302 151 151 0 000-302zm-21 26l78 119-84 28-23-54-24 21-58-13 48-50 42 8 21-59zm104 6l-11 35 39-1-37 31-31-25 13-23 27-17zm33 148l-26 43-21-36 47-7zm-56 33l16 47c-35 28-87 36-116 17l38-61 30 30 32-33z",
  Farming:
    "M379 24l-28 87 29 6-3 16-53 48-51-44-24-4c9-14 15-32 17-49 10-2 35-6 46-10-5-11-30-17-49-17-2-20-9-29-34-27-25 1-33 6-30 36-19 4-38 13-40 27l41-3c1 14 4 28 10 36l-35-6-69 76 77 56 2 17-34 215h38l38-169 48 169h38l-4-16 17 16 63-322 12-11c1-11-2-19-5-25l1-5 28 6 8-93-23 69-11-3 7-72-22 69-11-2 6-71zm27 4zM183 153v64l-31-23 31-41zm88 22l51 46 45-39-58 286-43-198 5-95z",
  Researching:
    "M368 25l-42 38 50 39 26-50-34-27zm-63 42l-39 49 71 56 39-49-71-56zm-50 64l-59 74 119 89 6 6c2 3 1 7 1 7v128h-25v-24H89v24H62v60h371V338a66 66 0 01-63-117l-115-90zm-70 89l-68 87 113 2 27-35-72-54zm218 11a47 47 0 00-47 48 47 47 0 0047 47 47 47 0 0047-47 47 47 0 00-47-48zm0 18a30 30 0 0130 30 30 30 0 01-30 29 30 30 0 01-30-29 30 30 0 0130-30z",
  Resting:
    "M247 28v80h18V28zm35 0v64l80-32zm-26 96A669 669 0 0164 252c0 64-16 208-32 240h160c16-16 64-144 64-192 0 48 48 176 64 192h160c-16-32-32-176-32-240-48-16-144-80-192-128zM112 300h80v80h-80z",
  Scavenging:
    "M117 18l-94 96c16 19 43 36 66 40 15 3 30 2 43-4l87 88 22-23-87-87c6-13 8-28 4-43-8-31-21-48-41-67zm126 9c-10 0-19 1-28 3a827 827 0 01274 274c2-60-22-121-60-170-15 6-33 1-46-12a45 45 0 01-12-47c-40-29-85-48-128-48zM128 60c6 10 10 19 12 29 3 16 0 30-9 38-9 9-22 12-39 9-9-2-18-6-28-11zm264 16c-7 7-7 22 4 33 11 10 25 11 33 4 7-7 7-22-5-33-8-8-23-13-32-4zm-56 71L22 461c5 11 11 20 25 25l313-314c-7-9-15-17-24-25zm-44 119l-23 23 98 103c-16 15-32 27-47 36 56 56 125 78 162 55 23-38 1-107-54-162-10 15-22 30-36 45z",
};
