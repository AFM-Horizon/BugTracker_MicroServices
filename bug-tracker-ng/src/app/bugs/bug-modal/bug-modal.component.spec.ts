import { ComponentFixture, inject, TestBed } from '@angular/core/testing';
import { BugModalComponent } from './bug-modal.component';
import { BugService } from '../../shared/bug.service';
import { BugModalStateService } from 'src/app/shared/bug-modal-state.service';
import { UserService } from 'src/app/shared/user.service';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { of } from 'rxjs';
import { Bug } from 'src/app/models/bug';

describe('BugModalComponent', () => {
  let component: BugModalComponent;
  let fixture: ComponentFixture<BugModalComponent>;
  let router: Router;
  let mockBugService: jasmine.SpyObj<BugService>;
  let mockModalService: jasmine.SpyObj<BugModalStateService>;
  let mockUserService: jasmine.SpyObj<UserService>;

  beforeEach(async () => {
    mockBugService = jasmine.createSpyObj(['getBugById', 'updateBug','addBug', 'updateBugData']);
    mockModalService = jasmine.createSpyObj<BugModalStateService>(['getModalState', 'openModal', 'closeModal', 'setBugEditState', 'getBugEditState']);
    mockUserService = jasmine.createSpyObj(['getUser']);

    await TestBed.configureTestingModule({
      imports: [ RouterTestingModule.withRoutes([]) ],
      declarations: [ BugModalComponent ],
      providers: [
        { provide: BugService, useValue: mockBugService },
        { provide: BugModalStateService, useValue: mockModalService },
        { provide: UserService, useValue: mockUserService }
      ]
    })
    .compileComponents();

    router = TestBed.inject(Router);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BugModalComponent);
    component = fixture.componentInstance;
    history.pushState('test', 'bugId');
    mockModalService.getBugEditState.and.returnValue(of('testId'));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  
  it('should navigate on modal close', () => {
    const routerSpy = spyOn(router, 'navigate');
    component.closeModal();
    expect(routerSpy).toHaveBeenCalledWith(['bugs']);
  });
  
  it('should call modal service on modal close', () => {
    component.closeModal();
    expect(mockModalService.closeModal).toHaveBeenCalledTimes(1);
  });

  it('should set bug colour', () => {
    const bug: Bug = {
      _id: 'test',
      name: 'test',
      status: 'Created',
      author: 'test',
      comments: [],
      workspace: 'test'
    };
    fixture.detectChanges();
    const jsonResult = component.setBugColour(bug);
    expect(jsonResult).toEqual({ 'has-text-danger': true });
  });
  
  it('should call bug service on startup', () => {
    const bug: Bug = {
      _id: 'test',
      name: 'test',
      status: 'test',
      author: 'test',
      comments: [],
      workspace: 'test'
    };
    mockBugService.getBugById.and.returnValue(of(bug));

    component.ngOnInit();

    expect(mockBugService.getBugById).toHaveBeenCalled();
    component.bug$.subscribe((bugResult) => {
      expect(bugResult).toEqual(bug);
    })
  });

  it('should call user service on startup', () => {
    const user: User = {
      username: 'test',
      password: 'test'
    };
    mockUserService.getUser.and.returnValue(of(user));

    component.ngOnInit();

    expect(mockUserService.getUser).toHaveBeenCalledTimes(2);
    component.user$.subscribe((userResult) => {
      expect(userResult.username).toEqual(user.username);
    });
  });
});
