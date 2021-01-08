import { Injectable } from '@angular/core';
import { from, Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { LocalStorageService } from './local-storage.service';

@Injectable()

export class TokenService {
  constructor(private http: HttpClient, private router: Router, private localStorageService: LocalStorageService) { }

  getAccessToken(): Observable<string> {
    const token = this.localStorageService.getAccessToken();
    if(!token) {
      this.router.navigate(['auth/login']);
      return throwError(new Error("No Access Token Available"));
    }

    return from(this.checkAccessToken(token));
  }

  checkAccessToken(accessToken: string): Observable<string> {
    const isTokenExpired = this.checkAccessTokenIsExpired(accessToken);
    if(!isTokenExpired) {
      return of(accessToken);
    }
    
    return this.getRefreshedToken();
  }

  checkAccessTokenIsExpired = (jwt: string) => {
    const data = JSON.parse(atob(jwt.split('.')[1]));
    if (data.exp < new Date().getTime()/1000) {
      return true;
    }
    
    return false;
  }; 

  getRefreshedToken(): Observable<string> {
    const refreshToken = this.localStorageService.getRefreshToken();
    if(!refreshToken) {
      this.router.navigate(['auth/login']);
      return throwError(new Error("No Refresh Token Available"));
    }

    return this.http.post<any>('http://localhost:3002/auth/token', { 
      token: refreshToken 
    }, {headers: new HttpHeaders({skip: 'true'})}).pipe(
      map((data) => {
        this.localStorageService.setAccessToken(data.accessToken);
        return data.accessToken
      }),
      catchError((err) => {
        this.localStorageService.deleteTokens();
        this.router.navigate(['auth/login']);
        return throwError(err);
      })
    );
  }
}