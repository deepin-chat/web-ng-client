import { Component, Input, OnInit } from '@angular/core';
import { ChatModel } from '../../../../core/models/chat.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ChatService } from '../../../../core/services/chat.service';
import { NzModalRef } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-group-chat-editor',
  templateUrl: './group-chat-editor.component.html',
  styleUrls: ['./group-chat-editor.component.scss']
})
export class GroupChatEditorComponent implements OnInit {
  @Input() model?: ChatModel;
  form?: FormGroup;
  isLoading = false;
  constructor(
    private fb: FormBuilder,
    private chatService: ChatService,
    public modalRef: NzModalRef
  ) { }

  ngOnInit() {
    this.form = this.fb.group({
      name: this.fb.control(this.model ? this.model.groupInfo.name : '', [Validators.required, Validators.maxLength(32)]),
      link: this.fb.control(this.model ? this.model.groupInfo.link : '', [Validators.maxLength(32)]),
      description: this.fb.control(this.model ? this.model.groupInfo.description : '', [Validators.maxLength(512)]),
      avatarBlobId: this.fb.control(this.model ? this.model.groupInfo.avatarBlobId : ''),
    })
  }

  onSubmit() {
    if (this.isLoading || this.form?.invalid) return;
    this.isLoading = true;
    this.chatService.createGroupChat(this.form?.value)
      .subscribe({
        next: (res) => {
          this.modalRef.close();
        },
        complete: () => {
          this.isLoading = false;
        }
      })
  }
}
