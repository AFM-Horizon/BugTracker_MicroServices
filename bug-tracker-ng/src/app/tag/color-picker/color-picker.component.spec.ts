import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TagServiceService } from '../tag-service.service';

import { ColorPickerComponent } from './color-picker.component';

describe('ColorPickerComponent', () => {
  let component: ColorPickerComponent;
  let fixture: ComponentFixture<ColorPickerComponent>;
  let mockTagService: jasmine.SpyObj<TagServiceService>;

  beforeEach(async () => {
    mockTagService = jasmine.createSpyObj<TagServiceService>(["addTag", "deleteTag", "updateTagData"]);
    await TestBed.configureTestingModule({
      declarations: [ ColorPickerComponent ],
      providers: [
        { provide: TagServiceService, useValue: mockTagService }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ColorPickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
