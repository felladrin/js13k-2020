import { Pool, Sprite, GameObject, randInt } from "kontra";
import { idleText } from "./idleText";
import { workingText } from "./workingText";
import { Action } from "../enums";

export const population = Pool({
  create: Sprite,
  maxSize: 404,
  fill: true,
});

export function fillPopulation(): void {
  population.get({
    x: idleText.x + randInt(-50, 50),
    y: idleText.y + randInt(-50, 50),
    color: "red",
    width: 4,
    height: 4,
    sickOrInjured: false,
    speed: 3,
    targetGameObject: workingText,
    update: function (this: Person) {
      if (
        this.targetGameObject &&
        this.speed &&
        this.position.distance(this.targetGameObject.position) > this.speed
      ) {
        const direction = this.targetGameObject.position
          .subtract(this.position)
          .normalize();
        this.velocity = direction.scale(this.speed);
        this.advance();
      }
    },
  } as Partial<Person>);
}

interface Person extends Sprite {
  currentAction?: Action;
  sickOrInjured?: boolean;
  speed?: number;
  targetGameObject?: GameObject;
}
