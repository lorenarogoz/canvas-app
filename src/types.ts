export type Vec2 = {x: number; y: number};

export interface IShape {
    draw(ctx: CanvasRenderingContext2D): void;
    contains(x: number, y: number): boolean;
    setPosition(x: number, y: number): void;
    isDragging?: boolean;
}
