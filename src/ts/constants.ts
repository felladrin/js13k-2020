import { Action } from "./enums";

export const gameWidth = 1024;

export const gameHeight = 1024;

export const initialPopulation = 404;

export const secondsPerGameTick = 0.333;

export const gameTicksPerGameDay = 6;

export const actionToConstructionAllowedMap: { [key in Action]: boolean } = {
  Constructing: false,
  Exploring: false,
  Farming: true,
  Researching: true,
  Resting: true,
  Scavenging: false,
};

export const actionToResearchAllowedMap: { [key in Action]: boolean } = {
  Constructing: true,
  Exploring: true,
  Farming: false,
  Researching: false,
  Resting: false,
  Scavenging: true,
};

export const actionToIncreaseMap: { [key in Action]: number } = {
  Constructing: 0,
  Exploring: 0,
  Farming: 1,
  Researching: 0,
  Resting: 0,
  Scavenging: 0,
};

export const actionToFoodConsumptionMap: { [key in Action]: number } = {
  Constructing: 1,
  Exploring: 2,
  Farming: 0,
  Researching: 1,
  Resting: 1,
  Scavenging: 1,
};

export const actionToResourcesConsumptionMap: { [key in Action]: number } = {
  Constructing: 2,
  Exploring: 1,
  Farming: 1,
  Researching: 1,
  Resting: 1,
  Scavenging: 0,
};

export const actionToSVGPathMap: { [key in Action]: string } = {
  Constructing:
    "M172 41c-39 0-78 6-114 15 10 15 27 27 47 35 23 9 50 13 71 12 20-1 47-10 68-21 11-6 20-12 26-18l7-10c-31-9-64-13-97-13a438 438 0 00-8 0zm112 34l-1 1c-8 8-18 15-30 22-23 13-52 22-77 23-23 1-52-3-78-14-18-7-35-17-48-31-16 131-31 277-10 397 20 6 41 11 63 14v-64h64v-64h110v-10l7-39c5-26 13-56 22-82-5-49-12-101-22-153zm153 0l-3 1-57 71c8 2 14 7 19 14l56-66c1-2 1-8-2-12a16 16 0 00-13-8zm-70 88a32 32 0 00-4 7c-4 8-5 17-4 25l4 24a201 201 0 00-6 1c-11 1-23 4-32 6a758 758 0 00-30 125v6l8-4 37-28c25-21 53-47 72-66a98 98 0 00-31-40l-4-26c0-5 0-11 2-15 1-3 2-4 4-5-4-6-10-9-16-10zm10 150v46h110v-46H377zm-192 64v46h110v-46H185zm128 0v46h110v-46H313zm128 0v46h46v-46h-46zm-320 64v46h110v-46H121zm128 0v46h110v-46H249zm128 0v46h110v-46H377z",
  Exploring:
    "M146 18l-22 3 51 405 24-1-31-238c25-8 51-16 73-36 15 90-2 182-2 273h38c-1-7-8-102 24-131 18-17 75-6 75-6 14 22 14 37 9 63l32 8c2-15 1-52-7-97-2-3-11-5-18-8-1-31 6-60 0-91-15-11-46-21-71-34l-6-1c-7 8-16 13-27 13-15-3-26-10-33-21l-13-2c-24 18-50 31-78 42zm142 19c-6 0-12 4-17 11-5 8-9 19-9 31 0 13 4 24 9 32 5 7 11 11 17 11s13-4 18-11c5-8 9-19 9-32 0-12-4-23-9-31-5-7-12-11-18-11zM110 54l-3 9c-3 9-8 18-13 25-5 8-12 14-22 15-13 2-21 6-26 12-4 5-7 14-9 25-2 18-1 39 2 61l5-12c4-9 9-17 17-23s18-9 29-9c8 0 14-5 19-14 5-10 8-23 8-32zm214 107c14 8 27 15 45 16 6 24 1 50 0 74-22-4-43-9-45-23 3-34 3-49 0-67zm49 204c-5 22-13 42-25 63 37 3 75 6 112 16 0-20-6-41-17-61zm-128 77c-97 0-175 14-227 28v21h476v-19c-59-15-146-31-249-30z",
  Farming:
    "M98 17C80 44 68 69 66 90l23 39 29-34c1-21-5-48-20-78zm375 3c-29 16-50 34-61 51l4 46 41-18c9-19 16-46 16-79zm-92 27c-10 21-17 41-20 58l18 58 20-34-7-63-11-19zM27 81c0 23 3 44 7 61l42 44 3-39-33-54-19-12zm133 10l-24 11-39 46-3 40 51-39c6-16 12-36 15-58zm177 22c-24 58-16 98 8 108l21-36-19-62-10-10zm146 0h-13l-55 25-20 34 62-13c13-12 27-27 39-45l-13-1zm-226 9c-23 23-39 46-45 66l16 42 34-27c5-21 4-49-5-81zM16 159c4 63 28 95 54 95l4-43-45-47-13-5zm144 11l-19 5-49 38-3 42c26 7 57-21 71-85zm16 2c-5 23-6 44-5 61l33 51 10-38-22-58-16-16zm267 9l-60 13-21 36c20 19 60 6 100-45l-19-4zm-139 25l-25 7-47 38-10 38 57-29c9-14 18-32 25-54zm156 26c-26 20-45 41-53 59l11 45 37-24c7-20 9-48 5-80zm-124 8c-34 78-59 159-63 253h19c3-91 28-169 61-245l-17-8zm-185 7c-8 62 10 99 36 103l10-41-34-54-12-8zm222 25c-7 22-11 42-12 60l26 55 15-37-15-61-14-17zm-303 1c-9 75-8 148 12 220h20c-21-71-22-143-13-218l-19-2zm220 11l-19 1-55 29-11 40c24 12 60-10 85-70zm206 37l-25 4-52 32-14 37 59-23c12-13 22-30 32-50zm-157 22c-16 61-2 99 23 106l16-39-28-58-11-9zm-156 26c-12 41-22 82-27 124h19c5-40 14-79 26-119l-18-5zm270 26l-58 22-15 39c23 15 60-3 92-59l-19-2zm-96 74c-2 8-4 16-4 24h19c0-7 1-13 3-20l-18-4z",
  Researching:
    "M368 25l-42 38 50 39 26-50-34-27zm-63 42l-39 49 71 56 39-49-71-56zm-50 64l-59 74 119 89 6 6c2 3 1 7 1 7v128h-25v-24H89v24H62v60h371V338a66 66 0 01-63-117l-115-90zm-70 89l-68 87 113 2 27-35-72-54zm218 11a47 47 0 00-47 48 47 47 0 0047 47 47 47 0 0047-47 47 47 0 00-47-48zm0 18a30 30 0 0130 30 30 30 0 01-30 29 30 30 0 01-30-29 30 30 0 0130-30z",
  Resting:
    "M247 28v80h18V28zm35 0v64l80-32zm-26 96A669 669 0 0164 252c0 64-16 208-32 240h160c16-16 64-144 64-192 0 48 48 176 64 192h160c-16-32-32-176-32-240-48-16-144-80-192-128zM112 300h80v80h-80z",
  Scavenging:
    "M117 18l-94 96c16 19 43 36 66 40 15 3 30 2 43-4l87 88 22-23-87-87c6-13 8-28 4-43-8-31-21-48-41-67zm126 9c-10 0-19 1-28 3a827 827 0 01274 274c2-60-22-121-60-170-15 6-33 1-46-12a45 45 0 01-12-47c-40-29-85-48-128-48zM128 60c6 10 10 19 12 29 3 16 0 30-9 38-9 9-22 12-39 9-9-2-18-6-28-11zm264 16c-7 7-7 22 4 33 11 10 25 11 33 4 7-7 7-22-5-33-8-8-23-13-32-4zm-56 71L22 461c5 11 11 20 25 25l313-314c-7-9-15-17-24-25zm-44 119l-23 23 98 103c-16 15-32 27-47 36 56 56 125 78 162 55 23-38 1-107-54-162-10 15-22 30-36 45z",
};

export const buttonImage = new Image();
buttonImage.src =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAL4AAAAxCAMAAABTTOOiAAAASFBMVEUAAAAXh7UWh7cSfKkUbZEWa5EZh7YWbJIVa5AVhrYTa5EQao4ep+EZibg1uvMWbpMlrucno9gureQYhbMXf6sWdp4xs+slntFwgIU+AAAADHRSTlMAv58/79/Pr59fX0+++ysmAAAArElEQVRo3u3ZyRHDIBQE0dG+mAHEIuWfqVXOgBvfNS+CvjeAaRwGmjMM44TXSLNG4CCflLw5KT3kgZWXN+riCtL7GJ05MXpP/vKdScpvoHzl90P5DZSv/H4ov4Hyld8P5TdQvvL7ofwGyld+P5TfQPnK74fyGyj///Izb29wbTkX/c2MYvksFlRa7b/IilBoVgmYQ800KdcwYwuGbfgEwyZgD2bteJ1LMGk5gS/Js8ccmtBzLgAAAABJRU5ErkJggg==";
buttonImage.width = 190;
buttonImage.height = 49;

export const buttonPressedImage = new Image();
buttonPressedImage.src =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAL4AAAAtCAMAAAAnWCFCAAAANlBMVEUAAAAWh7cXh7UUhrYXh7UVhrYZh7YZh7YZiLYVhbUep+EZibg1uvMqruYopNkmoNMxtO0jq+Wejsy5AAAACnRSTlMAn78/31/P769vFljH9QAAAJNJREFUaN7t2cEVwyAMBNEFbCdhJcD9N5u8dKAb8ttfwdwHQCu1Mp1aS8NPYVoFOMnpbum4T/LExWFJDV4gzfzu6dxuRv7ze0rKD1C+8veh/ADlK38fyg9QvvL3ofwA5St/H8oPUL7y96H8AOUrfx/KD1D+8/JfXOY9IbfFA4XTkpp8ozHpGV2DbNmvOvA5mNJxAl8KHVeSsFKP5gAAAABJRU5ErkJggg==";
buttonPressedImage.width = 190;
buttonPressedImage.height = 49;
