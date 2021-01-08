import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { AuthMessagingService } from './../auth-messaging.service';

@Component({
  selector: 'app-auth-flash-msg',
  templateUrl: './auth-flash-msg.component.html',
  styleUrls: ['./auth-flash-msg.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AuthFlashMsgComponent {
  message$ = this.authMessageService.getMessage();
  constructor(private authMessageService: AuthMessagingService) { }
}
