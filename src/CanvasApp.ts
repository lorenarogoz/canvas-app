import {getRequiredEl, getCanvas2DContext} from './utils/dom.js';
import {syncCanvasSizeFromCSS} from './/utils/sync.js';
import {
    renderWindowState,
    scheduleWindowStateUpdate,
} from './utils/windowState.js';
import {render} from './render.js';
import {ShapesStore} from './state/ShapesStore.js';
import {InputController} from './input/InputController.js';

export class CanvasApp {
    private canvas: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D;
    private form: HTMLFormElement;
    private statePanel: HTMLElement;

    private store: ShapesStore;
    private input!: InputController;

    constructor(store?: ShapesStore) {
        this.canvas = getRequiredEl<HTMLCanvasElement>('#canvas');
        this.ctx = getCanvas2DContext(this.canvas);
        this.form = getRequiredEl<HTMLFormElement>('#shapeForm');
        this.statePanel = getRequiredEl<HTMLElement>('#window-state-panel');

        this.store = store ?? new ShapesStore();
    }

    init() {
        syncCanvasSizeFromCSS(this.canvas);
        this.rerender();

        renderWindowState(this.statePanel);
        this.setupWindowEvents();

        this.input = new InputController(this.canvas, this.store, () =>
            this.rerender(),
        );
        this.input.attach();

        this.setupFormSubmit();
    }

    private rerender() {
        render(this.ctx, this.canvas, this.store.all);
    }

    private setupWindowEvents() {
        window.addEventListener('resize', () => {
            syncCanvasSizeFromCSS(this.canvas);
            this.rerender();
            scheduleWindowStateUpdate(this.statePanel);
        });

        window.addEventListener(
            'scroll',
            () => scheduleWindowStateUpdate(this.statePanel),
            {
                passive: true,
            },
        );

        document.addEventListener('visibilitychange', () =>
            scheduleWindowStateUpdate(this.statePanel),
        );
    }

    private setupFormSubmit() {
        this.form.addEventListener('submit', (ev: SubmitEvent) => {
            ev.preventDefault();
            const btn = ev.submitter as
                | HTMLButtonElement
                | HTMLInputElement
                | null;
            const shape = btn?.value;

            const sizeInput =
                this.form.querySelector<HTMLInputElement>('#shapeSize');
            const colorInput =
                this.form.querySelector<HTMLInputElement>('#shapeColor');

            let size = Number(sizeInput?.value ?? 80);
            if (!Number.isFinite(size) || size <= 0) size = 80;
            size = Math.max(10, Math.min(300, size));

            const defaultColor = shape === 'circle' ? '#f97316' : '#60a5fa';
            const color = colorInput?.value || defaultColor;

            if (shape === 'square') {
                this.store.addRandomSquare(this.canvas, {size, color});
            } else if (shape === 'circle') {
                this.store.addRandomCircle(this.canvas, {size, color});
            } else {
                return;
            }

            this.rerender();
        });
    }
}
