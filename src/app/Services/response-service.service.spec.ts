import { TestBed } from '@angular/core/testing';

import { ResponseServiceService } from './response-service.service';

describe('ResponseServiceService', () => {
  let service: ResponseServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ResponseServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
