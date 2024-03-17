import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { ProfileRequest, UserModel, UserProfile } from '../models/user.model';
import { BehaviorSubject, Observable, tap } from 'rxjs';

const USERS_URL = `${environment.apiRoot}/api/v1/users`;
@Injectable()
export class UserService {
  private _current: BehaviorSubject<UserModel> = new BehaviorSubject<any>(null);
  public current: Observable<UserModel> = this._current.asObservable();
  constructor(
    private httpClient: HttpClient
  ) { }

  preload() {
    this.get().subscribe(res => {

    });
  }

  get() {
    return this.httpClient.get<UserModel>(USERS_URL)
      .pipe(tap(user => {
        this._current.next(user);
      }));
  }

  update(payload: ProfileRequest) {
    return this.httpClient.put<UserProfile>(USERS_URL, payload);
  }
}
