import { Component, OnInit } from '@angular/core';
import { LayoutService, ThemeType } from './core/services/layout.service';
import { ChatHubService } from './core/services/chat-hub.service';
import { AuthService } from './core/services/auth.service';
import { UserService } from './core/services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  constructor(
    private layoutService: LayoutService,
    private chatHubService: ChatHubService,
    private authService: AuthService,
    private userService: UserService
  ) {
  }

  ngOnInit() {
    this.authService.token.subscribe(token => {
      if (token) {
        this.chatHubService.start();
        this.userService.preload();
      }
    });
    this.layoutService.theme.subscribe(res => {
      const body = document.body;
      body.className = res === ThemeType.dark ? 'dark-theme' : 'light-theme';
    })
  }

}
