import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from 'src/app/shared/user.service';
import { WorkspaceService } from '../workspace.service';
import { Workspace } from './../../models/workspace';
import { Observable, Subscription } from 'rxjs';
import { WorkspaceStateService } from './../../shared/workspace-state.service';
import { Router } from '@angular/router';
import { mergeMap } from 'rxjs/operators';

@Component({
  selector: 'app-workspace-main',
  templateUrl: './workspace-main.component.html',
  styleUrls: ['./workspace-main.component.scss']
})
export class WorkspaceMainComponent implements OnInit, OnDestroy {
  workspaces$: Observable<Workspace>;
  workspaceName: string;
  subscriptions: Subscription[] = [];

  constructor(
    private workspaceService: WorkspaceService,
    private userService: UserService,
    private workspaceStateService: WorkspaceStateService,
    private router: Router) { }

  ngOnInit(): void {
    this.subscriptions.push(
      this.userService.getUser().subscribe((user) => {
        this.getWorkspaces(user.id);
      })
    );
  }

  loadBugs(workspace: Workspace) {
    this.workspaceStateService.setState(workspace);
    this.router.navigate(['bugs']);
  }

  getWorkspaces(userId) {
    this.workspaces$ = this.workspaceService.getAll(userId);
  }

  addWorkspace() {
    const obs = this.userService.getUser()
      .pipe(
        mergeMap((user) => {
          const workspace: Workspace = {
            name: this.workspaceName,
            owner: user.id
          }
          return this.workspaceService.createWorkspace(user.id, workspace);
        })
      );

    this.subscriptions.push(
      obs.subscribe()
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => {
      if (sub) {
        sub.unsubscribe();
      }
    });
  }
}
