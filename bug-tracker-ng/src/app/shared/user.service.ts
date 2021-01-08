import { Injectable } from '@angular/core';
import { TokenService } from './token.service';
import { User } from '../models/user';
import { map, catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { AuthMessagingService } from './../auth/auth-messaging.service';
import { UserMessagingService } from './user-messaging.service';

@Injectable()

export class UserService {
  constructor(private tokenService: TokenService, private UserMessagingService: UserMessagingService) {}

  getUser(): Observable<User> {
    return this.tokenService.getAccessToken()
      .pipe(
        catchError((err) => {
          this.UserMessagingService.setMessage('Hmm, we seem to be having trouble with your identity');
          return throwError(err);
        }),
        map((token) => {
          return JSON.parse(atob(token.split('.')[1])) as User;
        })
      );
  }
}