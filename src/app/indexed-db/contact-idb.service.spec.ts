import { TestBed } from '@angular/core/testing';

import { ContactIdbService } from './contact-idb.service';
import { NgxIndexedDBService } from 'ngx-indexed-db';
import { AnalyticsService } from '../analytics/analytics.service';

describe('ContactIdbService', () => {
  let service: ContactIdbService;

  beforeEach(() => {
    let dbService: Partial<NgxIndexedDBService> = {}
    let analyticsService: Partial<AnalyticsService> = {}
    TestBed.configureTestingModule({
      providers: [
        { provide: NgxIndexedDBService, useValue: dbService },
        { provide: AnalyticsService, useValue: analyticsService }
      ]
    });
    service = TestBed.inject(ContactIdbService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
