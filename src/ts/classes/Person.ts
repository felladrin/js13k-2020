import { Sprite, GameObject } from "kontra";

export interface Person {
  speed?: number;
  targetGameObject?: GameObject;
}

export class Person extends Sprite.class {
  constructor(properties?: Partial<Person>) {
    super(properties);
  }

  update(): void {
    if (
      this.targetGameObject &&
      this.speed &&
      this.position.distance(this.targetGameObject.position) > this.speed
    ) {
      const direction = this.targetGameObject.position
        .subtract(this.position)
        .normalize();
      this.velocity = direction.scale(this.speed);
      this.advance();
    }
  }
}
