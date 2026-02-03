import { Shape } from './Shape.js';

export class Square extends Shape {

  constructor(public x: number, public y: number, public size: number, color: string) {
    super(color);
  }

  draw(ctx: CanvasRenderingContext2D): void {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.size, this.size);
  }
}
