import { TestBed } from '@angular/core/testing';

import { ReportIdbService } from './report-idb.service';

describe('ReportIdbService', () => {
  let service: ReportIdbService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReportIdbService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
