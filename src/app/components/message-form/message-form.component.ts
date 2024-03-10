import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { MessageRequest } from '../../core/models/message.model';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MessageService } from '../../core/services/message.service';
import { SharedModule } from '../../shared/shared.module';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ChatHubService } from '../../core/services/chat-hub.service';

@Component({
  selector: 'app-message-form',
  templateUrl: './message-form.component.html',
  styleUrls: ['./message-form.component.scss'],
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    SharedModule
  ]
})
export class MessageFormComponent implements OnInit, OnChanges {
  @Input() chatId = 0;
  @Input() message?: MessageRequest;
  form?: FormGroup;
  isLoading = false;
  constructor(
    private fb: FormBuilder,
    private messageService: MessageService,
    private chatHub: ChatHubService
  ) { }

  ngOnInit() {
    this.buildForm(this.chatId, this.message);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['chatId'] && changes['chatId'].currentValue !== changes['chatId'].previousValue) {
      this.buildForm(changes['chatId'].currentValue);
    }
  }

  private buildForm(chatId: number, message?: MessageRequest) {
    this.form = this.fb.group({
      chatId: this.fb.control(chatId),
      text: this.fb.control(message?.text ?? '', [Validators.required, Validators.maxLength(4096)]),
      replyTo: this.fb.control(message?.replyTo ?? '')
    });
  }

  onSubmit() {
    if (!this.form || this.form?.invalid || this.isLoading) return;
    this.isLoading = true;
    this.chatHub.send(this.form.value)
      .then(() => {
        this.form?.reset({
          chatId: this.form.value.chatId
        })
      })
      .finally(() => {
        this.isLoading = false;
      });
    // this.messageService.send(this.form.value)
    //   .subscribe({
    //     next: (msg) => {
    //       this.form?.reset({
    //         chatId: this.chatId
    //       })
    //     },
    //     complete: () => {
    //       this.isLoading = false;
    //     }
    //   })
  }

  enterForm(event: any) {
    if (event.ctrlKey && event.keyCode === 13) {
      this.onSubmit();
    }
  }

}
