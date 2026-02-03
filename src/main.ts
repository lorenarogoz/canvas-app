import {syncCanvasSizeFromCSS} from './sync.js';
import {render} from './render.js';
import {shapes, addRandomSquare, addRandomCircle} from './state.js';

document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('canvas') as HTMLCanvasElement;
    const ctx = canvas.getContext('2d')!;
    const form = document.getElementById('shapeForm') as HTMLFormElement;

    syncCanvasSizeFromCSS(canvas);
    render(ctx, canvas, shapes);

    window.addEventListener('resize', () => {
        syncCanvasSizeFromCSS(canvas);
        render(ctx, canvas, shapes);
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

        render(ctx, canvas, shapes);
    });
});
