import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { CommentResponse } from './../../models/commentResponseModel';
import { CommentService } from './../comment.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnDestroy {
  @Input() comment: CommentResponse;
  @Input() bugId: string;
  isEditable: boolean = false;
  subscriptions: Subscription[] = [];

  constructor(private commentService: CommentService) { }

  handleDelete() {
    this.subscriptions.push(
      this.commentService.deleteComment(this.bugId, this.comment._id).subscribe()
    );
  }

  handleEdit() {
    this.isEditable = true;
  }

  editComment() {
    const comment = {
      comment: this.comment.comment
    }
    this.subscriptions.push(
      this.commentService.updateComment(this.bugId, this.comment._id, comment).subscribe()
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
