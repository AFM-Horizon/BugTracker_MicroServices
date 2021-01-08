import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthMessagingService } from './../auth-messaging.service';
import { Router } from '@angular/router';
import { AuthService } from '../../shared/auth.service';
import { User } from '../../models/user';
import { Subscription, Observable } from 'rxjs';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss']
})
export class RegisterFormComponent implements OnInit, OnDestroy {
  isAnimated$: Observable<boolean>
  subscriptions: Subscription[] = [];

  user = new FormGroup({
    username: new FormControl(),
    password: new FormControl()
  });

  constructor(private authMessagingService: AuthMessagingService, private router: Router, private authService: AuthService, private routerBasic: Router) { }

  ngOnInit(): void {
    this.setMessage('');
    this.isAnimated$ = this.authMessagingService.getAnimationState();
  }

  handleRegistration() {
    const userObj: User = {
      username: this.user.value.username,
      password: this.user.value.password
    };

    this.subscriptions.push(
      this.authService.registerUser(userObj).subscribe(() => {
        this.authMessagingService.setAnimationState(true);
        this.routerBasic.navigate(['auth/login']);
        this.resetForm();
      },
        () => {
          this.setMessage('Sorry, this username is already taken!');
        }
      )
    );
  }

  resetForm() {
    this.user = undefined;
  };

  resetMessage() {
    this.authMessagingService.setMessage('');
  };

  setMessage(message) {
    this.authMessagingService.setMessage(message);
  };

  emitAnimationData() {
    this.authMessagingService.setAnimationState(false);
    this.router.navigate(['/auth/login']);
  };

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => {
      if (sub) {
        sub.unsubscribe();
      }
    });
  }
}
