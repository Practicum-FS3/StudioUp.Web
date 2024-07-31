import { TestBed } from '@angular/core/testing';

import { PersonalAreaHMOServiceService } from './personal-area-hmo.service.service';

describe('PersonalAreaHMOServiceService', () => {
  let service: PersonalAreaHMOServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PersonalAreaHMOServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
