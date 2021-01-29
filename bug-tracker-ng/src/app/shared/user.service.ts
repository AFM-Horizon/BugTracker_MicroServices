import { Injectable, OnInit } from '@angular/core';
import { TokenService } from './token.service';
import { User } from '../models/user';
import { map, catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { UserMessagingService } from './user-messaging.service';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from './config.service';

@Injectable()

export class UserService {
  baseUrl: string = this.config.getAPIConnectionBaseUrl();

  constructor(
    private tokenService: TokenService,
    private UserMessagingService: UserMessagingService,
    private http: HttpClient,
    private config: ConfigService) { }

  getUserById(id: string): Observable<User> {
    return this.http.get<User>(`${this.baseUrl}/auth/getById/${id}`);
  }

  getUser(): Observable<User> {
    return this.tokenService.getAccessToken()
      .pipe(
        catchError((err) => {
          this.UserMessagingService.setMessage('Hmm, we seem to be having trouble with your identity');
          return throwError(err);
        }),
        map((token) => {
          const tokenParse = JSON.parse(atob(token.split('.')[1]));
          const user: User = {
            _id: tokenParse.id,
            username: tokenParse.username,
            password: null
          }

          return user;
        })
      );
  }

}