import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ChatHubService } from './services/chat-hub.service';
import { AuthService } from './services/auth.service';
import { ChatService } from './services/chat.service';
import { MessageService } from './services/message.service';
import { UserService } from './services/user.service';
@NgModule({
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers: [
    AuthService,
    ChatHubService,
    ChatService,
    MessageService,
    UserService
  ]
})
export class CoreModule { }
