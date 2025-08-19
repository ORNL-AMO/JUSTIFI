import { TestBed } from '@angular/core/testing';

import { EnergyEquipmentIdbService } from './energy-equipment-idb.service';
import { NgxIndexedDBService } from 'ngx-indexed-db';
import { AnalyticsService } from '../analytics/analytics.service';

describe('EnergyEquipmentIdbService', () => {
  let service: EnergyEquipmentIdbService;

  let dbService: Partial<NgxIndexedDBService> = {}
  let analyticsService: Partial<AnalyticsService> = {}
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: NgxIndexedDBService, useValue: dbService },
        { provide: AnalyticsService, useValue: analyticsService }
      ]
    });
    service = TestBed.inject(EnergyEquipmentIdbService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
