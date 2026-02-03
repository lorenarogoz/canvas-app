import type { Vec2, IShape } from './types.js';

export abstract class Shape implements IShape {
  color: string;

  constructor(color: string) {
    this.color = color;
  }

  abstract draw(ctx: CanvasRenderingContext2D): void;
}