import { NgModule } from '@angular/core';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';

import { ChatComponent } from './chat.component';
import { SharedModule } from '../../shared/shared.module';
import { ChatRoutingModule } from './chat-routing.module';
import { ChatListComponent } from './components/chat-list/chat-list.component';
import { GroupChatEditorComponent } from './components/group-chat-editor/group-chat-editor.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ChatRoomComponent } from './chat-room/chat-room.component';

@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,
    NzButtonModule,
    NzModalModule,
    NzListModule,
    NzFormModule,
    NzInputModule,
    SharedModule,
    ChatRoutingModule
  ],
  declarations: [
    ChatComponent,
    ChatListComponent,
    GroupChatEditorComponent,
    ChatRoomComponent
  ]
})
export class ChatModule { }
