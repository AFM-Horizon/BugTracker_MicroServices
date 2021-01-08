import { Component, Input, OnInit } from '@angular/core';
import { faBug, faEdit, faComment } from '@fortawesome/free-solid-svg-icons';
import { Bug } from '../../models/bug';
import { BugModalStateService } from '../../shared/bug-modal-state.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-bug-card',
  templateUrl: './bug-card.component.html',
  styleUrls: ['./bug-card.component.scss']
})
export class BugCardComponent {
  @Input() bug: Bug;

  faBug = faBug;
  faEdit = faEdit;
  faComment = faComment;

  constructor(private modalService: BugModalStateService, private router: Router) { }

  setBugColour() {
    if(this.bug.status === "Created") {
      return { 'has-text-danger': true }
    }
    if(this.bug.status === "In-Progress") {
      return { 'has-text-warning': true }
    }
    if(this.bug.status === "Fixed") {
      return { 'has-text-success': true }
    }
  }

  handleEditClick() {
    this.modalService.setBugEditState(this.bug);
    this.modalService.openModal();
    this.router.navigate([`bugs/edit`], { state: { bugId: this.bug._id }});
  }
}
