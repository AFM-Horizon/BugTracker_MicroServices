import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { Workspace } from "../models/workspace";
import { LocalStorageService } from './local-storage.service';
import { switchMap, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class WorkspaceStateService {
  private stateSubject: BehaviorSubject<Workspace> = new BehaviorSubject<Workspace>(null);

  constructor(private localStorageService: LocalStorageService, private router: Router) { }

  setState(workspace: Workspace): void {
    this.localStorageService.setWorkspaceState(JSON.stringify(workspace));
    this.stateSubject.next(workspace);
  }

  getState(): Observable<Workspace> {
    return this.stateSubject.pipe(
      switchMap((state) => {
        if (state) {
          return this.stateSubject;
        }

        const localState = JSON.parse(this.localStorageService.getWorkspaceState());
        if (localState) {
          return of(localState);
        }
        else {
          this.router.navigate(['workspace']);
          return throwError(new Error('Workspace State Unavailable'));
        }
      })
    );
  }
}