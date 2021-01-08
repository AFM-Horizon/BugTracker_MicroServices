import { Injectable } from "@angular/core";
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { UserMessagingService } from './../shared/user-messaging.service';

@Injectable()

export class ApiConnectionInterceptor implements HttpInterceptor {
  constructor(private router: Router, private userMsgService: UserMessagingService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      tap(
        (event) => { return event },
        (error) => {
          if(error.status == 0) {
            this.userMsgService.setMessage('Server seems to be Offline, Try Again Later.');
            this.router.navigate(['auth/login']);
            return throwError('API Currently Offline');
          }
        }
      )
    )
  }
}