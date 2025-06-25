import { TestBed } from '@angular/core/testing';

import { AnalyticsDataDbService } from './analytics-data-db.service';
import { NgxIndexedDBService } from 'ngx-indexed-db';

describe('AnalyticsDataDbService', () => {
  let service: AnalyticsDataDbService;

  let dbService: Partial<NgxIndexedDBService> = {}
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: NgxIndexedDBService, useValue: dbService }
      ]
    });
    service = TestBed.inject(AnalyticsDataDbService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
