import "../index.scss";
import "./canvas";
import { GameLoop, Text, Scene } from "kontra";
import { Person } from "./classes/Person";

const idleText = Text({
  text: "Idle",
  font: "32px Arial",
  color: "white",
  x: 300,
  y: 100,
  anchor: { x: 0.5, y: 0.5 },
  textAlign: "center",
});

const workingText = Text({
  text: "Working",
  font: "32px Arial",
  color: "white",
  x: 800,
  y: 500,
  anchor: { x: 0.5, y: 0.5 },
  textAlign: "center",
});

const person = new Person({
  x: idleText.x,
  y: idleText.y,
  color: "red",
  width: 20,
  height: 20,
  speed: 3,
  targetGameObject: workingText,
});

const scene = Scene({
  id: "game",
  children: [person, idleText, workingText],
});

const game = GameLoop({
  update: () => {
    scene.update();
  },
  render: () => {
    scene.render();
  },
});

game.start();
