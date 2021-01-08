import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { Observable, throwError } from 'rxjs';
import { finalize, catchError, tap, map } from 'rxjs/operators';
import { LoadingService } from '../loading.service';

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {
  constructor(private loadingService: LoadingService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.loadingService.setLoading(true, req.url);

    return next.handle(req).pipe(
      catchError((err) => {
        this.loadingService.setLoading(false, req.url);
        return throwError(err);
      }),
      map<HttpEvent<any>, any>((evt: HttpEvent<any>) => {
        if (evt instanceof HttpResponse) {
          this.loadingService.setLoading(false, req.url);
        }

        return evt;
      }
    ));
  }
}