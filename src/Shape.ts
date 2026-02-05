import type {Vec2, IShape} from './types.js';

export abstract class Shape implements IShape {
    color: string;
    public isDragging?: boolean;

    constructor(color: string) {
        this.color = color;
    }

    abstract draw(ctx: CanvasRenderingContext2D): void;
    abstract contains(x: number, y: number): boolean;
    abstract setPosition(x: number, y: number): void;
}
