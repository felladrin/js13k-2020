import { Pool, Sprite, randInt, clamp, Vector, on } from "kontra";
import { Action, GameScene, GameEvent } from "../../enums";
import { getActionAreaLabel } from "./actionAreas";
import { gameStore } from "../../gameStore";
import {
  minHealthConsumedPerTick,
  maxHealthConsumedPerTick,
  minHealthRestoredPerTick,
  maxHealthRestoredPerTick,
} from "./constants";
import { getKeysFromEnum } from "../../functions";

let canBoost = true;

interface Person extends Sprite {
  currentAction?: Action;
  previousAction?: Action;
  sickOrInjured: boolean;
  speed: number;
  targetPosition?: Vector;
  timeOnTargetPosition: number;
  health: number;
}

export const population = Pool({
  // eslint-disable-next-line
  // @ts-ignore
  create: Sprite,
  maxSize: gameStore.get().population,
  fill: true,
});

function fillPopulation(): void {
  population.get({
    x: getActionAreaLabel(Action.Resting).position.x + randInt(-50, 50),
    y: getActionAreaLabel(Action.Resting).position.y + randInt(-50, 50),
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
        ).position.add(Vector(randInt(-95, 95), randInt(-95, 95)));
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

gameStore.on("@changed", (state) => {
  if (state.population) population.maxSize = state.population;
});

on(GameEvent.GameTick, () => {
  canBoost = true;

  if (gameStore.get().paused) return;

  moveEveryoneToFarmsIfNeeded();
  moveEveryoneToCollectResourcesIfNeeded();
  moveFromConstructingToExploringIfNeeded();
  processHealth();
  updatePopulationStats();
});

gameStore.dispatch("addUpdateCallback", (deltaTime) => {
  if (gameStore.get().paused) return;

  boostActionIfNeeded();

  if (gameStore.get().activeGameScenes.includes(GameScene.GamePlay)) {
    fillPopulation();
    population.update(deltaTime);
  }
});

gameStore.dispatch("addRenderCallback", () => {
  if (gameStore.get().activeGameScenes.includes(GameScene.GamePlay)) {
    population.render();
  }
});

function boostActionIfNeeded() {
  if (!canBoost) return;

  const { actionToBoost } = gameStore.get();

  if (!actionToBoost) return;

  canBoost = false;

  const otherActionsList: Action[] = [];

  for (const key of getKeysFromEnum(Action)) {
    if (Action[key] == actionToBoost) continue;
    otherActionsList.push(Action[key]);
  }

  let indexOnOtherActionsList = 0;

  const people = population.getAliveObjects() as Person[];

  for (
    let counter = 0, populationPercentage = Math.ceil(people.length * 0.05);
    counter < populationPercentage;
    counter++
  ) {
    const action = otherActionsList[indexOnOtherActionsList];

    const personFoundOnAnotherAction = people.find(
      (person) => person.currentAction == action
    );

    if (personFoundOnAnotherAction) {
      personFoundOnAnotherAction.currentAction = actionToBoost;
    }

    indexOnOtherActionsList++;

    if (indexOnOtherActionsList > otherActionsList.length) {
      indexOnOtherActionsList = 0;
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
    gameStore.dispatch("update", {
      farming: newStats.Farming,
      scavenging: newStats.Scavenging,
      researching: newStats.Researching,
      constructing: newStats.Constructing,
      exploring: newStats.Exploring,
      resting: newStats.Resting,
    });
  }

  oldStatsHash = newStatsHash;
}

function processHealth() {
  (population.getAliveObjects() as Person[]).forEach((person) => {
    if (person.currentAction == Action.Resting) {
      if (person.health >= randInt(90, 100)) {
        person.currentAction = person.previousAction;
        person.previousAction = Action.Resting;
      } else {
        const { restingConstructions } = gameStore.get();
        person.health += randInt(
          minHealthRestoredPerTick * restingConstructions,
          maxHealthRestoredPerTick * restingConstructions
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

function moveFromConstructingToExploringIfNeeded() {
  if (gameStore.get().availableConstructionSlots > 0) return;

  (population.getAliveObjects() as Person[]).forEach((person) => {
    if (person.currentAction == Action.Constructing) {
      person.currentAction = Action.Exploring;
    }
  });
}
