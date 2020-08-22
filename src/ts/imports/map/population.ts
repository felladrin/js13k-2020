import { Pool, Sprite, randInt, Vector } from "kontra";
import { Action } from "../../enums";
import {
  gameLoopCallbacksStore,
  GameLoopCallbacksStoreAction,
} from "../../stores/gameLoopCallbacksStore";
import { getActionAreaLabel } from "./actionAreaLabels";
import { getKeysFromEnum } from "../../functions";

export const population = Pool({
  // eslint-disable-next-line
  // @ts-ignore
  create: Sprite,
  maxSize: 404,
  fill: true,
});

function fillPopulation(): void {
  population.get({
    x: getActionAreaLabel(Action.Resting).position.x,
    y: getActionAreaLabel(Action.Resting).position.y,
    color: "lightGreen",
    width: 4,
    height: 4,
    sickOrInjured: false,
    speed: 3,
    timeOnTargetPosition: 0,
    update: function (this: Person, deltaTime: number) {
      if (!this.currentAction) {
        this.currentAction =
          Action[
            getKeysFromEnum(Action)[randInt(0, getKeysFromEnum(Action).length)]
          ];
      }

      if (!this.targetPosition && this.currentAction) {
        this.targetPosition = getActionAreaLabel(
          this.currentAction
        ).position.add(Vector(randInt(-80, 80), randInt(-80, 80)));
      }

      if (
        this.targetPosition &&
        this.position.distance(this.targetPosition) > this.speed
      ) {
        const direction = this.targetPosition
          .subtract(this.position)
          .normalize();
        this.velocity = direction.scale(this.speed);
        this.advance();
      } else {
        this.timeOnTargetPosition += deltaTime;
      }

      if (this.timeOnTargetPosition > randInt(2, 3)) {
        this.timeOnTargetPosition = 0;
        this.targetPosition = undefined;
      }
    },
  } as Partial<Person>);
}

interface Person extends Sprite {
  currentAction?: Action;
  sickOrInjured: boolean;
  speed: number;
  targetPosition?: Vector;
  timeOnTargetPosition: number;
}

gameLoopCallbacksStore.dispatch(
  GameLoopCallbacksStoreAction.AddUpdateCallback,
  (deltaTime: number) => {
    fillPopulation();
    population.update(deltaTime);
  }
);

gameLoopCallbacksStore.dispatch(
  GameLoopCallbacksStoreAction.AddRenderCallback,
  () => {
    population.render();
  }
);
