import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { UserService } from 'src/app/shared/user.service';
import { WorkspaceStateService } from 'src/app/shared/workspace-state.service';
import { BugService } from '../index-bug';

import { BugEntryComponent } from './bug-entry.component';

describe('BugEntryComponent', () => {
  let component: BugEntryComponent;
  let fixture: ComponentFixture<BugEntryComponent>;
  let mockBugService: jasmine.SpyObj<BugService>;
  let mockworkspaceStateService: jasmine.SpyObj<WorkspaceStateService>;
  let mockUserService: jasmine.SpyObj<UserService>;

  beforeEach(async () => {
    mockBugService = jasmine.createSpyObj<BugService>(['getBugById', 'updateBug','addBug', 'updateBugData']);
    mockworkspaceStateService = jasmine.createSpyObj<WorkspaceStateService>(['setState', 'getState']);
    mockUserService = jasmine.createSpyObj<UserService>(['getUser']);

    await TestBed.configureTestingModule({
      declarations: [ BugEntryComponent ],
      providers: [
        { provide: BugService, useValue: mockBugService },
        { provide: WorkspaceStateService, useValue: mockworkspaceStateService },
        { provide: UserService, useValue: mockUserService }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BugEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should save new bug', () => {
    mockworkspaceStateService.getState.and.returnValue(of({name: 'test', owner: 'test'}));
    mockUserService.getUser.and.returnValue(of({username: 'test', password: 'test'}));
    mockBugService.addBug.and.returnValue(of());
    component.title = 'test';
    component.saveNewBug();
    expect(mockBugService.addBug).toHaveBeenCalledTimes(1);
  });

  it('should not save new bug if title is empty', () => {
    mockBugService.addBug.and.returnValue(of());
    component.title = '';
    component.saveNewBug();
    expect(mockBugService.addBug).toHaveBeenCalledTimes(0);
  });

  it('should set show warning to true if title is empty', () => {
    component.title = '';
    component.saveNewBug();
    expect(component.showWarning).toBeTrue();
  });

  it('should display warning if title is empty', () => {
    const compiled =  fixture.nativeElement;
    component.title = '';
    component.saveNewBug();
    component.showInput();
    fixture.detectChanges();
    expect(compiled.querySelector('.notification.is-warning')).toBeTruthy();
  });

  it('should no longer show warning when closeFlash() is called', () => {
    component.cancelEntry();
    expect(component.title).toBe('');
    expect(component.isInput).toBeFalse();
    expect(component.showWarning).toBeFalse();
  });
});
