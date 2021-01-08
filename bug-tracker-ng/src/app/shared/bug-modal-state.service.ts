import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of, BehaviorSubject, throwError } from 'rxjs';
import { LocalStorageService } from './local-storage.service';
import { Bug } from 'src/app/models/bug';
import { switchMap } from 'rxjs/operators';

@Injectable()
export class BugModalStateService {
  private isModalOpen$: BehaviorSubject<boolean>;
  private bugEditState: BehaviorSubject<string> = new BehaviorSubject<string>(null);

  constructor(private localStorageService: LocalStorageService, private router: Router) {
    this.isModalOpen$ = new BehaviorSubject<boolean>(false);
  }

  setBugEditState(bug: Bug): void {
    this.localStorageService.setBugEditState(bug._id);
    this.bugEditState.next(bug._id);
  }

  getBugEditState(): Observable<string> {
    return this.bugEditState.pipe(
      switchMap((state) => {
        if(state) {
          return this.bugEditState;
        }

        const localState = this.localStorageService.getBugEditState();
        if(localState) {
          return of(localState);
        }
        else {
          this.router.navigate(['bugs']);
          return throwError(new Error('Bug Id State Unavailable'));
        }
      })
    )
  }

  getModalState(): Observable<boolean> {
    return this.isModalOpen$;
  }

  openModal(): void {
    this.isModalOpen$.next(true);
  }

  closeModal(): void {
    this.isModalOpen$.next(false);
  }
}