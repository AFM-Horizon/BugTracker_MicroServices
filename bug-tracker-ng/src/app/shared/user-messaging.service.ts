import { Injectable } from "@angular/core";
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class UserMessagingService {
  message$: BehaviorSubject<string> = new BehaviorSubject<string>('');

  setMessage(message: string): void {
    this.message$.next(message);
  }

  getMessage(): BehaviorSubject<string> {
    return this.message$;
  }

  clearMessage(): void {
    this.message$.next('');
  }
}