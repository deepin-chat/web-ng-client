import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpTransportType, HubConnection, HubConnectionBuilder, LogLevel } from '@microsoft/signalr';
import { Subject } from 'rxjs';
import { AuthService } from './auth.service';

const CHATS_HUB_URL = `${environment.apiRoot}/hubs/chat`;
@Injectable()
export class ChatHubService {
  private messageSubject = new Subject<any>();
  public messageObservable = this.messageSubject.asObservable();
  private hubConnection?: HubConnection;
  constructor(
    private authService: AuthService,
  ) {
  }

  public start() {
    this.register();
    this.stablishConnection()
      ?.then(() => {
        this.registerHandlers();
      });
  }

  public stop() {
    this.hubConnection?.stop();
  }

  private register() {
    this.hubConnection = new HubConnectionBuilder()
      .withUrl(CHATS_HUB_URL, {
        accessTokenFactory: () => {
          const token = this.authService.getToken();
          return token.accessToken;
        },
        transport: HttpTransportType.WebSockets
      })
      .configureLogging(LogLevel.Information)
      .withAutomaticReconnect()
      .build();
  }

  private stablishConnection() {
    return this.hubConnection?.start()
      .then(() => {
        console.log('Hub connection started')
      })
      .catch(() => {
        console.log('Error while establishing connection')
      });
  }

  private registerHandlers() {
    this.hubConnection?.on('new_message', (msg) => {
      this.messageSubject.next(msg);
    });
  }

}
