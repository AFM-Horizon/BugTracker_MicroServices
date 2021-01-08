import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { BugService } from '../../shared/bug.service';
import { Bug } from './../../models/bug';
import { BugStatus } from '../../models/bug-status';
import { WorkspaceStateService } from './../../shared/workspace-state.service';
import { UserService } from './../../shared/user.service';
import { Subscription } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

@Component({
  selector: 'app-bug-entry',
  templateUrl: './bug-entry.component.html',
  styleUrls: ['./bug-entry.component.scss']
})

export class BugEntryComponent implements OnDestroy {
  @Input() status: BugStatus;
  faPlus = faPlus;
  isInput: boolean = false;
  title: string;
  showWarning: boolean = false;
  workspaceStateSubscription: Subscription;

  constructor(private bugService: BugService, private workspaceStateService: WorkspaceStateService, private userService: UserService) { }

  showInput() {
    this.isInput = true;
  }

  saveNewBug() {
    if (this.title === undefined || this.title.trim().length === 0) {
      this.showWarning = true;
      return;
    }

    this.workspaceStateSubscription = this.workspaceStateService.getState()
      .pipe(
        mergeMap((state) => {
          return this.userService.getUser()
            .pipe(
              mergeMap((user) => {
                const newBug: Bug = {
                  status: this.status,
                  name: this.title,
                  author: user.id,
                  description: "Enter a description here...",
                  workspace: state._id
                }

                this.cancelEntry();
                return this.bugService.addBug(newBug);
              })
            )
        })
      ).subscribe();
  }

  cancelEntry() {
    this.title = "";
    this.isInput = false;
    this.closeFlash();
  }

  closeFlash() {
    this.showWarning = false;
  }

  ngOnDestroy(): void {
    if (this.workspaceStateSubscription) {
      this.workspaceStateSubscription.unsubscribe();
    }
  }
}
