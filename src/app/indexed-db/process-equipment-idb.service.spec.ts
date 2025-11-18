import { TestBed } from '@angular/core/testing';

import { ProcessEquipmentIdbService } from './process-equipment-idb.service';
import { NgxIndexedDBService } from 'ngx-indexed-db';
import { AnalyticsService } from '../analytics/analytics.service';

describe('ProcessEquipmentIdbService', () => {
  let service: ProcessEquipmentIdbService;

  let dbService: Partial<NgxIndexedDBService> = {}
  let analyticsService: Partial<AnalyticsService> = {}
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: NgxIndexedDBService, useValue: dbService },
        { provide: AnalyticsService, useValue: analyticsService }
      ]
    });
    service = TestBed.inject(ProcessEquipmentIdbService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
