import { TestBed } from '@angular/core/testing';

import { AssessmentIdbService } from './assessment-idb.service';
import { NgxIndexedDBService } from 'ngx-indexed-db';
import { AnalyticsService } from '../analytics/analytics.service';

describe('AssessmentIdbService', () => {
  let service: AssessmentIdbService;

  let dbService: Partial<NgxIndexedDBService> = {}
  let analyticsService: Partial<AnalyticsService> = {}
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: NgxIndexedDBService, useValue: dbService },
        { provide: AnalyticsService, useValue: analyticsService }
      ]
    });
    service = TestBed.inject(AssessmentIdbService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
