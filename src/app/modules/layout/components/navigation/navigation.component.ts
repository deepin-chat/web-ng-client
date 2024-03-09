import { Component, OnInit } from '@angular/core';
import { LayoutService, ThemeType } from '../../services/layout.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {

  theme: ThemeType = ThemeType.light;
  constructor(
    private layoutService: LayoutService
  ) {
  }

  ngOnInit() {
    this.layoutService.theme.subscribe(res => {
      this.theme = res;
      const body = document.body;
      body.className = res === ThemeType.dark ? 'dark-theme' : 'light-theme';
    })
  }

  switchTheme() {
    const nextTheme = this.theme === ThemeType.dark ? ThemeType.light : ThemeType.dark;
    this.layoutService.switchTheme(nextTheme);
  }
}
