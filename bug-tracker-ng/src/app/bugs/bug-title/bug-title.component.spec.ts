import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BugService } from '../../shared/bug.service';

import { BugTitleComponent } from './bug-title.component';
import { Bug } from './../../models/bug';
import { of } from 'rxjs';

describe('BugTitleComponent', () => {
  let component: BugTitleComponent;
  let fixture: ComponentFixture<BugTitleComponent>;
  let mockBugService: jasmine.SpyObj<BugService>;

  beforeEach(async () => {
    mockBugService = jasmine.createSpyObj(['getBugById', 'updateBug','addBug', 'updateBugData']);

    await TestBed.configureTestingModule({
      declarations: [ BugTitleComponent ],
      providers: [{ provide: BugService, useValue: mockBugService }]
    })
    .compileComponents();
  });

  beforeEach(() => {
    const bug: Bug = {
      name: 'test',
      author: 'test',
      status: 'test',
      workspace: 'test'
    };
    fixture = TestBed.createComponent(BugTitleComponent);
    component = fixture.componentInstance;
    component.bug = bug;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update bug when saving title', () => {
    mockBugService.updateBug.and.returnValue(of());
    component.saveTitle();
    expect(mockBugService.updateBug).toHaveBeenCalledTimes(1);
  });

  it('should not update bug when title is empty', () => {
    component.bug.name = '';
    mockBugService.updateBug.and.returnValue(of());
    component.saveTitle();
    expect(mockBugService.updateBug).toHaveBeenCalledTimes(0);
  });

  it('should show edit title', () => {
    const compiled =  fixture.nativeElement;
    component.showEditTitle();
    fixture.detectChanges();
    expect(compiled.querySelector('input')).toBeTruthy();
  })
});
