import { TestBed } from '@angular/core/testing';

import { CGServiceService } from './cg-service.service';

describe('CGServiceService', () => {
  let service: CGServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CGServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
