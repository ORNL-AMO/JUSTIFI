import { TestBed } from '@angular/core/testing';

import { ReportIdbService } from './report-idb.service';
import { NgxIndexedDBService } from 'ngx-indexed-db';
import { AnalyticsService } from '../analytics/analytics.service';

describe('ReportIdbService', () => {
  let service: ReportIdbService;
  let dbService: Partial<NgxIndexedDBService> = {}
  let analyticsService: Partial<AnalyticsService> = {}
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: NgxIndexedDBService, useValue: dbService },
        { provide: AnalyticsService, useValue: analyticsService }
      ]
    });
    service = TestBed.inject(ReportIdbService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
