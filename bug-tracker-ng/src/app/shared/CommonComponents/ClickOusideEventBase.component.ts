import { ChangeDetectionStrategy, Component, ElementRef, Input, OnDestroy, OnInit } from "@angular/core";
import { fromEvent, Subscription } from 'rxjs';

@Component({
  selector: 'app-base-component',
  template: ''
})

export class BaseClickDetectorComponent implements OnInit, OnDestroy {
  @Input() isActive: boolean;
  clickEventSubscriber$: Subscription;
  
  constructor(private _eref: ElementRef) { }

  ngOnInit(): void {
    this.setHandler();
  }
  
  handleClick() {
    this.isActive = !this.isActive;
  }

  setHandler() {
    this.clickEventSubscriber$ = fromEvent(document, 'click').subscribe((event) => {
      if (!this._eref.nativeElement.contains(event.target)) {
        this.isActive = false;
        console.log("Click Outside Element Tag Entry!");
      }
      else {
        console.log("Click Inside Element! Tag Entry");
      }
    })
  }

  ngOnDestroy(): void {
    if (this.clickEventSubscriber$) {
      this.clickEventSubscriber$.unsubscribe();
    }
  }
}