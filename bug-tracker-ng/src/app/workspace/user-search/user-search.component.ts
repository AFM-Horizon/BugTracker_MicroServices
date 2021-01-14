import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { fromEvent, Observable, of, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, map, mergeMap, switchMap, take, takeUntil, toArray } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from './../../shared/config.service';
import { User } from 'src/app/models/user';
import { Workspace } from './../../models/workspace';
import { WorkspaceService } from './../workspace.service';
import { UserStatus } from './../../models/user-list';

@Component({
  selector: 'app-user-search',
  templateUrl: './user-search.component.html',
  styleUrls: ['./user-search.component.scss']
})
export class UserSearchComponent implements OnInit, OnDestroy {
  users$: Observable<UserStatus[]>
  stop$: Subject<void> = new Subject();
  dropdownActive: boolean;
  @Input() workspace: Workspace;

  constructor(
    private http: HttpClient,
    private config: ConfigService,
    private workspaceService: WorkspaceService
  ) { }

  ngOnInit(): void {
    this.users$ = fromEvent(document.getElementById('search'), 'keyup')
      .pipe(
        map((event) => {
          var element = event.target as HTMLInputElement
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

  isValidKeyPressValue(keyPressValue: string) {
    const filteredVal = keyPressValue.replace(/[^0-9a-z]/gi, '');
    return filteredVal && filteredVal.trim().length !== 0;
  }

  createUserStatusObservable(keyPressValue: string): Observable<UserStatus[]> {
    return this.http.get<User[]>(`${this.config.getAPIConnectionBaseUrl()}/auth/search/${keyPressValue}`).pipe(
      switchMap((users) => {
        let userList: UserStatus[] = [];
        users.forEach(user => {
          if (this.workspace.permissions.find(p => p === user._id)) {
            userList.push(new UserStatus(true, user));
          }
          else {
            userList.push(new UserStatus(false, user));
          }
        });
        return userList;
      }),
      take(5),
      toArray()
    )
  }

  toggleDropdown() {
    this.dropdownActive = !this.dropdownActive;
  }

  addUser(user: UserStatus): void {
    if (!user.isAdded) {
      this.workspace.permissions.push(user.user._id);
      this.workspaceService.updateWorkspace(this.workspace._id, this.workspace, user.user._id)
        .pipe(takeUntil(this.stop$)).subscribe();
      this.dropdownActive = false;
    }
  }

  ngOnDestroy(): void {
    this.stop$.next();
    this.stop$.complete();
  }
}
