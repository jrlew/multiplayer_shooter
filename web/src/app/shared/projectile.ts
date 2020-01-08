import { Coordinates } from './coordinates';

export class Projectile {
  public id: string;
  public location: Coordinates;

  constructor() {
      this.id = '';
      this.location = new Coordinates();
  }
}
