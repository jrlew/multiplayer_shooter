import { height, width } from './constants';
import { ILayer, Layer } from './layer';

export class Easel implements IEasel {
  private static instance: IEasel;
  public height: number;
  public width: number;

  public background: ILayer;
  public foreground: ILayer;
  public overlay: ILayer;

  private constructor() {
    this.height = height;
    this.width = width;

    this.background = new Layer('background');
    this.foreground = new Layer('foreground');
    this.overlay = new Layer('overlay');
  }

  public static getInstance(): IEasel {
    if (!Easel.instance) {
      Easel.instance = new Easel();
    }
    return Easel.instance;
  }
}

export interface IEasel {
  height: number;
  width: number;
  background: ILayer;
  foreground: ILayer;
  overlay: ILayer;
}
