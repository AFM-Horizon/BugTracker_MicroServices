import { Component, Input, OnDestroy } from '@angular/core';
import { faList } from '@fortawesome/free-solid-svg-icons';
import { Bug } from 'src/app/models/bug';
import { BugService } from '../bug/bug.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-bug-desc',
  templateUrl: './bug-desc.component.html',
  styleUrls: ['./bug-desc.component.scss']
})
export class BugDescComponent implements OnDestroy {
  @Input() bug: Bug;
  updateBug: Subscription;
  isEdit: boolean = false;
  faList = faList;

  constructor(private bugService: BugService) { }

  showEditDesc() {
    this.isEdit = true;
  }

  saveDesc() {
    this.isEdit = false;
    if(this.bug.description.trim.length === 0) {
      this.bug.description = 'Enter description here...';
    }
    const update = {
      description: this.bug.description
    }
    this.updateBug = this.bugService.updateBug(this.bug._id, update).subscribe();
  }

  ngOnDestroy(): void {
    if(this.updateBug) {
      this.updateBug.unsubscribe();
    }
  }
}
