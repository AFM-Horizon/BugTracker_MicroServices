import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { TagServiceService } from '../tag-service.service';

import { TagListComponent } from './tag-list.component';
import { Bug } from 'src/app/models/bug';

describe('TagListComponent', () => {
  let component: TagListComponent;
  let fixture: ComponentFixture<TagListComponent>;
  let mockTagService: jasmine.SpyObj<TagServiceService>;

  beforeEach(async () => {
    mockTagService = jasmine.createSpyObj<TagServiceService>(["addTag", "deleteTag", "updateTagData"], ["tags$"]);

    await TestBed.configureTestingModule({
      declarations: [ TagListComponent ],
      providers: [
        { provide: TagServiceService, useValue: mockTagService }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    const bug: Bug = {
      name: 'test',
      status: 'test',
      author: 'author',
      tags: [{ name: 'test', colour: 'red' }],
      workspace: 'test'
    };

    fixture = TestBed.createComponent(TagListComponent);
    component = fixture.componentInstance;
    component.bug = bug;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
