import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { AuthMessagingService } from './../auth-messaging.service';
import { AuthService } from '../../shared/auth.service';
import { UserMessagingService } from './../../shared/user-messaging.service';
import { Subscription, Observable } from 'rxjs';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})

export class LoginFormComponent implements OnInit, OnDestroy {
  isAnimated$: Observable<boolean>;
  loginSubscription: Subscription;

  user = new FormGroup({
    username: new FormControl(),
    password: new FormControl()
  });

  constructor(
    private authMessagingService: AuthMessagingService,
    private authService: AuthService,
    private router: Router,
    private userMessagingService: UserMessagingService) { }

  ngOnInit(): void {
    this.setMessage('');
    this.isAnimated$ = this.authMessagingService.getAnimationState();
  }

  handleLogin() {
    const userObj: User = {
      username: this.user.value.username,
      password: this.user.value.password
    };

    this.loginSubscription = this.authService.loginUser(userObj).subscribe(
      () => {
        this.authMessagingService.setAnimationState(true);
        this.router.navigate(['workspace']);
      },
      (err) => {
        this.resetForm();
        if (err.status == 401) {
          return this.setMessage("Wrong Username Or Password");
        }
        else {
          return this.setMessage("");
        }
      }
    );
  }

  resetForm() {
    this.user.reset();
  };

  resetMessage() {
    this.userMessagingService.clearMessage();
    this.authMessagingService.setMessage('');
  };

  setMessage(message) {
    this.authMessagingService.setMessage(message);
  };

  emitAnimationData() {
    this.authMessagingService.setAnimationState(false);
    this.router.navigate(['/auth/register']);
  };

  ngOnDestroy(): void {
    if (this.loginSubscription) {
      this.loginSubscription.unsubscribe();
    }
  }
}
