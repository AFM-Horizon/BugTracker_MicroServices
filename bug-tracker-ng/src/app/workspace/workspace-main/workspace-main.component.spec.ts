import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserService } from 'src/app/shared/user.service';
import { WorkspaceStateService } from 'src/app/shared/workspace-state.service';
import { WorkspaceService } from '../workspace.service';

import { WorkspaceMainComponent } from './workspace-main.component';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

describe('WorkspaceMainComponent', () => {
  let component: WorkspaceMainComponent;
  let fixture: ComponentFixture<WorkspaceMainComponent>;
  let mockWorkspaceService: jasmine.SpyObj<WorkspaceService>;
  let mockUserService: jasmine.SpyObj<UserService>;
  let mockWorkspaceStateService: jasmine.SpyObj<WorkspaceStateService>;

  beforeEach(async () => {
    mockWorkspaceService = jasmine.createSpyObj<WorkspaceService>(['getAll', 'getSingleWorkspace', 'createWorkspace', 'updateWorkspace']);
    mockUserService = jasmine.createSpyObj<UserService>(['getUser']);
    mockWorkspaceStateService = jasmine.createSpyObj<WorkspaceStateService>(['setState', 'getState']);

    await TestBed.configureTestingModule({
      imports: [ RouterTestingModule.withRoutes([]) ],
      declarations: [ WorkspaceMainComponent ],
      providers: [
        { provide: WorkspaceService, useValue: mockWorkspaceService },
        { provide: UserService, useValue: mockUserService },
        { provide: WorkspaceStateService, useValue: mockWorkspaceStateService }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkspaceMainComponent);
    component = fixture.componentInstance;
    mockUserService.getUser.and.returnValue(of({username: 'test', password: 'test'}));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
