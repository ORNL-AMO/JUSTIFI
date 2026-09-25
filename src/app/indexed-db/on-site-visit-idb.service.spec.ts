import { TestBed } from '@angular/core/testing';

import { OnSiteVisitIdbService } from './on-site-visit-idb.service';
import { NgxIndexedDBService } from 'ngx-indexed-db';
import { AnalyticsService } from '../analytics/analytics.service';
import { of } from 'rxjs';
import { getNewIdbOnSiteVisit, IdbOnSiteVisit } from '../models/onSiteVisit';

describe('OnSiteVisitIdbService', () => {
  let service: OnSiteVisitIdbService;

  let dbService: {
    getByKey: jasmine.Spy,
    getAll: jasmine.Spy,
    update: jasmine.Spy
  };
  let analyticsService: Partial<AnalyticsService> = {};
  beforeEach(() => {
    dbService = jasmine.createSpyObj('NgxIndexedDBService', [
      'getByKey',
      'getAll',
      'update'
    ]);
    TestBed.configureTestingModule({
      providers: [
        { provide: NgxIndexedDBService, useValue: dbService },
        { provide: AnalyticsService, useValue: analyticsService }
      ]
    });
    service = TestBed.inject(OnSiteVisitIdbService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should update only the requested visit modified date', async () => {
    const targetVisit: IdbOnSiteVisit = getNewIdbOnSiteVisit('user-1', 'company-1', 'facility-1');
    targetVisit.id = 1;
    targetVisit.guid = 'visit-1';
    targetVisit.modifiedDate = new Date('2025-01-01T00:00:00Z');

    const otherVisit: IdbOnSiteVisit = getNewIdbOnSiteVisit('user-1', 'company-1', 'facility-1');
    otherVisit.id = 2;
    otherVisit.guid = 'visit-2';
    otherVisit.modifiedDate = new Date('2025-02-01T00:00:00Z');

    let storedVisits: Array<IdbOnSiteVisit> = [targetVisit, otherVisit];
    dbService.getByKey.and.returnValue(of(targetVisit));
    dbService.update.and.callFake((_storeName: string, visit: IdbOnSiteVisit) => {
      storedVisits = storedVisits.map(storedVisit => storedVisit.guid == visit.guid ? visit : storedVisit);
      return of(visit);
    });
    dbService.getAll.and.callFake(() => of(storedVisits));
    service.onSiteVisits.next(storedVisits);
    service.selectedVisit.next(otherVisit);

    await service.touchModifiedDate('visit-1');

    const updatedTarget = service.getByGuid('visit-1');
    expect(updatedTarget.modifiedDate.getTime()).toBeGreaterThan(new Date('2025-01-01T00:00:00Z').getTime());
    expect(service.getByGuid('visit-2').modifiedDate).toEqual(new Date('2025-02-01T00:00:00Z'));
    expect(service.selectedVisit.getValue()).toBe(otherVisit);
  });

  it('should refresh the selected visit when it is touched', async () => {
    const visit: IdbOnSiteVisit = getNewIdbOnSiteVisit('user-1', 'company-1', 'facility-1');
    visit.id = 1;
    visit.guid = 'visit-1';

    let storedVisit: IdbOnSiteVisit = visit;
    dbService.getByKey.and.returnValue(of(visit));
    dbService.update.and.callFake((_storeName: string, updatedVisit: IdbOnSiteVisit) => {
      storedVisit = updatedVisit;
      return of(updatedVisit);
    });
    dbService.getAll.and.callFake(() => of([storedVisit]));
    service.onSiteVisits.next([visit]);
    service.selectedVisit.next(visit);

    await service.touchModifiedDate('visit-1');

    expect(service.selectedVisit.getValue()).toBe(service.getByGuid('visit-1'));
    expect(service.selectedVisit.getValue().modifiedDate).toEqual(storedVisit.modifiedDate);
  });

  it('should do nothing when the visit does not exist', async () => {
    await service.touchModifiedDate('missing-visit');

    expect(dbService.getByKey).not.toHaveBeenCalled();
    expect(dbService.update).not.toHaveBeenCalled();
  });

  it('should update the reports sidebar state without changing the modified date', async () => {
    const visit: IdbOnSiteVisit = getNewIdbOnSiteVisit('user-1', 'company-1', 'facility-1');
    visit.id = 1;
    visit.guid = 'visit-1';
    visit.sidebarReportsOpen = false;
    visit.modifiedDate = new Date('2025-01-01T00:00:00Z');
    const originalModifiedDate = visit.modifiedDate;

    let storedVisit: IdbOnSiteVisit = visit;
    dbService.getByKey.and.returnValue(of(visit));
    dbService.update.and.callFake((_storeName: string, updatedVisit: IdbOnSiteVisit) => {
      storedVisit = updatedVisit;
      return of(updatedVisit);
    });
    dbService.getAll.and.callFake(() => of([storedVisit]));
    service.onSiteVisits.next([visit]);
    service.selectedVisit.next(visit);

    await service.updateSidebarReportsOpen('visit-1', true);

    expect(service.getByGuid('visit-1').sidebarReportsOpen).toBeTrue();
    expect(service.getByGuid('visit-1').modifiedDate).toBe(originalModifiedDate);
  });
});
