import { TestBed } from '@angular/core/testing';

import { AnalyticsDataDbService } from './analytics-data-db.service';
import { NgxIndexedDBService } from 'ngx-indexed-db';
import { AnalyticsService } from '../analytics/analytics.service';

describe('AnalyticsDataDbService', () => {
  let service: AnalyticsDataDbService;

  let dbService: Partial<NgxIndexedDBService> = {}
  let analyticsService: Partial<AnalyticsService> = {}
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: NgxIndexedDBService, useValue: dbService },
        { provide: AnalyticsService, useValue: analyticsService }
      ]
    });
    service = TestBed.inject(AnalyticsDataDbService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
