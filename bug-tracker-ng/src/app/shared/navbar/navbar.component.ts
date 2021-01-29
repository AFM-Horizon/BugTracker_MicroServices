import { Component, OnDestroy, OnInit } from '@angular/core';
import { faSignOutAlt, faHome } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { UserService } from './../user.service';
import { Subject, Observable } from 'rxjs';
import { WorkspaceStateService } from 'src/app/shared/workspace-state.service';
import { User } from 'src/app/models/user';
import { map, takeUntil, mergeMap,  scan, distinctUntilChanged,  pluck, mergeAll } from 'rxjs/operators';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, OnDestroy {
  faSignOutAlt = faSignOutAlt;
  faHome = faHome;
  userList$: Observable<User[]>;
  stop$: Subject<void> = new Subject();

  constructor(
    private authService: AuthService,
    private router: Router,
    private userService: UserService,
    private workspaceStateService: WorkspaceStateService) { }

  ngOnInit(): void {
    this.addUserToNameList();
  }

  user$ = this.userService.getUser();
  workspace$ = this.workspaceStateService.getState();

  logoutHandler() {
    this.authService.logoutUser().pipe(takeUntil(this.stop$)).subscribe(() => {
      this.router.navigate(['auth/login']);
    })
  }

  addUserToNameList() {
    this.userList$ = this.workspace$.pipe(
      pluck('permissions'),
      mergeMap(permissions => permissions),
      map((permission) => {
        return this.userService.getUserById(permission);
      }),
      mergeAll(),
      scan((acc: User[], value) => {
        if (!acc.find(x => x.username === value.username)) {
          acc.push(value);
        }
        return acc;
      }, [])
    )
  }

  ngOnDestroy(): void {
    this.stop$.next();
    this.stop$.complete();
  }
}
