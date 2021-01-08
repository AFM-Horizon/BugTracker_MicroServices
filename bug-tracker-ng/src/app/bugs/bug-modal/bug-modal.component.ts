import { Component, OnInit, OnDestroy } from '@angular/core';
import { BugModalStateService } from '../../shared/bug-modal-state.service';
import { Observable, Subscription } from 'rxjs';
import { Bug } from '../../models/bug';
import { BugService } from '../../shared/bug.service';
import { Router } from '@angular/router';
import { faBug, faComment, faList } from '@fortawesome/free-solid-svg-icons';
import { UserService } from './../../shared/user.service';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-bug-modal',
  templateUrl: './bug-modal.component.html',
  styleUrls: ['./bug-modal.component.scss']
})
export class BugModalComponent implements OnInit, OnDestroy {
  isModal$: Observable<boolean>;
  bug$: Observable<Bug>
  user$: Observable<User>;
  subscriptions: Subscription[] = [];

  faBug = faBug;
  faList = faList;
  faComment = faComment;

  constructor(
    private modalService: BugModalStateService,
    private bugService: BugService,
    private router: Router,
    private user: UserService) { }

  ngOnInit(): void {
    this.subscriptions.push(
      this.modalService.getBugEditState().subscribe((bugId) => {
        this.bug$ = this.bugService.getBugById(bugId);
        this.user$ = this.user.getUser();
      })
    );
  }

  closeModal() {
    this.router.navigate(['bugs']);
    this.modalService.closeModal();
  }

  handleArchiveClick() {
    const archiveUpdate = {
      archived: true
    };

    this.subscriptions.push(
      this.bugService.updateBug(history.state.bugId, archiveUpdate).subscribe(() => {
        this.closeModal();
        this.bugService.updateBugData();
      })
    );
  }

  setBugColour(bug: Bug) {
    if (bug.status === "Created") {
      return { 'has-text-danger': true }
    }
    if (bug.status === "In-Progress") {
      return { 'has-text-warning': true }
    }
    if (bug.status === "Fixed") {
      return { 'has-text-success': true }
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => {
      if (sub) {
        sub.unsubscribe();
      }
    });
  }
}
