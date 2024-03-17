import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { ChatsComponent } from './chats.component';
import { RoomComponent } from './room/room.component';

export const routes: Routes = [
    {
        path: '',
        component: ChatsComponent,
        children: [
            {
                path: ':id/room',
                component: RoomComponent
            }
        ]
    },
];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ChatsRoutingModule { }

