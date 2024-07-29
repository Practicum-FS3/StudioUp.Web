import { TestBed } from '@angular/core/testing';

import { HmosService } from './hmos.service';

describe('HmosService', () => {
  let service: HmosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HmosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
