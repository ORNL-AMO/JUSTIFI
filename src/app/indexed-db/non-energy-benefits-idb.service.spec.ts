import { TestBed } from '@angular/core/testing';

import { NonEnergyBenefitsIdbService } from './non-energy-benefits-idb.service';
import { NgxIndexedDBService } from 'ngx-indexed-db';
import { AnalyticsService } from '../analytics/analytics.service';

describe('NonEnergyBenefitsIdbService', () => {
  let service: NonEnergyBenefitsIdbService;

  let dbService: Partial<NgxIndexedDBService> = {}
  let analyticsService: Partial<AnalyticsService> = {}
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: NgxIndexedDBService, useValue: dbService },
        { provide: AnalyticsService, useValue: analyticsService }
      ]
    });
    service = TestBed.inject(NonEnergyBenefitsIdbService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
