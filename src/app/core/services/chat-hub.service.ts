import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpTransportType, HubConnection, HubConnectionBuilder, LogLevel } from '@microsoft/signalr';
import { BehaviorSubject, Subject } from 'rxjs';
import { AuthService } from './auth.service';
import { MessageModel, MessageRequest } from '../models/message.model';
import { ChatModel } from '../models/chat.model';

const CHATS_HUB_URL = `${environment.apiRoot}/hubs/chat`;
@Injectable()
export class ChatHubService {
  private _message = new Subject<MessageModel>();
  public message = this._message.asObservable();


  private _chat = new Subject<ChatModel>();
  public chat = this._chat.asObservable();
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
      this._message.next(res);
    });
    this.hubConnection?.on('new_chat', (res) => {
      this._chat.next(res);
    });
  }

  send(payload: MessageRequest) {
    return new Promise((res, rej) => {
      if (!this.hubConnection) {
        rej();
        return;
      }
      this.hubConnection?.invoke('SendMessage', payload).then(() => {
        res(null);
      })
    });
  }
}
