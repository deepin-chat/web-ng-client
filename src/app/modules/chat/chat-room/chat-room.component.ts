import { Component, OnInit } from '@angular/core';
import { ChatService } from '../../../core/services/chat.service';
import { ChatModel } from '../../../core/models/chat.model';
import { ActivatedRoute } from '@angular/router';

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
        this.loadData(parseInt(p.get('id') ?? '0'));
      }
    })
  }

  private loadData(chatId?: number) {
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
