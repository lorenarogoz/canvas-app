import { getRequiredEl, getCanvas2DContext } from './utils/dom.js';
import { syncCanvasSizeFromCSS } from './/utils/sync.js';
import { renderWindowState, scheduleWindowStateUpdate, } from './utils/windowState.js';
import { render } from './render.js';
import { ShapesStore } from './state/ShapesStore.js';
import { InputController } from './input/InputController.js';
export class CanvasApp {
    constructor(store) {
        this.canvas = getRequiredEl('#canvas');
        this.ctx = getCanvas2DContext(this.canvas);
        this.form = getRequiredEl('#shapeForm');
        this.statePanel = getRequiredEl('#window-state-panel');
        // store-ul poate fi injectat (util în teste), altfel creăm unul
        this.store = store ?? new ShapesStore();
    }
    init() {
        // 1) Canvas up-to-date cu CSS + render inițial
        syncCanvasSizeFromCSS(this.canvas);
        this.rerender();
        // 2) UI pentru state-ul ferestrei + listeners
        renderWindowState(this.statePanel);
        this.setupWindowEvents();
        // 3) Input pointer (drag & drop) – separat într-un controller
        this.input = new InputController(this.canvas, this.store, () => this.rerender());
        this.input.attach();
        // 4) Form (adăugare forme)
        this.setupFormSubmit();
    }
    // ————— Orchestrare —————
    rerender() {
        render(this.ctx, this.canvas, this.store.all);
    }
    setupWindowEvents() {
        window.addEventListener('resize', () => {
            syncCanvasSizeFromCSS(this.canvas);
            this.rerender();
            scheduleWindowStateUpdate(this.statePanel);
        });
        window.addEventListener('scroll', () => scheduleWindowStateUpdate(this.statePanel), {
            passive: true,
        });
        document.addEventListener('visibilitychange', () => scheduleWindowStateUpdate(this.statePanel));
    }
    setupFormSubmit() {
        this.form.addEventListener('submit', (ev) => {
            ev.preventDefault();
            const btn = ev.submitter;
            const shape = btn?.value;
            const sizeInput = this.form.querySelector('#shapeSize');
            const colorInput = this.form.querySelector('#shapeColor');
            let size = Number(sizeInput?.value ?? 80);
            if (!Number.isFinite(size) || size <= 0)
                size = 80;
            size = Math.max(10, Math.min(300, size));
            const defaultColor = shape === 'circle' ? '#f97316' : '#60a5fa';
            const color = colorInput?.value || defaultColor;
            if (shape === 'square') {
                this.store.addRandomSquare(this.canvas, { size, color });
            }
            else if (shape === 'circle') {
                this.store.addRandomCircle(this.canvas, { size, color });
            }
            else {
                return;
            }
            this.rerender();
        });
    }
}
//# sourceMappingURL=CanvasApp.js.map