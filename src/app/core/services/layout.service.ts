import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

export enum ThemeType {
  light = 'light',
  dark = 'dark'
}

@Injectable()
export class LayoutService {
  private _theme: BehaviorSubject<ThemeType> = new BehaviorSubject<ThemeType>(ThemeType.light);
  public readonly theme = this._theme.asObservable();
  constructor() { }

  switchTheme() {
    this._theme.next(this._theme.value === ThemeType.dark ? ThemeType.light : ThemeType.dark);
  }
}
