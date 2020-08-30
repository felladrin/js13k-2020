import { Sprite, Vector } from "kontra";
import { Action } from "../../enums";

interface Person extends Sprite {
  currentAction?: Action;
  previousAction?: Action;
  sickOrInjured: boolean;
  speed: number;
  targetPosition?: Vector;
  timeOnTargetPosition: number;
  health: number;
}
