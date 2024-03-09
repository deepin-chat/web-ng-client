import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { UserProfileModel } from '../models/user.model';

const USERS_URL = `${environment.apiRoot}/api/v1/users`;
@Injectable()
export class UserService {

  constructor(
    private httpClient: HttpClient
  ) { }

  get() {
    return this.httpClient.get<UserProfileModel>(USERS_URL);
  }
}
