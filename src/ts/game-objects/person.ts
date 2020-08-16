import { Person } from "../classes/Person";
import { idleText } from "./idleText";
import { workingText } from "./workingText";

export const person = new Person({
  x: idleText.x,
  y: idleText.y,
  color: "red",
  width: 20,
  height: 20,
  speed: 3,
  targetGameObject: workingText,
});
