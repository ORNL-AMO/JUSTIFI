import { TestBed } from '@angular/core/testing';

import { PowerpointReportGeneratorService } from './powerpoint-report-generator.service';
import { stubServiceProviders } from 'src/app/spec-helpers/spec-test-service-stub';

describe('PowerpointReportGeneratorService', () => {
  let service: PowerpointReportGeneratorService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: stubServiceProviders
    });
    service = TestBed.inject(PowerpointReportGeneratorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
