import {Shape} from './Shape.js';

export class Square extends Shape {
    constructor(
        public x: number,
        public y: number,
        public size: number,
        color: string,
    ) {
        super(color, 'square');
    }

    getSize() {
        return this.size;
    }
    getPosition() {
        return {x: this.x, y: this.y};
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

    setPosition(x: number, y: number) {
        this.x = x;
        this.y = y;
    }
}
