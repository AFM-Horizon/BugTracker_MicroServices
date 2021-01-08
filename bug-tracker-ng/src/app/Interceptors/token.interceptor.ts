import { Injectable } from "@angular/core";
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { mergeMap, tap, catchError } from 'rxjs/operators';
import { AuthService } from './../shared/auth.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // If http request should not be intercepted it will have the skip header (auth routes)
    if (req.headers.get('skip')) {
      req.headers.delete('skip');
      return next.handle(req);
    }

    // This calls the auth service and attempts to get the token, if there are any errors it will handle them,
    // If there is no error it will merge map the stream into another observable, at which point the header will be added, if everything is ok
    // We will allow the http response to continue, otherwise we will assume there was some issue with the token and will reroute.
    return this.authService.getAuthHeader().pipe(
      catchError((error) => {
        this.authService.loginReroute();
        return throwError(error);
      }),
      mergeMap((header) => {
        if (header) {
          req = req.clone({
            setHeaders: header
          });
        }
        return next.handle(req).pipe(
          tap(
            (event) => { return event },
            (error) => {
              if (error instanceof HttpErrorResponse) {
                if(error.status === 401) {
                  this.authService.loginReroute();
                }
              }
            }
          )
        )
      })
    )
  }
}