export function getCanvasOrThrow(id = 'canvas') {
    const el = document.getElementById(id);
    if (!el) {
        throw new Error(`#${id} not found in DOM`);
    }
    return el;
}
export function getFormOrThrow(id = 'shapeForm') {
    const el = document.getElementById(id);
    if (!el) {
        throw new Error(`#${id} not found in DOM`);
    }
    return el;
}
export function syncCanvasSizeFromCSS(canvas) {
    const cssW = canvas.offsetWidth;
    const cssH = canvas.offsetHeight;
    if (canvas.width !== cssW)
        canvas.width = cssW;
    if (canvas.height !== cssH)
        canvas.height = cssH;
}
export function get2DContextOrThrow(canvas) {
    const ctx = canvas.getContext('2d');
    if (!ctx) {
        throw new Error('Cannot get 2D context');
    }
    return ctx;
}
//# sourceMappingURL=dom.js.map