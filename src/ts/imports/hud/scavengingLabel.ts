import { Text } from "kontra";
import { gameStore } from "../../gameStore";

function getScavengingText() {
  return `Scavenging: ${gameStore.get().scavenging}`;
}

export const scavengingLabel = Text({
  x: 316,
  y: 111,
  text: getScavengingText(),
  font: "24px Arial",
  color: "white",
  anchor: { x: 0.5, y: 0.5 },
  textAlign: "center",
});

gameStore.on("@changed", () => {
  scavengingLabel.text = getScavengingText();
});
