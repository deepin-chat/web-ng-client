import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ChatService } from '../../../../core/services/chat.service';
import { ChatModel, ChatType } from '../../../../core/models/chat.model';
import { UserService } from '../../../../core/services/user.service';
import { UserModel } from '../../../../core/models/user.model';

@Component({
  selector: 'app-chat-room-header',
  templateUrl: './chat-room-header.component.html',
  styleUrls: ['./chat-room-header.component.scss']
})
export class ChatRoomHeaderComponent implements OnInit, OnChanges {
  @Input() chatId = 0;
  isLoading = false;
  chat?: ChatModel;
  currentUser?: UserModel;
  chatUser?: UserModel;
  constructor(
    private chatService: ChatService,
    private userService: UserService) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['chatId'] && changes['chatId'].currentValue !== changes['chatId'].previousValue) {
      this.loadChat(changes['chatId'].currentValue);
    }
  }

  ngOnInit() {
    this.userService.current.subscribe(u => this.currentUser = u);
    this.loadChat(this.chatId);
  }
  private loadChat(id: number) {
    if (this.isLoading || !id) return;
    this.chatService.getById(id)
      .subscribe({
        next: (res) => {
          this.chat = res;
          if (res.type === ChatType.direct) {
            this.chatUser = res.members.find(s => s.userId !== this.currentUser?.id)?.user;
          }
        },
        complete: () => {
          this.isLoading = false;
        }
      })
  }
}
