import { Scene } from "kontra";
import { idleText } from "../game-objects/idleText";
import { workingText } from "../game-objects/workingText";

export const scene = Scene({
  id: "game",
  children: [idleText, workingText],
});
