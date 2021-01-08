import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { Bug } from 'src/app/models/bug';
import { BugService } from '../../shared/bug.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-bug-title',
  templateUrl: './bug-title.component.html',
  styleUrls: ['./bug-title.component.scss']
})
export class BugTitleComponent implements OnInit, OnDestroy{
  @Input() bug: Bug;
  originalTitle: string;
  isEdit: boolean = false;
  bugSubscription: Subscription;

  constructor(private bugService: BugService) { }

  ngOnInit(): void {
    this.originalTitle = this.bug.name;
  }

  showEditTitle() {
    this.isEdit = true;
  }

  saveTitle() {
    this.isEdit = false;
    if (this.bug.name.trim().length === 0) {
      this.bug.name = this.originalTitle;
      return;
    }
    const update = {
      name: this.bug.name
    }
    this.bugSubscription = this.bugService.updateBug(this.bug._id, update).subscribe(() => {
      this.bugService.updateBugData();
    });
  }

  ngOnDestroy(): void {
    if(this.bugSubscription) {
      this.bugSubscription.unsubscribe();
    }
  }
}
