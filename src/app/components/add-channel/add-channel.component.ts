import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { ChatService } from '../../core/services/chat.service';
import { AddGroupChatComponent } from '../add-group-chat/add-group-chat.component';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { SharedModule } from '../../shared/shared.module';

@Component({
  selector: 'app-add-channel',
  templateUrl: './add-channel.component.html',
  styleUrls: ['./add-channel.component.scss'],
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    MatDialogModule
  ]
})
export class AddChannelComponent implements OnInit {
  form?: FormGroup;
  isLoading = false;
  constructor(
    private fb: FormBuilder,
    private chatService: ChatService,
    public dialogRef: MatDialogRef<AddGroupChatComponent>
  ) { }

  ngOnInit() {
    this.buildForm();
  }

  buildForm() {
    this.form = this.fb.group({
      name: this.fb.control('', [Validators.required, Validators.maxLength(32)]),
      description: this.fb.control('', [Validators.maxLength(256)]),
      link: this.fb.control('', [Validators.minLength(4), Validators.maxLength(32)]),
    });
  }

  onSubmit() {
    if (this.isLoading || this.form?.invalid) return;
    this.isLoading = true;
    this.chatService.createChannel(this.form?.value)
      .subscribe({
        next: () => {
          this.dialogRef.close();
        },
        complete: () => {
          this.isLoading = false;
        }
      })
  }

}
