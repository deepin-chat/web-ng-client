import { NgModule } from '@angular/core';
import { ChatsComponent } from './chats.component';
import { SharedModule } from '../../shared/shared.module';
import { LayoutModule } from '../layout/layout.module';
import { ChatsRoutingModule } from './chat-routing.module';
import { ChatListComponent } from './components/chat-list/chat-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatListModule } from '@angular/material/list';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MessageFormComponent } from '../../components/message-form/message-form.component';
import { MessageListComponent } from '../../components/message-list/message-list.component';
import { RoomComponent } from './room/room.component';
import { ChatRoomHeaderComponent } from './components/chat-room-header/chat-room-header.component';

@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatListModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatToolbarModule,
    MatButtonModule,
    SharedModule,
    LayoutModule,
    ChatsRoutingModule,
    MessageFormComponent,
    MessageListComponent
  ],
  declarations: [
    ChatsComponent,
    ChatListComponent,
    RoomComponent,
    ChatRoomHeaderComponent
  ]
})
export class ChatsModule { }
