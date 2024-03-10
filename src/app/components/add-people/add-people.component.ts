import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ChatService } from '../../core/services/chat.service';
import { SharedModule } from '../../shared/shared.module';
import { AddGroupChatComponent } from '../add-group-chat/add-group-chat.component';

@Component({
  selector: 'app-add-people',
  templateUrl: './add-people.component.html',
  styleUrls: ['./add-people.component.scss'],
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
export class AddPeopleComponent implements OnInit {
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
      email: this.fb.control('', [Validators.required, Validators.email, Validators.maxLength(32)])
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
