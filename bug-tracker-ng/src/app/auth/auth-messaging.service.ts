import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable()
export class AuthMessagingService {
  private isAnimation = new BehaviorSubject<boolean>(true);
  isAnimation$ = this.isAnimation.asObservable();
  private message = new BehaviorSubject<string>('');
  message$ = this.message.asObservable();

  getAnimationState(): Observable<boolean> {
    return this.isAnimation$;
  }

  setAnimationState(isAnimated: boolean): void {
    this.isAnimation.next(isAnimated);
  }

  getMessage(): Observable<string> {
    return this.message$;
  }

  setMessage(message: string): void {
    this.message.next(message);
  }
}