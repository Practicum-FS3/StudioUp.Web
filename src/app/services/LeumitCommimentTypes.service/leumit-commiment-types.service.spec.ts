import { TestBed } from '@angular/core/testing';

import { LeumitCommimentTypesService } from './leumit-commiment-types.service';

describe('LeumitCommimentTypesService', () => {
  let service: LeumitCommimentTypesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LeumitCommimentTypesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
