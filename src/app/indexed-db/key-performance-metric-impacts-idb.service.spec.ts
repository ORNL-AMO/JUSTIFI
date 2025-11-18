import { TestBed } from '@angular/core/testing';

import { KeyPerformanceMetricImpactsIdbService } from './key-performance-metric-impacts-idb.service';
import { NgxIndexedDBService } from 'ngx-indexed-db';
import { AnalyticsService } from '../analytics/analytics.service';

describe('KeyPerformanceMetricImpactsIdbService', () => {
  let service: KeyPerformanceMetricImpactsIdbService;

  let dbService: Partial<NgxIndexedDBService> = {}
  let analyticsService: Partial<AnalyticsService> = {}
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: NgxIndexedDBService, useValue: dbService },
        { provide: AnalyticsService, useValue: analyticsService }
      ]
    });
    service = TestBed.inject(KeyPerformanceMetricImpactsIdbService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
