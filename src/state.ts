import type {IShape} from './types.js';
import {Square} from './Square.js';
import {Circle} from './Circle.js';

export const shapes: IShape[] = [];

export function addRandomSquare(
    canvas: HTMLCanvasElement,
    options?: {size?: number; color?: string},
) {
    const size = options?.size ?? 80;
    const color = options?.color ?? '#60a5fa';

    const maxX = Math.max(0, canvas.width - size);
    const maxY = Math.max(0, canvas.height - size);

    const x = Math.floor(Math.random() * (maxX + 1));
    const y = Math.floor(Math.random() * (maxY + 1));

    shapes.push(new Square(x, y, size, color));
}

export function addRandomCircle(
    canvas: HTMLCanvasElement,
    options?: {size?: number; color?: string},
) {
    const size = options?.size ?? 80;
    const color = options?.color ?? '#f97316';

    const r = size / 2;

    const minX = r;
    const maxX = Math.max(r, canvas.width - r);

    const minY = r;
    const maxY = Math.max(r, canvas.height - r);

    const cx = Math.floor(Math.random() * (maxX - minX + 1)) + minX;
    const cy = Math.floor(Math.random() * (maxY - minY + 1)) + minY;

    shapes.push(new Circle(cx, cy, size, color));
}
