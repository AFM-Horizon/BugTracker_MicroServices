import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, of } from 'rxjs';
import { TokenService } from './shared/token.service';
import { map, catchError } from 'rxjs/operators';
import { UserMessagingService } from './shared/user-messaging.service';

@Injectable({
  providedIn: 'root'
})
export class AuthRouteGuardGuard implements CanActivate {
  constructor(private tokenService: TokenService, private userMsgService: UserMessagingService) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    return this.tokenService.getAccessToken()
      .pipe(
        map(() => {
          return true;
        }),
        catchError(() => {
          this.userMsgService.setMessage('We could not verify your identity, please log in again');
          return of(false);
        })
      )
  }
}
