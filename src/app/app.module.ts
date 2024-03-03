import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { en_US, provideNzI18n } from 'ng-zorro-antd/i18n';
import { IconDefinition } from '@ant-design/icons-angular';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { NzIconModule } from 'ng-zorro-antd/icon';


import { LockOutline, UserOutline } from '@ant-design/icons-angular/icons';
import { AuthHttpInterceptor } from './core/http-interceptors/auth-http-interceptor';
import { RouterModule } from '@angular/router';

const icons: IconDefinition[] = [LockOutline, UserOutline];
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CommonModule,
    HttpClientModule,
    NzIconModule.forRoot(icons),
    CoreModule,
    AppRoutingModule
  ],
  providers: [
    provideNzI18n(en_US),
    { provide: HTTP_INTERCEPTORS, useClass: AuthHttpInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
