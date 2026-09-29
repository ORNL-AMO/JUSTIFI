import { TestBed } from '@angular/core/testing';

import { ReportIdbService } from './report-idb.service';
import { NgxIndexedDBService } from 'ngx-indexed-db';
import { AnalyticsService } from '../analytics/analytics.service';
import { OnSiteVisitActivityService } from './on-site-visit-activity.service';
import { of, Observable } from 'rxjs';
import { IdbReport } from '../models/report';

describe('ReportIdbService', () => {
  let service: ReportIdbService;
  let dbService: {
    add: jasmine.Spy,
    update: jasmine.Spy,
    delete: jasmine.Spy
  };
  let analyticsService: Partial<AnalyticsService>;
  let onSiteVisitActivityService: {
    trackActivity: jasmine.Spy
  };
  beforeEach(() => {
    dbService = jasmine.createSpyObj('NgxIndexedDBService', ['add', 'update', 'delete']);
    analyticsService = {
      sendEvent: jasmine.createSpy('sendEvent')
    };
    onSiteVisitActivityService = {
      trackActivity: jasmine.createSpy('trackActivity').and.callFake((operation: Observable<unknown>) => operation)
    };
    TestBed.configureTestingModule({
      providers: [
        { provide: NgxIndexedDBService, useValue: dbService },
        { provide: AnalyticsService, useValue: analyticsService },
        { provide: OnSiteVisitActivityService, useValue: onSiteVisitActivityService }
      ]
    });
    service = TestBed.inject(ReportIdbService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should track visit activity when reports are added or deleted', () => {
    const report = { name: 'Custom Report' } as IdbReport;
    dbService.add.and.returnValue(of(report));
    dbService.delete.and.returnValue(of(undefined));

    service.addWithObservable(report).subscribe();
    service.deleteWithObservable(1).subscribe();

    expect(onSiteVisitActivityService.trackActivity).toHaveBeenCalledTimes(2);
  });

  it('should not track visit activity when a report is updated', () => {
    const report = { name: 'Custom Report' } as IdbReport;
    dbService.update.and.returnValue(of(report));

    service.updateWithObservable(report).subscribe();

    expect(onSiteVisitActivityService.trackActivity).not.toHaveBeenCalled();
  });
});
