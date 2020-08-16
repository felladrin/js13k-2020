import { idleText } from "./idleText";
import { workingText } from "./workingText";
import { Sprite, GameObject } from "kontra";
import { Action } from "../enums";

interface Person extends Sprite {
  currentAction?: Action;
  sickOrInjured?: boolean;
  speed?: number;
  targetGameObject?: GameObject;
}

export const person: Person = Sprite({
  x: idleText.x,
  y: idleText.y,
  color: "red",
  width: 20,
  height: 20,
  update: () => {
    if (
      person.targetGameObject &&
      person.speed &&
      person.position.distance(person.targetGameObject.position) > person.speed
    ) {
      const direction = person.targetGameObject.position
        .subtract(person.position)
        .normalize();
      person.velocity = direction.scale(person.speed);
      person.advance();
    }
  },
});

person.sickOrInjured = false;
person.speed = 3;
person.targetGameObject = workingText;
