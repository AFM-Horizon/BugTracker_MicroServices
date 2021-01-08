import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Bug } from 'src/app/models/bug';
import { TagServiceService } from '../tag-service.service';

import { TagsComponent } from './tags.component';

describe('TagsComponent', () => {
  let component: TagsComponent;
  let fixture: ComponentFixture<TagsComponent>;
  let mockTagService: jasmine.SpyObj<TagServiceService>;

  beforeEach(async () => {
    mockTagService = jasmine.createSpyObj<TagServiceService>(["addTag", "deleteTag", "updateTagData"]);

    await TestBed.configureTestingModule({
      declarations: [ TagsComponent ],
      providers: [
        { provide: TagServiceService, useValue: mockTagService }
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

    fixture = TestBed.createComponent(TagsComponent);
    component = fixture.componentInstance;
    component.bug = bug;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
