import { TestBed } from '@angular/core/testing';

import { ReportIdbService } from './report-idb.service';
import { NgxIndexedDBService } from 'ngx-indexed-db';

describe('ReportIdbService', () => {
  let service: ReportIdbService;
  let dbService: Partial<NgxIndexedDBService> = {}
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: NgxIndexedDBService, useValue: dbService }
      ]
    });
    service = TestBed.inject(ReportIdbService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
