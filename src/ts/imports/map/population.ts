import { Pool, Sprite, randInt, Vector } from "kontra";
import { Action } from "../../enums";
import { getActionAreaLabel } from "./actionAreas";
import { getKeysFromEnum } from "../../functions";
import { gameStore, GameStoreAction } from "../../gameStore";
import { Person } from "./declarations";
import { tickStore } from "../../tickStore";

export const population = Pool({
  // eslint-disable-next-line
  // @ts-ignore
  create: Sprite,
  maxSize: gameStore.get().population,
  fill: true,
});

function fillPopulation(): void {
  population.get({
    x: getActionAreaLabel(Action.Resting).position.x,
    y: getActionAreaLabel(Action.Resting).position.y,
    color: "darkRed",
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

gameStore.on("@changed", () => {
  population.maxSize = gameStore.get().population;
});

tickStore.on("@changed", () => {
  boostActionIfNeeded();
  updatePopulationStats();
});

gameStore.dispatch(GameStoreAction.AddUpdateCallback, (deltaTime: number) => {
  fillPopulation();
  population.update(deltaTime);
});

gameStore.dispatch(GameStoreAction.AddRenderCallback, () => {
  population.render();
});

function boostActionIfNeeded() {
  const { actionToBoost } = gameStore.get();

  if (!actionToBoost) return;

  for (const action in Action) {
    if (action == actionToBoost) continue;

    const personFoundOnAnotherAction = (population.getAliveObjects() as Person[]).find(
      (person) => person.currentAction == action
    );

    if (personFoundOnAnotherAction) {
      personFoundOnAnotherAction.currentAction = actionToBoost;
    }
  }
}

let oldStatsHash = "";

function updatePopulationStats() {
  const newStats: {
    [key in Action]: number;
  } = {
    Farming: 0,
    Scavenging: 0,
    Researching: 0,
    Constructing: 0,
    Exploring: 0,
    Resting: 0,
  };

  population.getAliveObjects().forEach((person: Partial<Person>) => {
    if (person.currentAction) newStats[person.currentAction]++;
  });

  const newStatsHash = JSON.stringify(newStats);

  if (newStatsHash != oldStatsHash) {
    gameStore.dispatch(GameStoreAction.UpdatePopulationStats, newStats);
  }

  oldStatsHash = newStatsHash;
}
