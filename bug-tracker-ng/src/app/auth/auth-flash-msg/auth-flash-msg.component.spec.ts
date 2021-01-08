import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { AuthMessagingService } from '../auth-messaging.service';

import { AuthFlashMsgComponent } from './auth-flash-msg.component';

describe('AuthFlashMsgComponent', () => {
  let component: AuthFlashMsgComponent;
  let fixture: ComponentFixture<AuthFlashMsgComponent>;
  let mockAuthMessagingService: jasmine.SpyObj<AuthMessagingService>;

  beforeEach(async () => {
    mockAuthMessagingService = jasmine.createSpyObj<AuthMessagingService>(['getMessage']);

    await TestBed.configureTestingModule({
      declarations: [ AuthFlashMsgComponent ],
      providers: [{ provide: AuthMessagingService, useValue: mockAuthMessagingService }]
    })
    .compileComponents();
  });

  beforeEach(() => {
    mockAuthMessagingService.getMessage.and.returnValue(of('test'));
    fixture = TestBed.createComponent(AuthFlashMsgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get message', () => {
    expect(mockAuthMessagingService.getMessage).toHaveBeenCalledTimes(1);
  });

  it('should show message', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('div')).toBeTruthy();
  })
});
