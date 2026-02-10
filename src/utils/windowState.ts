export function getWindowState() {
    return {
        scrollX: window.scrollX || window.pageXOffset || 0,
        scrollY: window.scrollY || window.pageYOffset || 0,
        innerW: window.innerWidth,
        innerH: window.innerHeight,
    };
}

export function renderWindowState(panel: HTMLElement): void {
    const s = getWindowState();

    panel.innerHTML = `
    <span>Scroll X</span><span>${Math.round(s.scrollX)}</span>
    <span>Scroll Y</span><span>${Math.round(s.scrollY)}</span>
    <span>Inner W</span><span>${s.innerW}</span>
    <span>Inner H</span><span>${s.innerH}</span>
  `;
}

let rafId = 0;

export function scheduleWindowStateUpdate(panel: HTMLElement): void {
    if (rafId) return;

    rafId = requestAnimationFrame(() => {
        renderWindowState(panel);
        rafId = 0;
    });
}
