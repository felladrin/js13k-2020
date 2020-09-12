import { Text, Vector, Sprite, Button, clamp } from "kontra";
import { Action, Color } from "../../enums";
import { getKeysFromEnum } from "../../functions";
import {
  actionToSVGPathMap,
  gameHeight,
  defaultFontFamily,
  gameWidth,
  actionsImprovedByConstruction,
  actionsImprovedByResearch,
} from "../../constants";
import { gameStore } from "../../gameStore";
import {
  researchProgressBar,
  constructionProgressBar,
  explorationProgressBar,
} from "./progressBars";
import { actionAreaRadius } from "./constants";

const actionAreas: Sprite[] = [];
const actionsAmount = Object.keys(Action).length;
const centralPosition = Vector(gameWidth / 2, gameHeight / 2);
const radius = 350;

for (const key of getKeysFromEnum(Action)) {
  const currentActionIndex = actionAreas.length;
  const fractionOfTheCircle = currentActionIndex / actionsAmount;
  const angle = fractionOfTheCircle * Math.PI * 2;
  const x = Math.sin(angle) * radius;
  const y = Math.cos(angle) * radius;
  const positionInTheCircle = Vector(x, y).add(centralPosition);

  const iconInfo = actionToSVGPathMap[Action[key]];

  const icon = Sprite({
    y: 15,
    width: iconInfo.originalWidth,
    height: iconInfo.originalHeight,
    scaleX: iconInfo.desiredWidth / iconInfo.originalWidth,
    scaleY: iconInfo.desiredHeight / iconInfo.originalHeight,
    anchor: { x: 0.5, y: 0.5 },
    color: Color.Gray,
    render: () => {
      icon.context.fillStyle = icon.color;
      icon.context.beginPath();
      const path = new Path2D(iconInfo.path);
      icon.context.fill(path);
    },
  });

  const peopleActingLabel = Text({
    y: -105,
    text: "0",
    font: `30px ${defaultFontFamily}`,
    color: Color.Gray,
    anchor: { x: 0.5, y: 0.5 },
    textAlign: "center",
    update: () => {
      const actionNameInLowerCase = Action[key].toLocaleLowerCase() as
        | "resting"
        | "exploring"
        | "researching"
        | "farming"
        | "scavenging"
        | "constructing";
      peopleActingLabel.text = gameStore
        .get()
        [actionNameInLowerCase].toString();
    },
  });

  const actionNameLabel = Text({
    y: -70,
    text: Action[key],
    font: `30px ${defaultFontFamily}`,
    color: Color.Gray,
    anchor: { x: 0.5, y: 0.5 },
    textAlign: "center",
  });

  const constructionsAndImprovementsLabel = Text({
    y: 85,
    text: Action[key],
    font: `20px ${defaultFontFamily}`,
    color: Color.Gray,
    anchor: { x: 0.5, y: 0.5 },
    textAlign: "center",
    update: () => {
      if (actionsImprovedByConstruction.includes(Action[key])) {
        constructionsAndImprovementsLabel.text = "Constructions: ";
      } else if (actionsImprovedByResearch.includes(Action[key])) {
        constructionsAndImprovementsLabel.text = "Improvements: ";
      }

      const gameState = gameStore.get();

      switch (Action[key]) {
        case Action.Constructing:
          constructionsAndImprovementsLabel.text +=
            gameState.constructingImprovements;
          break;
        case Action.Exploring:
          constructionsAndImprovementsLabel.text +=
            gameState.exploringImprovements;
          break;
        case Action.Farming:
          constructionsAndImprovementsLabel.text +=
            gameState.farmingConstructions;
          break;
        case Action.Researching:
          constructionsAndImprovementsLabel.text +=
            gameState.researchingConstructions;
          break;
        case Action.Resting:
          constructionsAndImprovementsLabel.text +=
            gameState.restingConstructions;
          break;
        case Action.Scavenging:
          constructionsAndImprovementsLabel.text +=
            gameState.scavengingImprovements;
          break;
      }
    },
  });

  const boostActionButton = Button({
    width: actionAreaRadius * 2,
    height: actionAreaRadius * 2,
    anchor: { x: 0.5, y: 0.5 },
    action: Action[key],
    onDown: () => {
      gameStore.dispatch("update", { actionToBoost: boostActionButton.action });
    },
    onUp: () => {
      gameStore.dispatch("update", { actionToBoost: null });
    },
    update: () => {
      const { hoveredButton } = gameStore.get();

      if (!boostActionButton.hovered && hoveredButton == boostActionButton) {
        gameStore.dispatch("update", { hoveredButton: null });
      } else if (
        boostActionButton.hovered &&
        hoveredButton != boostActionButton
      ) {
        gameStore.dispatch("update", { hoveredButton: boostActionButton });
      }
    },
  });

  if (Action[key] == Action.Resting) {
    boostActionButton.disable();
  }

  const circleShadow = Sprite({
    color: Color.DarkerGray,
    radius: actionAreaRadius,
    anchor: { x: 0.5, y: 0.5 },
    opacity: 0,
    action: Action[key],
    update: () => {
      if (circleShadow.opacity == 0) {
        if (gameStore.get().actionToBoost == circleShadow.action) {
          circleShadow.opacity = 1;
          circleShadow.radius = actionAreaRadius;
        } else {
          return;
        }
      }

      circleShadow.opacity = clamp(0, 1, circleShadow.opacity - 1 / 60);
      circleShadow.radius += 0.8;
    },
    render: () => {
      circleShadow.context.fillStyle = circleShadow.color;
      circleShadow.context.beginPath();
      circleShadow.context.arc(0, 0, circleShadow.radius, 0, 2 * Math.PI);
      circleShadow.context.fill();
    },
  });

  const circle = Sprite({
    x: positionInTheCircle.x,
    y: positionInTheCircle.y,
    color: Color.DarkerGray,
    radius: actionAreaRadius,
    anchor: { x: 0.5, y: 0.5 },
    action: Action[key],
    render: () => {
      circle.context.fillStyle = circle.color;
      circle.context.beginPath();
      circle.context.arc(0, 0, circle.radius, 0, 2 * Math.PI);
      circle.context.fill();
    },
    children: [
      circleShadow,
      peopleActingLabel,
      actionNameLabel,
      icon,
      boostActionButton,
      constructionsAndImprovementsLabel,
    ],
  });

  if (Action[key] == Action.Researching) {
    circle.addChild(researchProgressBar);
    researchProgressBar.width = 120;
    researchProgressBar.x -= researchProgressBar.width / 2;
    researchProgressBar.y += 110;
  } else if (Action[key] == Action.Constructing) {
    circle.addChild(constructionProgressBar);
    constructionProgressBar.width = 120;
    constructionProgressBar.x -= constructionProgressBar.width / 2;
    constructionProgressBar.y += 110;
  } else if (Action[key] == Action.Exploring) {
    circle.addChild(explorationProgressBar);
    explorationProgressBar.width = 120;
    explorationProgressBar.x -= explorationProgressBar.width / 2;
    explorationProgressBar.y += 110;
  }

  actionAreas.push(circle);
}

export function getActionAreaLabel(action: Action): Sprite {
  return actionAreas.find((area) => area.action === action) as NonNullable<
    Sprite
  >;
}

export function getAllActionAreaLabels(): Sprite[] {
  return Object.values(actionAreas);
}
