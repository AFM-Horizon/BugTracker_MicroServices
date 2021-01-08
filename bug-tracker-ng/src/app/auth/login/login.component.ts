import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { AuthMessagingService } from './../auth-messaging.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent implements OnInit {
  message$:Observable<string>;
  isAnimated$:Observable<boolean>;

  constructor(private authMessageService: AuthMessagingService) { }

  ngOnInit(): void {
    this.message$ = this.authMessageService.getMessage();
    this.isAnimated$ = this.authMessageService.getAnimationState();
  }
}
