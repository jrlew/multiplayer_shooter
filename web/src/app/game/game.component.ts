import { ConnectionService } from '../core/connection.service';
import { Component, OnInit } from '@angular/core';
import { HubConnection } from '@aspnet/signalr';
import { Player } from '@app/shared/player';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {

  private connection: HubConnection;

  private player: Player;

  constructor(private connectionService: ConnectionService) { }

  ngOnInit() {
    this.start();
  }

  private attachConnectionListeners() {
    this.connection.on('ReceiveMessage', (user, message) => {
      console.log(user, ' - ', message);
    });

    this.connection.on('RegistrationComplete', (localPlayerGuid) => {
      // player.id = localPlayerGuid;
      console.log(`RegistrationComplete - playerGuid: ${localPlayerGuid}`);
      this.player = new Player();
      this.player.id = localPlayerGuid;
      this.player.location.x = 8;
      this.player.location.y = 9;
    });

    this.connection.on('PlayerLocation', (playerId, playerLocation) => {
      console.log(`Player: ${playerId} Location: ${playerLocation}`);
      console.log(playerLocation);
    });
  }

  private async getPlayers() {
    try {
      await this.connection.invoke('GetPlayers');
    } catch (error) {
      console.log('RegistrationError: ', error);
    }
  }

  private async register() {
    try {
      await this.connection.invoke('Register');
    } catch (error) {
      console.log('RegistrationError: ', error);
    }
  }

  private async updatePlayer(player: Player) {
    console.log(player);
    try {
      await this.connection.invoke('UpdatePlayer', player);
    } catch (error) {
      console.log('UpdatePlayerError: ', error);
    }
  }

  private async start() {
    this.connection = await this.connectionService.getConnection();

    this.attachConnectionListeners();
    await this.register();

    await this.updatePlayer(this.player);
  }
}
