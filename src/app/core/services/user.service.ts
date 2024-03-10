import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { UserProfileModel } from '../models/user.model';
import { BehaviorSubject, Observable, tap } from 'rxjs';

const USERS_URL = `${environment.apiRoot}/api/v1/users`;
@Injectable()
export class UserService {
  private _current: BehaviorSubject<UserProfileModel> = new BehaviorSubject<any>(null);
  public current: Observable<UserProfileModel> = this._current.asObservable();
  constructor(
    private httpClient: HttpClient
  ) { }

  preload() {
    this.get().subscribe(res => {

    });
  }

  get() {
    return this.httpClient.get<UserProfileModel>(USERS_URL)
      .pipe(tap(user => {
        this._current.next(user);
      }));
  }
}
