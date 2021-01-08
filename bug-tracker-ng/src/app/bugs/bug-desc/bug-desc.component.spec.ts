import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { Bug } from 'src/app/models/bug';
import { BugService } from '../index-bug';
import { BugDescComponent } from './bug-desc.component';

describe('BugDescComponent', () => {
  let component: BugDescComponent;
  let fixture: ComponentFixture<BugDescComponent>;
  let mockBugService: jasmine.SpyObj<BugService>;

  beforeEach(async () => {
    mockBugService = jasmine.createSpyObj(['getBugById', 'updateBug','addBug', 'updateBugData']);

    await TestBed.configureTestingModule({
      declarations: [ BugDescComponent ],
      providers: [{ provide: BugService, useValue: mockBugService }]
    })
    .compileComponents();
  });

  beforeEach(() => {
    const bug: Bug = {
      name: 'test',
      author: 'test',
      status: 'test',
      description: 'test',
      workspace: 'test'
    };
    fixture = TestBed.createComponent(BugDescComponent);
    component = fixture.componentInstance;
    component.bug = bug;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should start with isEdit false', () => {
    expect(component.isEdit).toBeFalse();
  });

  it('should set isEdit true on showEditClick() call', () => {
    component.showEditDesc();
    expect(component.isEdit).toBeTrue();
  });

  it('should not render textarea on load', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('textarea')).toBeNull();
  });

  it('should render textarea if isEdit', () => {
    const compiled = fixture.nativeElement;
    component.showEditDesc();
    fixture.detectChanges();
    expect(compiled.querySelector('textarea')).toBeTruthy();
  });

  it('should update bug when saveDesc() called', () => {
    mockBugService.updateBug.and.returnValue(of());
    component.saveDesc();
    expect(mockBugService.updateBug).toHaveBeenCalledTimes(1);
  });

  it('should not update bug when description is empty', () => {
    mockBugService.updateBug.and.returnValue(of());
    component.bug.description = '';
    component.saveDesc();
    expect(mockBugService.updateBug).toHaveBeenCalledTimes(0);
  });

  it('should display message when description is empty', () => {
    const compiled = fixture.nativeElement;
    mockBugService.updateBug.and.returnValue(of());

    component.bug.description = '';
    component.saveDesc();
    fixture.detectChanges();
    const description = compiled.querySelector('#description');
    
    expect(description.innerHTML).toBe('Enter description here...');
  })
});
