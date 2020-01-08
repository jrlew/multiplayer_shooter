import { height, width } from './constants';

export class Layer implements ILayer {
    public canvas: HTMLCanvasElement;
    public context: CanvasRenderingContext2D;

    constructor(canvasId: string) {
        this.canvas = document.querySelector(`#${canvasId}`);
        this.canvas.height = height;
        this.canvas.width = width;
        this.context = this.canvas.getContext('2d');
    }

    public clear() {
        this.context.clearRect(0, 0, width, height);
    }
}

export interface ILayer {
    canvas: HTMLCanvasElement;
    context: CanvasRenderingContext2D;
    clear(): void;
}
