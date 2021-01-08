import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NavbarComponent } from './navbar.component';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthService } from '../../shared/auth.service';
import { UserService } from '../user.service';
import { WorkspaceStateService } from '../workspace-state.service';
import { of } from 'rxjs';

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;
  let mockAuthService: jasmine.SpyObj<AuthService>;
  let mockUserService: jasmine.SpyObj<UserService>;
  let mockWorkspaceStateService: jasmine.SpyObj<WorkspaceStateService>;

  beforeEach(async () => {
    mockAuthService = jasmine.createSpyObj<AuthService>(['logoutUser']);
    mockUserService = jasmine.createSpyObj<UserService>(["getUser"]);
    mockWorkspaceStateService = jasmine.createSpyObj<WorkspaceStateService>(['getState', 'setState']);

    await TestBed.configureTestingModule({
      imports: [ RouterTestingModule ],
      declarations: [ NavbarComponent ],
      providers: [
        { provide: AuthService, useValue: mockAuthService },
        { provide: UserService, useValue: mockUserService },
        { provide: WorkspaceStateService, useValue: mockWorkspaceStateService }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    mockWorkspaceStateService.getState.and.returnValue(of({name: 'test', owner: 'test'}));
    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
