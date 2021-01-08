import { TestBed } from '@angular/core/testing';

import { AuthRouteGuardGuard } from './auth-route-guard.guard';
import { TokenService } from './shared/token.service';
import { UserMessagingService } from './shared/user-messaging.service';

describe('AuthRouteGuardGuard', () => {
  let guard: AuthRouteGuardGuard;
  let mockTokenService: jasmine.SpyObj<TokenService>;
  let mockMessagingService: jasmine.SpyObj<UserMessagingService>;

  beforeEach(() => {
    mockTokenService = jasmine.createSpyObj<TokenService>(['getAccessToken']);
    mockMessagingService = jasmine.createSpyObj<UserMessagingService>(['setMessage', 'clearMessage', 'getMessage']);

    TestBed.configureTestingModule({
      providers: [
        { provide: TokenService, useValue: mockTokenService },
        { provide: UserMessagingService, useValue: mockMessagingService }
      ]
    });
    guard = TestBed.inject(AuthRouteGuardGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
