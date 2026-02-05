import {Shape} from './Shape.js';

export class Square extends Shape {
    constructor(
        public x: number,
        public y: number,
        public size: number,
        color: string,
    ) {
        super(color);
    }

    draw(ctx: CanvasRenderingContext2D): void {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.size, this.size);
    }

    contains(px: number, py: number): boolean {
        return (
            px >= this.x &&
            px <= this.x + this.size &&
            py >= this.y &&
            py <= this.y + this.size
        );
    }

    setPosition(px: number, py: number): void {
        this.x = px;
        this.y = py;
    }
}
