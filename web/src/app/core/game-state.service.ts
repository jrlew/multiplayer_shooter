import { Player } from '@app/shared/player';
import { ConnectionService } from '@app/core/connection.service';
import { GameState } from '@app/shared/game-state';
import { HubConnection } from '@aspnet/signalr';
import { CoreModule } from '@app/core/core.module';
import { Injectable } from '@angular/core';
import { Projectile } from '@app/shared/projectile';

@Injectable({
  providedIn: CoreModule
})
export class GameStateService {

  private connection: HubConnection;
  private gameState: GameState;

  constructor(private connectionServer: ConnectionService) { }

  public getPlayer(playerId: string): Player {
    return this.gameState.players.find( player => player.id === playerId );
  }

  public getProjectile(projectileId: string): Projectile {
    return this.gameState.projectiles.find( projectile => projectile.id === projectileId );
  }
}
