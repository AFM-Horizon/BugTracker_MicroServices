import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { BugModalStateService } from 'src/app/shared/bug-modal-state.service';
import { UserService } from 'src/app/shared/user.service';
import { BugService } from '../index-bug';
import { BugComponent } from './bug.component';
import { Bug } from './../../models/bug';

describe('BugComponent', () => {
  let component: BugComponent;
  let fixture: ComponentFixture<BugComponent>;
  let mockBugService: jasmine.SpyObj<BugService>;
  let mockModalService: jasmine.SpyObj<BugModalStateService>;
  let mockUserService: jasmine.SpyObj<UserService>;

  beforeEach(async () => {
    const bugs: Bug[] = [
      {
        name: 'Created',
        status: 'Created',
        author: 'Created',
        workspace: 'test'
      },
      {
        name: 'Fixed',
        status: 'Fixed',
        author: 'Fixed',
        workspace: 'test'
      },
      {
        name: 'In-Progress',
        status: 'In-Progress',
        author: 'In-Progress',
        workspace: 'test'
      },
    ]

    mockBugService = jasmine.createSpyObj<BugService>(['getBugById', 'updateBug','addBug', 'updateBugData'], { 'bugs$': of(bugs) });
    mockModalService = jasmine.createSpyObj<BugModalStateService>(['getModalState', 'openModal', 'closeModal']);
    mockUserService = jasmine.createSpyObj<UserService>(['getUser']);

    await TestBed.configureTestingModule({
      declarations: [ BugComponent ],
      providers: [
        { provide: BugService, useValue: mockBugService },
        { provide: BugModalStateService, useValue: mockModalService },
        { provide: UserService, useValue: mockUserService }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    mockBugService.bugs$ = of()
    fixture = TestBed.createComponent(BugComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get modal state', () => {
    mockModalService.getModalState.and.returnValue(of(true));
    component.ngOnInit();
    expect(component.modalOpen$.subscribe((value) => {
      expect(value).toBeTrue();
    }));
  });

  it('should populate bug arrays', () => {
    expect(component.createdBugs.length).toBe(1);
    expect(component.createdBugs[0].status).toEqual('Created');
    expect(component.fixedBugs.length).toBe(1);
    expect(component.fixedBugs[0].status).toEqual('Fixed');
    expect(component.inProgressBugs.length).toBe(1);
    expect(component.inProgressBugs[0].status).toEqual('In-Progress');
  });
});
