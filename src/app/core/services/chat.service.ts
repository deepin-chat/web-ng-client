import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { ChatInfoRequest, ChatListItem, ChatModel, DirectChatRequest } from '../models/chat.model';

const CHATS_URL = `${environment.apiRoot}/api/v1/chats`;
@Injectable()
export class ChatService {

  constructor(
    private httpClient: HttpClient
  ) { }

  getAllChats() {
    return this.httpClient.get<ChatListItem[]>(CHATS_URL);
  }

  getById(id: number) {
    return this.httpClient.get<ChatModel>(`${CHATS_URL}/${id}`);
  }

  createGroupChat(request: ChatInfoRequest) {
    return this.httpClient.post<ChatModel>(`${CHATS_URL}/group`, request);
  }

  createDirectChat(request: DirectChatRequest) {
    return this.httpClient.post<ChatModel>(`${CHATS_URL}/direct`, request);
  }

  delete(id: number) {
    return this.httpClient.delete<void>(`${CHATS_URL}/${id}`);
  }
}
