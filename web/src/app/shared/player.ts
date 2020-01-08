import { Coordinates } from './coordinates';

export class Player {
  public id: string;
  public location: Coordinates;

  constructor() {
      this.id = '';
      this.location = new Coordinates();
  }
}
