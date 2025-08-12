import { TestBed } from '@angular/core/testing';

import { KeyPerformanceIndicatorsIdbService } from './key-performance-indicators-idb.service';
import { NgxIndexedDBService } from 'ngx-indexed-db';
import { AnalyticsService } from '../analytics/analytics.service';

describe('KeyPerformanceIndicatorsIdbService', () => {
  let service: KeyPerformanceIndicatorsIdbService;

  let dbService: Partial<NgxIndexedDBService> = {}
  let analyticsService: Partial<AnalyticsService> = {}
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: NgxIndexedDBService, useValue: dbService },
        { provide: AnalyticsService, useValue: analyticsService }
      ]
    });
    service = TestBed.inject(KeyPerformanceIndicatorsIdbService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
