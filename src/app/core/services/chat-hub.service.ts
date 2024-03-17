import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpTransportType, HubConnection, HubConnectionBuilder, LogLevel } from '@microsoft/signalr';
import { Subject } from 'rxjs';
import { AuthService } from './auth.service';
import { MessageModel, MessageRequest } from '../models/message.model';
const CHATS_HUB_URL = `${environment.apiRoot}/hubs/chat`;
@Injectable()
export class ChatHubService {
  private _message = new Subject<MessageModel>();
  public message = this._message.asObservable();


  private _chatChanged = new Subject<void>();
  public chatChanged = this._chatChanged.asObservable();
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
    this.hubConnection?.on('new_message', (res) => {
      console.log(res);
      this._message.next(res);
    });
    this.hubConnection?.on('new_chat', (res) => {
      this._chatChanged.next();
    });
  }

  send(request: MessageRequest) {
    return new Promise((res, rej) => {
      if (!this.hubConnection) {
        rej();
        return;
      }
      this.hubConnection?.invoke('SendMessage', request).then(() => {
        res(null);
      })
    });
  }
}
