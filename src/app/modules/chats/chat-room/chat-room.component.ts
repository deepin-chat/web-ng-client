import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ChatModel } from '../../../core/models/chat.model';
import { ChatService } from '../../../core/services/chat.service';

@Component({
  selector: 'app-chat-room',
  templateUrl: './chat-room.component.html',
  styleUrls: ['./chat-room.component.scss']
})
export class ChatRoomComponent implements OnInit {
  chat?: ChatModel;
  isLoading = false;
  constructor(
    private route: ActivatedRoute,
    private chatService: ChatService
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(p => {
      if (p.has('id')) {
        this.loadChat(parseInt(p.get('id') ?? '0'));
      }
    })
  }

  private loadChat(chatId: number) {
    if (this.isLoading || !chatId) return;
    this.chatService.getChatById(chatId)
      .subscribe({
        next: (res) => {
          this.chat = res;
        },
        complete: () => {
          this.isLoading = false;
        }
      })
  }

}
