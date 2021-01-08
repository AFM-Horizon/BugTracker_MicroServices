import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { faCaretUp } from '@fortawesome/free-solid-svg-icons';
import { CommentResponse } from './../../models/commentResponseModel';
import { CommentService } from './../comment.service';
import { User } from './../../models/user';
import { UserService } from './../../shared/user.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-comment-upvote',
  templateUrl: './comment-upvote.component.html',
  styleUrls: ['./comment-upvote.component.scss']
})
export class CommentUpvoteComponent implements OnInit, OnDestroy {
  @Input() comment: CommentResponse;
  @Input() bugId: string;
  user: User;
  isUpvoted: boolean;
  subscriptions: Subscription[] = [];

  faCaretUp = faCaretUp;

  constructor(private commentService: CommentService, private userService: UserService) { }

  ngOnInit(): void {
    this.subscriptions.push(
      this.userService.getUser().subscribe((user) => {
        this.user = user;
      })
    );
  }

  handleUpvote() {
    let likes: {user: string}[];
    const res = this.comment.likes.find(x => x.user === this.user.id);
    
    if (res) {
      likes = this.comment.likes
      .filter(x => x.user !== this.user.id);
      this.isUpvoted = false;       
    }
    else {
      likes = this.comment.likes;
      likes.push({user: this.user.id});
      this.isUpvoted = true;
    }
    
    const update = {
      likes: likes
    }
    
    this.subscriptions.push(
      this.commentService.updateComment(this.bugId, this.comment._id, update).subscribe()
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
  