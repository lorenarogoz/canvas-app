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
}
//# sourceMappingURL=Square.js.map