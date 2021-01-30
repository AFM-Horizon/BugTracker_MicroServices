import { Component, Input, OnInit, OnDestroy, ElementRef } from '@angular/core';
import { Observable, of, combineLatest, fromEvent } from 'rxjs';
import { debounceTime, distinctUntilChanged, map, mergeMap, switchMap, take, takeUntil, toArray } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { User } from 'src/app/models/user';
import { Workspace } from './../../models/workspace';
import { WorkspaceService } from './../workspace.service';
import { UserStatus } from './../../models/user-list';
import { BaseClickDetectorComponent } from './../../shared/CommonComponents/ClickOusideEventBase.component';
import { environment } from './../../../environments/environment';

@Component({
  selector: 'app-user-search',
  templateUrl: './user-search.component.html',
  styleUrls: ['./user-search.component.scss']
})
export class UserSearchComponent extends BaseClickDetectorComponent implements OnInit, OnDestroy {
  users$: Observable<UserStatus[]>
  @Input() workspace: Workspace;
  searchValue: string;

  constructor(
    private http: HttpClient,
    private workspaceService: WorkspaceService,
    _eref: ElementRef
  ) {
    super(_eref);
  }

  ngOnInit(): void {
    super.ngOnInit();
    this.listenToKeyupEvent();
  }

  listenToKeyupEvent() {
    this.users$ = combineLatest([
      fromEvent(document.getElementById('search'), 'keyup'),
      this.clickSubject$.asObservable()
    ])
      .pipe(
        map(([event, isActive]) => {
          if (!isActive) {
            this.searchValue = '';
            return '';
          }
          const element = event.target as HTMLInputElement
          return element.value;
        }),
        debounceTime(200),
        distinctUntilChanged(),
        mergeMap((value) => {
          if (this.isValidKeyPressValue(value)) {
            return this.createUserStatusObservable(value);
          }
          return of([]);
        })
      );
  }

  private isValidKeyPressValue(keyPressValue: string) {
    const filteredVal = keyPressValue.replace(/[^0-9a-z]/gi, '');
    return filteredVal && filteredVal.trim().length !== 0;
  }

  private createUserStatusObservable(keyPressValue: string): Observable<UserStatus[]> {
    return this.http.get<User[]>(`${environment.apiUrl}/auth/search/${keyPressValue}`).pipe(
      switchMap((users) => {
        let userList: UserStatus[] = [];
        users.forEach(user => {
          this.workspace.permissions.find(p => p === user._id)
            ? userList.push(new UserStatus(true, user))
            : userList.push(new UserStatus(false, user))
        });
        return userList;
      }),
      take(5),
      toArray()
    )
  }

  addUser(user: UserStatus): void {
    if (!user.isAdded) {
      this.workspace.permissions.push(user.user._id);
      this.workspaceService.update(this.workspace._id, this.workspace, user.user._id)
        .pipe(takeUntil(this.stop$)).subscribe();
      this.clickSubject$.next(false);
    }
  }
}
