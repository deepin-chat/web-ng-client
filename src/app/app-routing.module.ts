import { RouterModule, Routes } from '@angular/router';
import { AccountLayoutComponent } from './components/account-layout/account-layout.component';
import { DefaultLayoutComponent } from './components/default-layout/default-layout.component';
import { NgModule } from '@angular/core';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
    {
        path: 'account',
        component: AccountLayoutComponent,
        children: [
            {
                path: '',
                loadChildren: () => import('./modules/account/account.module').then(m => m.AccountModule)
            }
        ]
    },
    {
        path: '',
        canActivate: [authGuard],
        component: DefaultLayoutComponent,
        children: [
            { path: 'chat', loadChildren: () => import('./modules/chat/chat.module').then(m => m.ChatModule) },
            { path: 'home', loadChildren: () => import('./modules/home/home.module').then(m => m.HomeModule) },
            { path: '', pathMatch: 'full', redirectTo: 'chat' }
        ]
    }
];
@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }

