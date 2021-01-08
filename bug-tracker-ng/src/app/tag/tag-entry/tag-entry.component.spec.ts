import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TagEntryComponent } from './tag-entry.component';

describe('TagEntryComponent', () => {
  let component: TagEntryComponent;
  let fixture: ComponentFixture<TagEntryComponent>;

  beforeEach(async () => {

    await TestBed.configureTestingModule({
      declarations: [ TagEntryComponent ],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TagEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should unsubscribe on destroy', () => {
    const setHandlerSpy = spyOn(component, "setHandler");
    component.ngOnInit();

    expect(setHandlerSpy).toHaveBeenCalledTimes(1);
    expect(component.clickEventSubscriber$.closed).toBeFalse();
    component.ngOnDestroy();
    expect(component.clickEventSubscriber$.closed).toBeTrue();
  });

  it('should toggle isActive on click', () => {
    component.isActive = false;
    component.handleClick();
    expect(component.isActive).toBeTrue();
  });
});
