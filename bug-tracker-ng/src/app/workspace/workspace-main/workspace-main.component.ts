import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from 'src/app/shared/user.service';
import { WorkspaceService } from '../workspace.service';
import { Workspace } from './../../models/workspace';
import { Observable, Subject } from 'rxjs';
import { WorkspaceStateService } from './../../shared/workspace-state.service';
import { Router } from '@angular/router';
import { mergeMap, takeUntil } from 'rxjs/operators';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-workspace-main',
  templateUrl: './workspace-main.component.html',
  styleUrls: ['./workspace-main.component.scss']
})
export class WorkspaceMainComponent implements OnInit, OnDestroy {
  workspaces$: Observable<Workspace[]>;
  invited$: Observable<Workspace[]>;
  workspaceName: string;
  stop$: Subject<void> = new Subject();
  faPlus = faPlus;

  constructor(
    private workspaceService: WorkspaceService,
    private userService: UserService,
    private workspaceStateService: WorkspaceStateService,
    private router: Router) { }

  ngOnInit(): void {
    this.userService.getUser().pipe(takeUntil(this.stop$)).subscribe((user) => {
      this.getWorkspaces(user._id);
      this.getInvitedWorkspaces(user._id);
    });
    this.workspaceStateService.setState(null);
  }

  loadBugs(workspace: Workspace) {
    this.workspaceStateService.setState(workspace);
    this.router.navigate(['bugs']);
  }

  getWorkspaces(userId: string) {
    this.workspaces$ = this.workspaceService.getAll(userId);
  }

  getInvitedWorkspaces(userId: string) {
    this.invited$ = this.workspaceService.getInvited(userId);
  }

  addWorkspace() {
    this.userService.getUser()
      .pipe(
        takeUntil(this.stop$),
        mergeMap((user) => {
          const workspace: Workspace = {
            name: this.workspaceName,
            owner: user._id
          }
          return this.workspaceService.create(workspace, user._id);
        })
      ).subscribe();
  }

  ngOnDestroy(): void {
    this.stop$.next();
    this.stop$.complete();
  }
}
