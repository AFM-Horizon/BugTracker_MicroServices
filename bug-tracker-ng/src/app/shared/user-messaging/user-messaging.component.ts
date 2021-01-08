import { ChangeDetectionStrategy, Component } from '@angular/core';
import { UserMessagingService } from './../user-messaging.service';

@Component({
  selector: 'app-user-messaging',
  templateUrl: './user-messaging.component.html',
  styleUrls: ['./user-messaging.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserMessagingComponent {
  constructor(private userMsgService: UserMessagingService) { }
  message$ = this.userMsgService.getMessage();
}
