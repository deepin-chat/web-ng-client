import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MessageModel, MessageQuery, MessageRequest } from '../models/message.model';
import { PagedResult } from '../models/pagination.model';
import { environment } from '../../../environments/environment';

const MESSAGES_URL = `${environment.apiRoot}/api/v1/messages`;

@Injectable()
export class MessageService {
  constructor(
    private httpClient: HttpClient
  ) { }

  getPagedList(query: MessageQuery) {
    return this.httpClient.get<PagedResult<MessageModel>>(MESSAGES_URL, {
      params: query as any
    });
  }

  send(payload: MessageRequest) {
    return this.httpClient.post<MessageModel>(MESSAGES_URL, payload);
  }

}
