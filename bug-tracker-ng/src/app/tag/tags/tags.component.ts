import { Component, Input, OnInit, Output, EventEmitter, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { Bug } from 'src/app/models/bug';
import { Tag } from '../../models/tag';
import { TagServiceService } from './../tag-service.service';
import { BugService } from '../../shared/bug.service';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.scss']
})
export class TagsComponent implements OnInit, OnDestroy {
  @Input() bug: Bug;
  @Input() isEntry: boolean;
  tags$: Observable<Tag[]>;
  subscription: Subscription;

  constructor(private tagService: TagServiceService) { }

  ngOnInit(): void {
    this.tagService.updateTagData(this.bug._id);
    this.tags$ = this.tagService.tags$;
  }

  deleteTag(tagId: string) {
    this.subscription = this.tagService.deleteTag(this.bug._id, tagId).subscribe();
  };

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    };
  }
}
