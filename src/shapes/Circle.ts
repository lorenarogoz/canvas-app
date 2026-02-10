import {Shape} from './Shape.js';

export class Circle extends Shape {
    constructor(
        public cx: number,
        public cy: number,
        public size: number,
        color: string,
    ) {
        super(color, 'circle');
    }

    getSize() {
        return this.size;
    }
    getPosition() {
        return {x: this.cx, y: this.cy};
    }

    draw(ctx: CanvasRenderingContext2D): void {
        const r = this.size / 2;
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.cx, this.cy, r, 0, Math.PI * 2);
        ctx.fill();
    }

    contains(x: number, y: number): boolean {
        const dx = x - this.cx;
        const dy = y - this.cy;
        const r = this.size / 2;
        return dx * dx + dy * dy <= r * r;
    }

    setPosition(x: number, y: number) {
        this.cx = x;
        this.cy = y;
    }
}
