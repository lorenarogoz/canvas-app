/**
 * InputController
 * - gestionează exclusiv pointer events (hover, down, drag, end)
 * - deține starea locală de drag/selectare
 * - invocă `rerender()` via callback (inversiune de control)
 * - nu știe să deseneze; nu are `ctx`
 */
export class InputController {
    constructor(canvas, store, rerender) {
        this.canvas = canvas;
        this.store = store;
        this.rerender = rerender;
        this.dragging = false;
        this.selected = null;
        this.dragOffset = null;
        // ————— Handlere —————
        this.onPointerMoveHover = (evt) => {
            if (this.dragging)
                return;
            const { x, y } = this.getCanvasPoint(evt);
            const list = this.store.all;
            let over = false;
            for (let i = list.length - 1; i >= 0; i--) {
                if (list[i].contains(x, y)) {
                    over = true;
                    break;
                }
            }
            this.canvas.style.cursor = over ? 'grab' : 'default';
        };
        this.onPointerDown = (evt) => {
            const { x, y } = this.getCanvasPoint(evt);
            const list = this.store.all;
            for (let i = list.length - 1; i >= 0; i--) {
                const s = list[i];
                if (s.contains(x, y)) {
                    this.selected = s;
                    this.dragging = true;
                    s.isDragging = true;
                    this.canvas.setPointerCapture(evt.pointerId);
                    this.canvas.style.cursor = 'grabbing';
                    const pos = s.getPosition();
                    this.dragOffset = { dx: x - pos.x, dy: y - pos.y };
                    this.store.bringToFront(s);
                    this.rerender();
                    break;
                }
            }
        };
        this.onPointerDrag = (evt) => {
            if (!this.dragging || !this.selected || !this.dragOffset)
                return;
            const { x, y } = this.getCanvasPoint(evt);
            const size = this.selected.getSize();
            if (this.selected.kind === 'circle') {
                const r = size / 2;
                const newCx = this.clamp(x - this.dragOffset.dx, r, this.canvas.width - r);
                const newCy = this.clamp(y - this.dragOffset.dy, r, this.canvas.height - r);
                this.selected.setPosition(newCx, newCy);
            }
            else {
                const newX = this.clamp(x - this.dragOffset.dx, 0, this.canvas.width - size);
                const newY = this.clamp(y - this.dragOffset.dy, 0, this.canvas.height - size);
                this.selected.setPosition(newX, newY);
            }
            this.rerender();
        };
        this.onPointerEnd = (evt) => {
            if (!this.dragging)
                return;
            this.dragging = false;
            if (this.selected)
                this.selected.isDragging = false;
            this.selected = null;
            this.dragOffset = null;
            if (this.canvas.hasPointerCapture(evt.pointerId)) {
                this.canvas.releasePointerCapture(evt.pointerId);
            }
            this.canvas.style.cursor = 'grab';
            this.rerender();
        };
    }
    attach() {
        this.canvas.addEventListener('pointermove', this.onPointerMoveHover);
        this.canvas.addEventListener('pointerdown', this.onPointerDown);
        this.canvas.addEventListener('pointermove', this.onPointerDrag);
        this.canvas.addEventListener('pointerup', this.onPointerEnd);
        this.canvas.addEventListener('pointercancel', this.onPointerEnd);
    }
    detach() {
        this.canvas.removeEventListener('pointermove', this.onPointerMoveHover);
        this.canvas.removeEventListener('pointerdown', this.onPointerDown);
        this.canvas.removeEventListener('pointermove', this.onPointerDrag);
        this.canvas.removeEventListener('pointerup', this.onPointerEnd);
        this.canvas.removeEventListener('pointercancel', this.onPointerEnd);
    }
    // ————— Utils private (fostele funcții stand‑alone) —————
    getCanvasPoint(evt) {
        const rect = this.canvas.getBoundingClientRect();
        const x = (evt.clientX - rect.left) * (this.canvas.width / rect.width);
        const y = (evt.clientY - rect.top) * (this.canvas.height / rect.height);
        return { x, y };
    }
    clamp(v, min, max) {
        return Math.max(min, Math.min(max, v));
    }
}
//# sourceMappingURL=InputController.js.map