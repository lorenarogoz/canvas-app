import { Shape } from './Shape.js';

export class Circle extends Shape {
  
  constructor(public cx: number, public cy: number, public size: number, color: string) {
    super(color);
  }

  draw(ctx: CanvasRenderingContext2D): void {
    const r = this.size / 2;
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.cx, this.cy, r, 0, Math.PI * 2);
    ctx.fill();
  }
}