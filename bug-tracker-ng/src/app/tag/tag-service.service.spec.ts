import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TagServiceService } from './tag-service.service';
import { BugService } from '../bugs/index-bug';

describe('TagServiceService', () => {
  let service: TagServiceService;
  let mockBugService: jasmine.SpyObj<BugService>;

  beforeEach(() => {
    const bugServiceSpy = jasmine.createSpyObj<BugService>(['getBugById', 'updateBug','addBug', 'updateBugData']);

    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      providers: [
        { provide: BugService, useValue: bugServiceSpy }
      ]
    });
    service = TestBed.inject(TagServiceService);
    mockBugService = TestBed.inject(BugService) as jasmine.SpyObj<BugService>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
