import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
    {
        path: 'account',
        loadChildren: () => import('./modules/account/account.module').then(m => m.AccountModule)
    },
    {
        path: 'home',
        canActivate: [authGuard],
        loadChildren: () => import('./modules/home/home.module').then(m => m.HomeModule)
    },
    {
        path: 'chats',
        canActivate: [authGuard],
        loadChildren: () => import('./modules/chats/chats.module').then(m => m.ChatsModule)
    },
    {
        path: 'search',
        canActivate: [authGuard],
        loadChildren: () => import('./modules/search/search.module').then(m => m.SearchModule)
    },
    {
        path: 'profile',
        canActivate: [authGuard],
        loadChildren: () => import('./modules/profile/profile.module').then(m => m.ProfileModule)
    },
    {
        path: 'settings',
        canActivate: [authGuard],
        loadChildren: () => import('./modules/settings/settings.module').then(m => m.SettingsModule)
    },
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'chats'
    }
    // {
    //     path: '',
    //     canActivate: [authGuard],
    //     component: LayoutDefaultComponent,
    //     children: [
    //         { path: 'chat', loadChildren: () => import('./modules/chat/chat.module').then(m => m.ChatModule) },
    //         { path: 'home', loadChildren: () => import('./modules/home/home.module').then(m => m.HomeModule) },
    //         { path: '', pathMatch: 'full', redirectTo: 'chat' }
    //     ]
    // }
];
@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }

