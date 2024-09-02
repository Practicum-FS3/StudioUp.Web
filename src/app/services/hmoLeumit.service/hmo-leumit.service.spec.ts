import { TestBed } from '@angular/core/testing';

import { HmoLeumitService } from './hmo-leumit.service';

describe('HmoLeumitService', () => {
  let service: HmoLeumitService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HmoLeumitService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
