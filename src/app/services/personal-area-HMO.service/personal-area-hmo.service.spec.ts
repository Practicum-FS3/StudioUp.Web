import { TestBed } from '@angular/core/testing';

import { PersonalAreaHMOService } from './personal-area-hmo.service';

describe('PersonalAreaHMOServiceService', () => {
  let service: PersonalAreaHMOService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PersonalAreaHMOService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
