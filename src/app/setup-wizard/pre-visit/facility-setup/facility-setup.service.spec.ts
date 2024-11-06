import { TestBed } from '@angular/core/testing';

import { FacilitySetupService } from './facility-setup.service';

describe('FacilitySetupService', () => {
  let service: FacilitySetupService;
  let facilitySetupService: Partial<FacilitySetupService> = {};

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{ provide: FacilitySetupService, useValue: facilitySetupService }]
    });
    service = TestBed.inject(FacilitySetupService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
