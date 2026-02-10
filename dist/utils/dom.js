export function getRequiredEl(selector) {
    const el = document.querySelector(selector);
    if (!el)
        throw new Error(`Element not found: ${selector}`);
    return el;
}
export function getCanvas2DContext(canvas) {
    const ctx = canvas.getContext('2d');
    if (!ctx)
        throw new Error('2D context not available for canvas');
    return ctx;
}
//# sourceMappingURL=dom.js.map