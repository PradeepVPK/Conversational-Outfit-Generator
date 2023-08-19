import { TestBed } from '@angular/core/testing';

import { StabilityApiService } from './stability-api.service';

describe('StabilityApiService', () => {
  let service: StabilityApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StabilityApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
