import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Bug } from 'src/app/models/bug';
import { CommentResponse } from 'src/app/models/commentResponseModel';
import { CommentService } from '../comment.service';

import { CommentListComponent } from './comment-list.component';

describe('CommentListComponent', () => {
  let component: CommentListComponent;
  let fixture: ComponentFixture<CommentListComponent>;
  let mockCommentService: jasmine.SpyObj<CommentService>;

  beforeEach(async () => {
    mockCommentService = jasmine.createSpyObj<CommentService>(['addComment', 'deleteComment', 'updateComment', 'updateCommentData'], ['allComments$']);

    await TestBed.configureTestingModule({
      declarations: [ CommentListComponent ],
      providers: [
        { provide: CommentService, useValue: mockCommentService }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    const bug: Bug = {
      _id: 'test',
      name: 'test',
      author: 'test',
      status: 'test',
      workspace: 'test'
    }
    fixture = TestBed.createComponent(CommentListComponent);
    component = fixture.componentInstance;
    component.bug = bug;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
