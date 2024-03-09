import { NgModule } from '@angular/core';
import { ChatsComponent } from './chats.component';
import { SharedModule } from '../../shared/shared.module';
import { LayoutModule } from '../layout/layout.module';
import { ChatsRoutingModule } from './chat-routing.module';
import { ChatRoomComponent } from './chat-room/chat-room.component';
import { ChatListComponent } from './components/chat-list/chat-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatListModule } from '@angular/material/list';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbar } from '@angular/material/toolbar';
import { MatInputModule } from '@angular/material/input';
import { MessageFormComponent } from '../../components/message-form/message-form.component';
import { MessageListComponent } from '../../components/message-list/message-list.component';

@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatListModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatToolbar,
    SharedModule,
    LayoutModule,
    ChatsRoutingModule,
    MessageFormComponent,
    MessageListComponent
  ],
  declarations: [
    ChatsComponent,
    ChatRoomComponent,
    ChatListComponent
  ]
})
export class ChatsModule { }
