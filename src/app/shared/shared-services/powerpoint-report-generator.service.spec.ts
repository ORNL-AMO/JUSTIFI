import { TestBed } from '@angular/core/testing';

import { PowerpointReportGeneratorService } from './powerpoint-report-generator.service';

describe('PowerpointReportGeneratorService', () => {
  let service: PowerpointReportGeneratorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PowerpointReportGeneratorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
