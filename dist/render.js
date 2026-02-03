export function render(ctx, canvas, shapes) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (const s of shapes) {
        s.draw(ctx);
    }
}
//# sourceMappingURL=render.js.map