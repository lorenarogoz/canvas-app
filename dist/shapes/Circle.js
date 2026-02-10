import { Shape } from './Shape.js';
export class Circle extends Shape {
    constructor(cx, cy, size, color) {
        super(color, 'circle');
        this.cx = cx;
        this.cy = cy;
        this.size = size;
    }
    getSize() {
        return this.size;
    }
    getPosition() {
        return { x: this.cx, y: this.cy };
    }
    draw(ctx) {
        const r = this.size / 2;
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.cx, this.cy, r, 0, Math.PI * 2);
        ctx.fill();
    }
    contains(x, y) {
        const dx = x - this.cx;
        const dy = y - this.cy;
        const r = this.size / 2;
        return dx * dx + dy * dy <= r * r;
    }
    setPosition(x, y) {
        this.cx = x;
        this.cy = y;
    }
}
//# sourceMappingURL=Circle.js.map