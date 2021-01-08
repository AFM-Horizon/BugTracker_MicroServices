import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { CommentService } from './../comment.service';
import { Observable } from 'rxjs';
import { Bug } from 'src/app/models/bug';
import { CommentResponse } from '../../models/commentResponseModel';

@Component({
  selector: 'app-comment-list',
  templateUrl: './comment-list.component.html',
  styleUrls: ['./comment-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CommentListComponent implements OnInit {
  @Input() bug: Bug
  comments$ = this.commentService.allComments$

  constructor(private commentService: CommentService) { }

  ngOnInit(): void {
    this.commentService.updateCommentData(this.bug._id);
  }
}
