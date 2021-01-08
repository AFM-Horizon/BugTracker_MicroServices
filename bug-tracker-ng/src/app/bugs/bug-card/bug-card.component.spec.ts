import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { BugModalStateService } from 'src/app/shared/bug-modal-state.service';
import { Bug } from 'src/app/models/bug';
import { BugCardComponent } from './bug-card.component';

describe('BugCardComponent', () => {
  let component: BugCardComponent;
  let router: Router;
  let fixture: ComponentFixture<BugCardComponent>;
  let mockModalStateService: jasmine.SpyObj<BugModalStateService>;

  beforeEach(async () => {
    mockModalStateService = jasmine.createSpyObj<BugModalStateService>(['openModal', 'closeModal', 'getModalState', 'setBugEditState', 'getBugEditState']);

    await TestBed.configureTestingModule({
      imports: [ RouterTestingModule.withRoutes([]) ],
      declarations: [ BugCardComponent ],
      providers: [ { provide: BugModalStateService, useValue: mockModalStateService}]
    })
    .compileComponents();
  });

  beforeEach(() => {
    const bug: Bug = {
      _id: 'test',
      name: 'test',
      status: 'test',
      author: 'test',
      comments: [],
      workspace: 'test'
    };
    fixture = TestBed.createComponent(BugCardComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    component.bug = bug;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set bug colour', () => {
    component.bug.status = 'Fixed';
    fixture.detectChanges();
    const jsonResult = component.setBugColour();
    expect(jsonResult).toEqual({ 'has-text-success': true });
  });

  it('should call openModal() on edit click', () => {
    component.handleEditClick();
    expect(mockModalStateService.openModal).toHaveBeenCalledTimes(1);
  });

  it('should navigate on edit click', () => {
    const navigationSpy = spyOn(router, 'navigate');
    component.handleEditClick();
    expect(navigationSpy).toHaveBeenCalledWith(['bugs/edit'], { state: { bugId: 'test' }}); 
  });
});
