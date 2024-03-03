import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { ChatComponent } from './chat.component';
import { ChatRoomComponent } from './chat-room/chat-room.component';

export const routes: Routes = [
    {
        path: '',
        component: ChatComponent,
        children: [
            {
                path: ':id/room',
                component: ChatRoomComponent
            }
        ]
    },
];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ChatRoutingModule { }
