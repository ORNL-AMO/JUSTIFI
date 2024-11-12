import { TestBed } from '@angular/core/testing';

import { AssessmentEnergyOpportunitiesFormService } from './assessment-energy-opportunities-form.service';
import { EnergyOpportunityIdbService } from 'src/app/indexed-db/energy-opportunity-idb.service';

describe('AssessmentEnergyOpportunitiesFormService', () => {
  let service: AssessmentEnergyOpportunitiesFormService;
  let energyOpportunityIdbService: Partial<EnergyOpportunityIdbService> = {};

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{ provide: EnergyOpportunityIdbService, useValue: energyOpportunityIdbService }]
    });
    service = TestBed.inject(AssessmentEnergyOpportunitiesFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
