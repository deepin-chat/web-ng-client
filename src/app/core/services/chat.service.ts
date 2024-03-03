import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { ChatModel, NewGroupChatModel } from '../models/chat.model';

const CHATS_URL = `${environment.apiRoot}/api/v1/chats`;
@Injectable()
export class ChatService {

  constructor(
    private httpClient: HttpClient
  ) { }

  getChats() {
    return this.httpClient.get<ChatModel[]>(CHATS_URL);
  }

  getChatById(id: number) {
    return this.httpClient.get<ChatModel>(`${CHATS_URL}/${id}`);
  }

  createGroupChat(payload: NewGroupChatModel) {
    return this.httpClient.post<ChatModel>(`${CHATS_URL}/group`, payload);
  }
}
