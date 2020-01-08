import { Unit } from './../shared/unit';
import { ConnectionService } from '../core/connection.service';
import { Component, OnInit } from '@angular/core';
import { HubConnection } from '@aspnet/signalr';
import { Player } from '@app/shared/player';
import { IEasel, Easel } from '@app/shared/easel';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {

  private connection: HubConnection;
  private easel: IEasel;
  private player: Unit;

  constructor(private connectionService: ConnectionService) { }

  ngOnInit() {
    this.easel = Easel.getInstance();
    this.start();

    this.easel.background.context.fillStyle = 'green';
    this.easel.background.context.fillRect(0, 0, this.easel.width, this.easel.height);
  }

  private attachConnectionListeners() {
    this.connection.on('ReceiveMessage', (user, message) => {
      console.log(user, ' - ', message);
    });

    this.connection.on('RegistrationComplete', async (localPlayerGuid) => {
      console.log(`RegistrationComplete - playerGuid: ${localPlayerGuid}`);
      this.player = new Unit(8, 8, 'blue-archer.png', localPlayerGuid);
      await this.player.loadImage();
      this.easel.foreground.context.drawImage(this.player.image, this.player.location.x, this.player.location.y);
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
