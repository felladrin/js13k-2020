import { Pool, Sprite, randInt, Vector } from "kontra";
import { Action } from "../../enums";
import {
  gameLoopCallbacksStore,
  GameLoopCallbacksStoreAction,
} from "../../stores/gameLoopCallbacksStore";
import { getActionAreaLabel } from "./actionAreaLabels";

export const population = Pool({
  // eslint-disable-next-line
  // @ts-ignore
  create: Sprite,
  maxSize: 404,
  fill: true,
});

function fillPopulation(): void {
  population.get({
    x: getActionAreaLabel(Action.Constructing).position.x + randInt(-100, 100),
    y: getActionAreaLabel(Action.Constructing).position.y + randInt(-100, 100),
    color: "lightGreen",
    width: 4,
    height: 4,
    sickOrInjured: false,
    speed: 3,
    targetPosition: new Vector(
      getActionAreaLabel(Action.Researching).position.x + randInt(-100, 100),
      getActionAreaLabel(Action.Researching).position.y + randInt(-100, 100)
    ),
    update: function (this: Person) {
      if (
        this.targetPosition &&
        this.speed &&
        this.position.distance(this.targetPosition) > this.speed
      ) {
        const direction = this.targetPosition
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
  targetPosition?: Vector;
}

gameLoopCallbacksStore.dispatch(
  GameLoopCallbacksStoreAction.AddUpdateCallback,
  () => {
    fillPopulation();
    population.update();
  }
);

gameLoopCallbacksStore.dispatch(
  GameLoopCallbacksStoreAction.AddRenderCallback,
  () => {
    population.render();
  }
);
