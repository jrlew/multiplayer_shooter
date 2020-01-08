import { Injectable } from '@angular/core';
import { HubConnection, HubConnectionBuilder, LogLevel } from '@aspnet/signalr';

import { environment } from './../../environments/environment';
import { CoreModule } from './core.module';

@Injectable({
  providedIn: CoreModule
})
export class ConnectionService {

  private connection: HubConnection;
  private isConnected = false;

  constructor() {
    this.connection = new HubConnectionBuilder()
      .withUrl(environment.gameHubUrl)
      .configureLogging(LogLevel.Information)
      .build();
  }

  public async getConnection(): Promise<HubConnection> {
    if (!this.isConnected) {
      await this.startConnection();
      this.isConnected = true;
    }
    return this.connection;
  }

  private async startConnection() {
    try {
      await this.connection.start();
    } catch (error) {
      console.log(error);
    }
    console.log('connected');
  }

  // Connection Listeners


}
