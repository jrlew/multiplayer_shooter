import { Projectile } from './projectile';
import { Player } from './player';

export class GameState {
  public players: Player[];
  public projectiles: Projectile[];

  constructor() { }
}
