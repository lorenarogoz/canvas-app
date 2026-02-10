import { Shape } from './Shape.js';
export class Square extends Shape {
    constructor(x, y, size, color) {
        super(color, 'square');
        this.x = x;
        this.y = y;
        this.size = size;
    }
    getSize() {
        return this.size;
    }
    getPosition() {
        return { x: this.x, y: this.y };
    }
    draw(ctx) {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.size, this.size);
    }
    contains(px, py) {
        return (px >= this.x &&
            px <= this.x + this.size &&
            py >= this.y &&
            py <= this.y + this.size);
    }
    setPosition(x, y) {
        this.x = x;
        this.y = y;
    }
}
//# sourceMappingURL=Square.js.map