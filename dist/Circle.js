import { Shape } from './Shape.js';
export class Circle extends Shape {
    constructor(cx, cy, size, color) {
        super(color);
        this.cx = cx;
        this.cy = cy;
        this.size = size;
    }
    draw(ctx) {
        const r = this.size / 2;
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.cx, this.cy, r, 0, Math.PI * 2);
        ctx.fill();
    }
}
//# sourceMappingURL=Circle.js.map