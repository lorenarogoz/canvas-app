import type {Vec2, IShape} from './types.js';

export abstract class Shape implements IShape {
    constructor(
        public color: string,
        public kind: 'circle' | 'square',
    ) {}

    abstract getSize(): number;
    abstract getPosition(): Vec2;
    abstract draw(ctx: CanvasRenderingContext2D): void;
    abstract contains(x: number, y: number): boolean;
    abstract setPosition(x: number, y: number): void;

    isDragging?: boolean;
}
