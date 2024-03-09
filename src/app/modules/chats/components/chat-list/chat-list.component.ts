import { Component, OnInit } from '@angular/core';
import { ChatModel } from '../../../../core/models/chat.model';
import { ChatService } from '../../../../core/services/chat.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-chat-list',
  templateUrl: './chat-list.component.html',
  styleUrls: ['./chat-list.component.scss']
})
export class ChatListComponent implements OnInit {
  list: ChatModel[] = [];
  isLoading = false;
  form?: FormGroup;
  constructor(
    private fb: FormBuilder,
    private chatService: ChatService
  ) { }

  ngOnInit() {
    this.form = this.fb.group({
      keywords: this.fb.control('', [Validators.maxLength(256)])
    });
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

}
