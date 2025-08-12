import { TestBed } from '@angular/core/testing';

import { EnergyOpportunityIdbService } from './energy-opportunity-idb.service';
import { NgxIndexedDBService } from 'ngx-indexed-db';
import { AnalyticsService } from '../analytics/analytics.service';

describe('EnergyOpportunityIdbService', () => {
  let service: EnergyOpportunityIdbService;
  let dbService: Partial<NgxIndexedDBService> = {}
  let analyticsService: Partial<AnalyticsService> = {}
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: NgxIndexedDBService, useValue: dbService },
        { provide: AnalyticsService, useValue: analyticsService }
      ]
    });
    service = TestBed.inject(EnergyOpportunityIdbService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
