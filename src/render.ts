import { IShape } from "./types";

export function render(ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement, shapes: IShape[]): void {
 
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  
  for (const s of shapes) {
  s.draw(ctx);
  }
}