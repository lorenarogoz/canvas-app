import { syncCanvasSizeFromCSS } from './sync.js';
import { render } from './render.js';
import { shapes, addRandomSquare, addRandomCircle } from './state.js';
document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    const form = document.getElementById('shapeForm');
    syncCanvasSizeFromCSS(canvas);
    const rerender = () => render(ctx, canvas, shapes);
    rerender();
    let dragging = false;
    let selected = null;
    let dragOffset = null;
    function getCanvasPoint(evt) {
        const rect = canvas.getBoundingClientRect();
        const x = (evt.clientX - rect.left) * (canvas.width / rect.width);
        const y = (evt.clientY - rect.top) * (canvas.height / rect.height);
        return { x, y };
    }
    function bringToFront(shape) {
        const idx = shapes.indexOf(shape);
        if (idx >= 0) {
            shapes.splice(idx, 1);
            shapes.push(shape);
        }
    }
    function clamp(v, min, max) {
        return Math.max(min, Math.min(max, v));
    }
    canvas.addEventListener('pointermove', (evt) => {
        if (dragging)
            return;
        const { x, y } = getCanvasPoint(evt);
        let over = false;
        for (let i = shapes.length - 1; i >= 0; i--) {
            if (shapes[i].contains(x, y)) {
                over = true;
                break;
            }
        }
        canvas.style.cursor = over ? 'grab' : 'default';
    });
    canvas.addEventListener('pointerdown', (evt) => {
        const { x, y } = getCanvasPoint(evt);
        for (let i = shapes.length - 1; i >= 0; i--) {
            const s = shapes[i];
            if (s.contains(x, y)) {
                selected = s;
                dragging = true;
                s.isDragging = true;
                canvas.setPointerCapture(evt.pointerId);
                canvas.style.cursor = 'grabbing';
                if ('cx' in s && 'cy' in s) {
                    dragOffset = { dx: x - s.cx, dy: y - s.cy };
                }
                else if ('x' in s && 'y' in s) {
                    dragOffset = { dx: x - s.x, dy: y - s.y };
                }
                else {
                    dragOffset = { dx: 0, dy: 0 };
                }
                if ('vx' in s)
                    s.vx = 0;
                if ('vy' in s)
                    s.vy = 0;
                bringToFront(s);
                rerender();
                break;
            }
        }
    });
    canvas.addEventListener('pointermove', (evt) => {
        if (!dragging || !selected || !dragOffset)
            return;
        const { x, y } = getCanvasPoint(evt);
        if ('cx' in selected && 'cy' in selected) {
            const r = (selected.size ?? 80) / 2;
            const newCx = clamp(x - dragOffset.dx, r, canvas.width - r);
            const newCy = clamp(y - dragOffset.dy, r, canvas.height - r);
            selected.setPosition(newCx, newCy);
        }
        else if ('x' in selected && 'y' in selected) {
            const size = selected.size ?? 80;
            const newX = clamp(x - dragOffset.dx, 0, canvas.width - size);
            const newY = clamp(y - dragOffset.dy, 0, canvas.height - size);
            selected.setPosition(newX, newY);
        }
        else {
            selected.setPosition(x - dragOffset.dx, y - dragOffset.dy);
        }
        rerender();
    });
    function endDrag(evt) {
        if (!dragging)
            return;
        dragging = false;
        if (selected) {
            selected.isDragging = false;
        }
        selected = null;
        dragOffset = null;
        if (canvas.hasPointerCapture(evt.pointerId)) {
            canvas.releasePointerCapture(evt.pointerId);
        }
        canvas.style.cursor = 'grab';
        rerender();
    }
    canvas.addEventListener('pointerup', endDrag);
    canvas.addEventListener('pointercancel', endDrag);
    window.addEventListener('resize', () => {
        syncCanvasSizeFromCSS(canvas);
        rerender();
    });
    form.addEventListener('submit', (ev) => {
        ev.preventDefault();
        const btn = ev.submitter;
        const shape = btn?.value;
        if (shape === 'square') {
            addRandomSquare(canvas, { size: 80, color: '#60a5fa' });
        }
        else if (shape === 'circle') {
            addRandomCircle(canvas, { size: 80, color: '#f97316' });
        }
        else {
            return;
        }
        rerender();
    });
});
//# sourceMappingURL=main.js.map