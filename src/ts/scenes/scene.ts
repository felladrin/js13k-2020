import { Scene } from "kontra";
import { idleText } from "../game-objects/idleText";
import { workingText } from "../game-objects/workingText";
import { person } from "../game-objects/person";

export const scene = Scene({
  id: "game",
  children: [person, idleText, workingText],
});
