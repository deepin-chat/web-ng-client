import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ChatHubService } from './services/chat-hub.service';
import { AuthService } from './services/auth.service';
import { ChatService } from './services/chat.service';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers: [
    AuthService,
    ChatHubService,
    ChatService
  ]
})
export class CoreModule { }
