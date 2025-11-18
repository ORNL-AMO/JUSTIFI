import { TestBed } from '@angular/core/testing';

import { FacilityIdbService } from './facility-idb.service';
import { NgxIndexedDBService } from 'ngx-indexed-db';
import { AnalyticsService } from '../analytics/analytics.service';

describe('FacilityIdbService', () => {
  let service: FacilityIdbService;

  beforeEach(() => {
    let dbService: Partial<NgxIndexedDBService> = {}
    let analyticsService: Partial<AnalyticsService> = {}
    TestBed.configureTestingModule({
      providers: [
        { provide: NgxIndexedDBService, useValue: dbService },
        { provide: AnalyticsService, useValue: analyticsService }
      ]
    });
    service = TestBed.inject(FacilityIdbService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
