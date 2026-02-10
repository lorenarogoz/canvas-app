export function getRequiredEl<T extends Element>(selector: string): T {
    const el = document.querySelector(selector);
    if (!el) throw new Error(`Element not found: ${selector}`);
    return el as T;
}

export function getCanvas2DContext(
    canvas: HTMLCanvasElement,
): CanvasRenderingContext2D {
    const ctx = canvas.getContext('2d');
    if (!ctx) throw new Error('2D context not available for canvas');
    return ctx;
}
