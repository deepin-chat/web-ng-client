import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

export enum ThemeType {
  light = 'light',
  dark = 'dark'
}

@Injectable()
export class LayoutService {
  private _theme: BehaviorSubject<ThemeType> = new BehaviorSubject<ThemeType>(ThemeType.dark);
  public readonly theme = this._theme.asObservable();
  constructor() { }

  switchTheme(value: ThemeType) {
    this._theme.next(value);
  }
}
