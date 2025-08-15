import { TestBed } from '@angular/core/testing';

import { CompanyIdbService } from './company-idb.service';
import { NgxIndexedDBService } from 'ngx-indexed-db';
import { AnalyticsService } from '../analytics/analytics.service';

describe('CompanyIdbService', () => {
  let service: CompanyIdbService;

  let dbService: Partial<NgxIndexedDBService> = {}
  let analyticsService: Partial<AnalyticsService> = {}
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: NgxIndexedDBService, useValue: dbService },
        { provide: AnalyticsService, useValue: analyticsService }
      ]
    });
    service = TestBed.inject(CompanyIdbService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
