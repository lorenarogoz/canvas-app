export function syncCanvasSizeFromCSS(canvas: HTMLCanvasElement): void {
    const cssW = canvas.offsetWidth;
    const cssH = canvas.offsetHeight;
    if (canvas.width !== cssW) canvas.width = cssW;
    if (canvas.height !== cssH) canvas.height = cssH;
}
