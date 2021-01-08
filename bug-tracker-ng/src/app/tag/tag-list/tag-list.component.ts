import { Component, Input, OnInit, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { Bug } from 'src/app/models/bug';
import { TagServiceService } from './../tag-service.service';
import { Observable, Subscription } from 'rxjs';
import { Tag } from 'src/app/models/tag';

@Component({
  selector: 'app-tag-list',
  templateUrl: './tag-list.component.html',
  styleUrls: ['./tag-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TagListComponent implements OnDestroy {
  @Input() bug: Bug
  subscription: Subscription;

  constructor(private tagService: TagServiceService) { }

  deleteTag(tagId: string) {
    this.subscription = this.tagService.deleteTag(this.bug._id, tagId).subscribe();
  };

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    };
  }
}
