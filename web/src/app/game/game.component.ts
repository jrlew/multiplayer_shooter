import { KeyboardCodes } from './../shared/keyboard-codes';
import { Unit } from './../shared/unit';
import { ConnectionService } from '../core/connection.service';
import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { HubConnection } from '@aspnet/signalr';
import { Player } from '@app/shared/player';
import { IEasel, Easel } from '@app/shared/easel';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnDestroy, OnInit {

  private connection: HubConnection;
  private easel: IEasel;
  private player: Unit;

  private state;

  constructor(private connectionService: ConnectionService) { }

  ngOnInit() {
    this.easel = Easel.getInstance();
    this.start();

    this.easel.background.context.fillStyle = 'green';
    this.easel.background.context.fillRect(0, 0, this.easel.width, this.easel.height);
  }

  ngOnDestroy() {
    this.connection.invoke('Deregister', this.player.id);
    this.connection.stop();
  }

  private attachConnectionListeners() {
    this.connection.on('ReceiveMessage', (user, message) => {
      console.log(user, ' - ', message);
    });

    this.connection.on('ReceiveState', (state) => {
      console.log('State:', state);
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

  @HostListener('unload')
  onUnload() {
    this.connection.invoke('Deregister', this.player.id);
    this.connection.stop();
  }

  @HostListener('close')
  onClose() {
    this.connection.invoke('Deregister', this.player.id);
    this.connection.stop();
  }

  @HostListener('window:keydown', ['$event'])
  onKeyDown(event: KeyboardEvent) {
    console.log(event);
    switch (event.key) {
      case 'ArrowUp':
        // onArrowUp();
        this.player.moveUp();
        break;
      case 'ArrowDown':
        // onArrowDown();
        this.player.moveRight();
        break;
      case 'ArrowLeft':
        // onArrowLeft();
        this.player.moveLeft();
        break;
      case 'ArrowRight':
        // onArrowRight();
        this.player.moveRight();
        break;
    }
  }

  private async getState() {
    try {
      await this.connection.invoke('GetCurrentState');
    } catch (error) {
      console.log('RegistrationError: ', error);
    }
  }

  private async getPlayers() {
    console.log('LocalPlayer');
    console.log(this.player);
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

  private async waitForNextFrame() {
    return new Promise((res, rej) => {
      setTimeout(() => {
        res();
      }, 500);
    });
  }

  private async start() {
    this.connection = await this.connectionService.getConnection();

    this.attachConnectionListeners();
    await this.register();

    await this.updatePlayer(this.player);

    // while (true) {
    //   await this.waitForNextFrame();
    //   this.easel.foreground.clear();
    //   let framePlayers = await this.getPlayers();
    //   // framePlayers.

    // }

  }
}
