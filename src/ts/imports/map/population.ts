import { Pool, Sprite, randInt, clamp, Vector } from "kontra";
import { Action } from "../../enums";
import { getActionAreaLabel } from "./actionAreas";
import { gameStore, GameStoreAction } from "../../gameStore";
import { Person } from "./declarations";
import { tickStore } from "../../tickStore";
import {
  minHealthConsumedPerTick,
  maxHealthConsumedPerTick,
  minHealthRestoredPerTick,
  maxHealthRestoredPerTick,
} from "./constants";

export const population = Pool({
  // eslint-disable-next-line
  // @ts-ignore
  create: Sprite,
  maxSize: gameStore.get().population,
  fill: true,
});

function fillPopulation(): void {
  population.get({
    x: getActionAreaLabel(Action.Resting).position.x + randInt(-40, 40),
    y: getActionAreaLabel(Action.Resting).position.y + randInt(-40, 40),
    color: "darkRed",
    width: 4,
    height: 4,
    sickOrInjured: false,
    speed: 3,
    timeOnTargetPosition: 0,
    health: 100,
    currentAction: randInt(0, 100) < 80 ? Action.Farming : Action.Scavenging,
    update: function (this: Person, deltaTime: number) {
      this.health = clamp(0, 100, this.health);
      this.color = percentageFromRedToGreenColor(this.health);

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
  moveEveryoneToFarmsIfNeeded();
  moveEveryoneToCollectResourcesIfNeeded();
  processHealth();
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

  (population.getAliveObjects() as Person[]).forEach((person) => {
    if (person.currentAction) newStats[person.currentAction]++;
  });

  const newStatsHash = JSON.stringify(newStats);

  if (newStatsHash != oldStatsHash) {
    gameStore.dispatch(GameStoreAction.UpdatePopulationStats, newStats);
  }

  oldStatsHash = newStatsHash;
}

function processHealth() {
  (population.getAliveObjects() as Person[]).forEach((person) => {
    if (person.currentAction == Action.Resting) {
      if (person.health >= randInt(80, 100)) {
        person.currentAction = person.previousAction;
        person.previousAction = Action.Resting;
      } else {
        person.health += randInt(
          minHealthRestoredPerTick,
          maxHealthRestoredPerTick
        );
      }
    } else {
      if (person.health > randInt(0, 5)) {
        person.health -= randInt(
          minHealthConsumedPerTick,
          maxHealthConsumedPerTick
        );
      } else {
        person.previousAction = person.currentAction;
        person.currentAction = Action.Resting;
      }
    }
  });
}

/**
 * Javascript color scale from 0% to 100%, rendering it from red to yellow to green.
 * @see https://gist.github.com/mlocati/7210513
 */
function percentageFromRedToGreenColor(percentage: number) {
  let red: number;
  let green: number;
  const blue = 0;

  if (percentage < 50) {
    red = 255;
    green = Math.round(5.1 * percentage);
  } else {
    green = 255;
    red = Math.round(510 - 5.1 * percentage);
  }

  const hex = red * 0x10000 + green * 0x100 + blue * 0x1;
  return `#${("000000" + hex.toString(16)).slice(-6)}`;
}

function moveEveryoneToFarmsIfNeeded() {
  if (gameStore.get().food > 0) return;

  (population.getAliveObjects() as Person[]).forEach((person) => {
    person.currentAction = Action.Farming;
  });
}

function moveEveryoneToCollectResourcesIfNeeded() {
  if (gameStore.get().resources > 0) return;

  (population.getAliveObjects() as Person[]).forEach((person) => {
    person.currentAction = Action.Scavenging;
  });
}
