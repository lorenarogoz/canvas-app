import { Shape } from './Shape.js';
export class Square extends Shape {
    constructor(x, y, size, color) {
        super(color);
        this.x = x;
        this.y = y;
        this.size = size;
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
    setPosition(px, py) {
        this.x = px;
        this.y = py;
    }
}
//# sourceMappingURL=Square.js.map