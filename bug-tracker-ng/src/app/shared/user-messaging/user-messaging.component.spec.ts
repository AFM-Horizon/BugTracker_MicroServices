import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserMessagingService } from '../user-messaging.service';

import { UserMessagingComponent } from './user-messaging.component';

describe('UserMessagingComponent', () => {
  let component: UserMessagingComponent;
  let fixture: ComponentFixture<UserMessagingComponent>;
  let mockMessagingService: jasmine.SpyObj<UserMessagingService>;

  beforeEach(async () => {
    mockMessagingService = jasmine.createSpyObj<UserMessagingService>(['setMessage', 'clearMessage', 'getMessage']);

    await TestBed.configureTestingModule({
      declarations: [ UserMessagingComponent ],
      providers: [
        { provide: UserMessagingService, useValue: mockMessagingService }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserMessagingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
