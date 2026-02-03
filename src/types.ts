export type Vec2 = { x: number; y: number };

export interface IShape {
    draw(ctx: CanvasRenderingContext2D): void;
}