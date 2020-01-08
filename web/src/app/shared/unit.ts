import { ICoordinates, Coordinates } from './coordinates';
import { Easel, IEasel } from './easel';
import { ImageBuilder } from './image-builder';

// TODO: Move and rename this constant
const movementSpeed = 15;
const maxMovement = 60;

export class Unit implements IUnit {
    public id: string;
    public image: HTMLImageElement;
    public imageSrc: string;
    public location: ICoordinates;

    private easel: IEasel;

    // TODO: Make this a take an arguments object
    constructor(x: number, y: number, imageSrc: string, id?: string) {
        this.location = new Coordinates(x, y);
        this.imageSrc = imageSrc;
        this.id = id;

        this.easel = Easel.getInstance();
    }

    public async loadImage() {
        this.image = await ImageBuilder.buildImage(this.imageSrc);
    }

    public moveUp() {
        this.location.y -= movementSpeed;
        this.reduceMovement();
    }

    public moveDown() {
        this.location.y += movementSpeed;
        this.reduceMovement();
    }

    public moveLeft() {
        this.location.x -= movementSpeed;
        this.reduceMovement();
    }

    public moveRight() {
        this.location.x += movementSpeed;
        this.reduceMovement();
    }

    public updateLocation(newLocation: ICoordinates) {
        this.location.x = newLocation.x;
        this.location.y = newLocation.y;

        this.easel.foreground.clear();
        this.easel.foreground.context.drawImage(this.image, this.location.x, this.location.y);
    }

    private reduceMovement() {
    }
}

export interface IUnit {
    id: string;
    image: HTMLImageElement;
    location: ICoordinates;
    loadImage(): void;
    moveUp(): void;
    moveDown(): void;
    moveLeft(): void;
    moveRight(): void;
    updateLocation(location: ICoordinates): void;
}
