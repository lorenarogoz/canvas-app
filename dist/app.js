"use strict";
const squares = [];
function render(ctx, canvas) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (const sq of squares) {
        ctx.fillStyle = sq.fill;
        ctx.fillRect(sq.x, sq.y, sq.size, sq.size);
    }
}
function syncCanvasSizeFromCSS(canvas) {
    const cssW = canvas.offsetWidth;
    const cssH = canvas.offsetHeight;
    if (canvas.width !== cssW)
        canvas.width = cssW;
    if (canvas.height !== cssH)
        canvas.height = cssH;
}
document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('canvas');
    if (!canvas) {
        console.error(`#canvas don't found in DOM`);
        return;
    }
    const ctx = canvas.getContext('2d');
    if (!ctx) {
        console.error(`I can't get 2d context`);
        return;
    }
    syncCanvasSizeFromCSS(canvas);
    render(ctx, canvas);
    window.addEventListener('resize', () => {
        syncCanvasSizeFromCSS(canvas);
        render(ctx, canvas);
    });
    const form = document.getElementById('shapeForm');
    if (!form) {
        console.error(`I don't find #shapeForm in DOM`);
        return;
    }
    form.addEventListener('submit', (ev) => {
        ev.preventDefault();
        const btn = ev.submitter;
        const shape = btn?.value;
        if (shape !== 'square') {
            return;
        }
        const size = 80;
        const color = '#60a5fa';
        const maxX = Math.max(0, canvas.width - size);
        const maxY = Math.max(0, canvas.height - size);
        const x = Math.floor(Math.random() * (maxX + 1));
        const y = Math.floor(Math.random() * (maxY + 1));
        squares.push({ x, y, size, fill: color });
        render(ctx, canvas);
    });
});
//# sourceMappingURL=app.js.map