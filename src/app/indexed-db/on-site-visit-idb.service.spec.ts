import { TestBed } from '@angular/core/testing';

import { OnSiteVisitIdbService } from './on-site-visit-idb.service';
import { NgxIndexedDBService } from 'ngx-indexed-db';
import { AnalyticsService } from '../analytics/analytics.service';

describe('OnSiteVisitIdbService', () => {
  let service: OnSiteVisitIdbService;

  let dbService: Partial<NgxIndexedDBService> = {};
  let analyticsService: Partial<AnalyticsService> = {};
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: NgxIndexedDBService, useValue: dbService },
        { provide: AnalyticsService, useValue: analyticsService }
      ]
    });
    service = TestBed.inject(OnSiteVisitIdbService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
