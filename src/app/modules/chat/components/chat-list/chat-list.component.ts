import { Component, OnInit } from '@angular/core';
import { ChatService } from '../../../../core/services/chat.service';
import { ChatModel } from '../../../../core/models/chat.model';
import { NzModalService } from 'ng-zorro-antd/modal';
import { GroupChatEditorComponent } from '../group-chat-editor/group-chat-editor.component';

@Component({
  selector: 'app-chat-list',
  templateUrl: './chat-list.component.html',
  styleUrls: ['./chat-list.component.scss']
})
export class ChatListComponent implements OnInit {
  list: ChatModel[] = [];
  isLoading = false;
  constructor(
    private modalService: NzModalService,
    private chatService: ChatService
  ) { }

  ngOnInit() {
    this.onQuery();
  }

  onQuery() {
    if (this.isLoading) return;
    this.isLoading = true;
    this.chatService.getChats().subscribe({
      next: (res) => {
        this.list = res;
      },
      complete: () => {
        this.isLoading = false;
      }
    })
  }

  onEditGroupChat(item?: ChatModel) {
    this.modalService.create({
      nzTitle: item ? 'Edit Chat' : 'New Group Chat',
      nzContent: GroupChatEditorComponent,
      nzData: { model: item },
      nzFooter: null
    })
  }
}
