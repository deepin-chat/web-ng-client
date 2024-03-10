import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { ChatService } from '../../core/services/chat.service';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-group-chat',
  templateUrl: './add-group-chat.component.html',
  styleUrls: ['./add-group-chat.component.scss'],
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
export class AddGroupChatComponent implements OnInit {
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
    this.chatService.createGroupChat(this.form?.value)
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
