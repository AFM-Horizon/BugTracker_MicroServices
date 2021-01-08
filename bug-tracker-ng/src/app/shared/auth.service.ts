import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../models/user';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { TokenResponse } from '../models/tokenResponse';
import { LocalStorageService } from './local-storage.service';
import { TokenService } from './token.service';
import { Router } from '@angular/router';

@Injectable()

export class AuthService {
  private BaseUrl = 'http://localhost:3002/auth';
  
  constructor(
    private http: HttpClient, 
    private localStorageService: LocalStorageService, 
    private tokenService: TokenService,
    private router: Router) { }

  getAuthHeader(): Observable<any> {
    return this.tokenService.getAccessToken()
      .pipe(
        map((token) => {
          return { Authorization: `Bearer ${token}` };
        })
      );
  }

  loginUser(user: User): Observable<TokenResponse> {
    return this.http.post<TokenResponse>(`${this.BaseUrl}/login`, { 
      username: user.username, 
      password: user.password 
    }, {headers: new HttpHeaders({skip: 'true'})})
      .pipe(
        map((res) => {
          this.localStorageService.setAccessToken(res.accessToken);
          this.localStorageService.setRefreshToken(res.refreshToken);
          return res;
        }),
        catchError((err) => {
          return throwError(err);
        })
      );
  }

  logoutUser(): Observable<any> {
    return this.http.post<any>(`${this.BaseUrl}/logout`, this.localStorageService.getRefreshToken())
      .pipe(
        map((data) => {
          this.localStorageService.deleteTokens();
          return data
        })
      )
  }

  registerUser(user: User): Observable<any> {
    console.log(JSON.stringify(user));
    return this.http.post<any>(`${this.BaseUrl}/register`, { 
      username: user.username, 
      password: user.password 
    }, {headers: new HttpHeaders({skip: 'true'})})
      .pipe(
        catchError((err) => {
          return throwError(err);
        })
      );
  }

  loginReroute(): void {
    this.router.navigate(['auth/login']);
  }
}