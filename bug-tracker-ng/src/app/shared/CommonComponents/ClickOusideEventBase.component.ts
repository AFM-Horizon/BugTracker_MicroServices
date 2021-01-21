import { Component, ElementRef, Input, OnDestroy, OnInit } from "@angular/core";
import { Subject, BehaviorSubject, fromEvent } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-base-component',
  template: ''
})

export class BaseClickDetectorComponent implements OnInit, OnDestroy {
  @Input() private isActive: boolean;
  protected stop$: Subject<void> = new Subject();
  clickSubject$: BehaviorSubject<boolean>;
  
  constructor(private _eref: ElementRef) { }

  ngOnInit(): void {
    this.clickSubject$ = new BehaviorSubject(this.isActive);
    this.setHandler();
  }
  
  handleClick() {
    this.clickSubject$.pipe(take(1)).subscribe((value) => {
      this.clickSubject$.next(!value);
    });
  }

  setHandler() {
    fromEvent(document, 'click').pipe(takeUntil(this.stop$)).subscribe((event) => {
      if (!this._eref.nativeElement.contains(event.target)) {
        this.clickSubject$.next(false);
      }
    })
  }

  ngOnDestroy(): void {
    this.stop$.next();
    this.stop$.complete();
  }
}