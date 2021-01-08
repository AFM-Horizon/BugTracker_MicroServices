import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommentComponent } from '../comments/comment/comment.component';
import { CommentEntryComponent } from '../comments/comment-entry/comment-entry.component';
import { CommentListComponent } from '../comments/comment-list/comment-list.component';
import { CommentUpvoteComponent } from '../comments/comment-upvote/comment-upvote.component';
import { CommentService } from '../comments/comment.service';
import { SharedModule } from './../shared/shared.module';


@NgModule({
  declarations: [
    CommentComponent,
    CommentEntryComponent,
    CommentListComponent,
    CommentUpvoteComponent
  ],
  providers: [
    CommentService
  ],
  imports: [
    SharedModule,
    CommonModule
  ],
  exports: [
    CommentComponent,
    CommentEntryComponent,
    CommentListComponent,
    CommentUpvoteComponent
  ]
})
export class CommentsModule { }
