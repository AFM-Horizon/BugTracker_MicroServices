import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginFormComponent } from './login-form.component';
import { RouterTestingModule } from '@angular/router/testing';
import { BugService } from 'src/app/bugs/index-bug';
import { UserService } from 'src/app/shared/user.service';
import { AuthMessagingService } from '../auth-messaging.service';
import { AuthService } from '../../shared/auth.service';

describe('LoginFormComponent', () => {
  let component: LoginFormComponent;
  let fixture: ComponentFixture<LoginFormComponent>;
  let mockAuthService: jasmine.SpyObj<AuthService>;
  let mockUserService: jasmine.SpyObj<UserService>;
  let mockAuthMessagingService: jasmine.SpyObj<AuthMessagingService>;

  beforeEach(async () => {
    mockUserService = jasmine.createSpyObj(['getUser']);
    mockAuthMessagingService = jasmine.createSpyObj(['getAnimationState','setAnimationState', 'getMessage', 'setMessage']);
    mockAuthService = jasmine.createSpyObj(['loginUser', 'logoutUser', 'registerUser']);

    await TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes([])],
      declarations: [ LoginFormComponent ],
      providers: [
        { provide: AuthService, useValue: mockAuthService },
        { provide: UserService, useValue: mockUserService },
        { provide: AuthMessagingService, useValue: mockAuthMessagingService }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
