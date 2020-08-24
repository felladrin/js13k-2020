import { Button } from "kontra";

export const button = Button({
  x: 780,
  y: 211,
  text: {
    text: "Click To Boost",
    color: "white",
    font: "32px",
  },
  render: function (this: Button) {
    if (this.pressed) {
      this.textNode.color = "yellow";
    } else if (this.hovered) {
      this.textNode.color = "red";
      // this.context.setLineDash([8, 10]);
      // this.context.lineWidth = 3;
      // this.context.strokeStyle = "red";
      // this.context.strokeRect(0, 0, this.width, this.height);
      // canvas.style.cursor = "pointer";
    } else {
      this.textNode.color = "white";
      // canvas.style.cursor = "initial";
    }
  },
});
