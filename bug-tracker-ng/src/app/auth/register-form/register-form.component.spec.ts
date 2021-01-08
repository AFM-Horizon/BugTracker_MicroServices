import { ComponentFixture, TestBed, tick } from '@angular/core/testing';
import { AuthMessagingService } from '../auth-messaging.service';
import { AuthService } from '../../shared/auth.service';
import { RouterTestingModule } from '@angular/router/testing';
import { RegisterFormComponent } from './register-form.component';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';

describe('RegisterFormComponent', () => {
  let component: RegisterFormComponent;
  let fixture: ComponentFixture<RegisterFormComponent>;
  let mockAuthMessagingService: jasmine.SpyObj<AuthMessagingService>;
  let mockAuthService: jasmine.SpyObj<AuthService>;
  let router: Router;

  beforeEach(async () => {
    mockAuthMessagingService = jasmine.createSpyObj<AuthMessagingService>(["getAnimationState", "setAnimationState", "getMessage", "setMessage"], ['isAnimation$', "message$"]);

    mockAuthService = jasmine.createSpyObj<AuthService>(["loginUser", "logoutUser", "registerUser"]);

    await TestBed.configureTestingModule({
      imports: [ RouterTestingModule ],
      declarations: [ RegisterFormComponent ],
      providers: [
        { provide: AuthMessagingService, useValue: mockAuthMessagingService },
        { provide: AuthService, useValue: mockAuthService }
      ]
    })
    .compileComponents();

    router = TestBed.inject(Router);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to login on registration', (done) => {
    mockAuthService.registerUser.and.returnValue(of(true));
    const routerSpy = spyOn(router, 'navigate');
    component.handleRegistration();
    expect(routerSpy).toHaveBeenCalledWith(['auth/login']);
    done();
  });

  it('should reset form on registration', () => {
    mockAuthService.registerUser.and.returnValue(of(true));
    const compiled = fixture.nativeElement;
    const usernameInput = compiled.querySelector('[formControlName=username]');
    const passwordInput = compiled.querySelector('[formControlName=password]');
    component.handleRegistration();
    expect(usernameInput.value).toBe('');
    expect(passwordInput.value).toBe('');
  });

  it('should show error message on failure', () => {
    mockAuthService.registerUser.and.returnValue(throwError('error'));
    component.handleRegistration();
    expect(mockAuthMessagingService.setMessage).toHaveBeenCalledWith('Sorry, this username is already taken!');
  });
});
