import { TestBed } from '@angular/core/testing';

import { PreAssessmentSetupService } from './pre-assessment-setup.service';
import { AssessmentIdbService } from 'src/app/indexed-db/assessment-idb.service';

describe('PreAssessmentSetupService', () => {
  let service: PreAssessmentSetupService;
  let assessmentIdbService: Partial<AssessmentIdbService> = {};

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: AssessmentIdbService, useValue: assessmentIdbService }
      ]
    });
    service = TestBed.inject(PreAssessmentSetupService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
