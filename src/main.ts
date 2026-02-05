import {syncCanvasSizeFromCSS} from './sync.js';
import {render} from './render.js';
import {shapes, addRandomSquare, addRandomCircle} from './state.js';
import type {IShape} from './types.js';

document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('canvas') as HTMLCanvasElement;
    const ctx = canvas.getContext('2d')!;
    const form = document.getElementById('shapeForm') as HTMLFormElement;

    syncCanvasSizeFromCSS(canvas);

    const rerender = () => render(ctx, canvas, shapes);
    rerender();

    let dragging = false;
    let selected: IShape | null = null;
    let dragOffset: {dx: number; dy: number} | null = null;

    function getCanvasPoint(evt: PointerEvent): {x: number; y: number} {
        const rect = canvas.getBoundingClientRect();
        const x = (evt.clientX - rect.left) * (canvas.width / rect.width);
        const y = (evt.clientY - rect.top) * (canvas.height / rect.height);
        return {x, y};
    }

    function bringToFront(shape: IShape) {
        const idx = shapes.indexOf(shape);
        if (idx >= 0) {
            shapes.splice(idx, 1);
            shapes.push(shape);
        }
    }

    function clamp(v: number, min: number, max: number) {
        return Math.max(min, Math.min(max, v));
    }

    canvas.addEventListener('pointermove', (evt) => {
        if (dragging) return;
        const {x, y} = getCanvasPoint(evt);
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
        const {x, y} = getCanvasPoint(evt);

        for (let i = shapes.length - 1; i >= 0; i--) {
            const s = shapes[i];
            if (s.contains(x, y)) {
                selected = s;
                dragging = true;
                s.isDragging = true;
                canvas.setPointerCapture(evt.pointerId);
                canvas.style.cursor = 'grabbing';

                if ('cx' in (s as any) && 'cy' in (s as any)) {
                    dragOffset = {dx: x - (s as any).cx, dy: y - (s as any).cy};
                } else if ('x' in (s as any) && 'y' in (s as any)) {
                    dragOffset = {dx: x - (s as any).x, dy: y - (s as any).y};
                } else {
                    dragOffset = {dx: 0, dy: 0};
                }

                if ('vx' in (s as any)) (s as any).vx = 0;
                if ('vy' in (s as any)) (s as any).vy = 0;

                bringToFront(s);
                rerender();
                break;
            }
        }
    });

    canvas.addEventListener('pointermove', (evt) => {
        if (!dragging || !selected || !dragOffset) return;
        const {x, y} = getCanvasPoint(evt);

        if ('cx' in (selected as any) && 'cy' in (selected as any)) {
            const r = ((selected as any).size ?? 80) / 2;
            const newCx = clamp(x - dragOffset.dx, r, canvas.width - r);
            const newCy = clamp(y - dragOffset.dy, r, canvas.height - r);
            selected.setPosition(newCx, newCy);
        } else if ('x' in (selected as any) && 'y' in (selected as any)) {
            const size = (selected as any).size ?? 80;
            const newX = clamp(x - dragOffset.dx, 0, canvas.width - size);
            const newY = clamp(y - dragOffset.dy, 0, canvas.height - size);
            selected.setPosition(newX, newY);
        } else {
            selected.setPosition(x - dragOffset.dx, y - dragOffset.dy);
        }

        rerender();
    });

    function endDrag(evt: PointerEvent) {
        if (!dragging) return;
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

    form.addEventListener('submit', (ev: SubmitEvent) => {
        ev.preventDefault();
        const btn = ev.submitter as HTMLButtonElement | HTMLInputElement | null;
        const shape = btn?.value;

        if (shape === 'square') {
            addRandomSquare(canvas, {size: 80, color: '#60a5fa'});
        } else if (shape === 'circle') {
            addRandomCircle(canvas, {size: 80, color: '#f97316'});
        } else {
            return;
        }

        rerender();
    });
});
