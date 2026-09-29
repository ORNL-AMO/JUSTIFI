import { TestBed } from '@angular/core/testing';

import { DbChangesService } from './db-changes.service';
import { stubServiceProviders } from '../spec-helpers/spec-test-service-stub';
import { OnSiteVisitActivityService } from './on-site-visit-activity.service';
import { OnSiteVisitIdbService } from './on-site-visit-idb.service';
import { CompanyIdbService } from './company-idb.service';
import { FacilityIdbService } from './facility-idb.service';

describe('DbChangesService', () => {
  let service: DbChangesService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: stubServiceProviders
    });
    service = TestBed.inject(DbChangesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should register the selected visit as active', () => {
    const onSiteVisitIdbService = TestBed.inject(OnSiteVisitIdbService);
    const companyIdbService = TestBed.inject(CompanyIdbService);
    const facilityIdbService = TestBed.inject(FacilityIdbService);
    const activityService = TestBed.inject(OnSiteVisitActivityService);
    onSiteVisitIdbService.setSelectedFromGUID = jasmine.createSpy().and.returnValue(true);
    companyIdbService.setSelectedFromGUID = jasmine.createSpy().and.returnValue(true);
    facilityIdbService.setSelectedFromGUID = jasmine.createSpy().and.returnValue(true);
    const setActiveVisitSpy = spyOn(activityService, 'setActiveVisit');

    const visitExists = service.selectOnSiteVisit('123');

    expect(visitExists).toBeTrue();
    expect(setActiveVisitSpy).toHaveBeenCalledOnceWith('123');
  });

  it('should clear active visit tracking when visit selection fails', () => {
    const onSiteVisitIdbService = TestBed.inject(OnSiteVisitIdbService);
    const activityService = TestBed.inject(OnSiteVisitActivityService);
    onSiteVisitIdbService.setSelectedFromGUID = jasmine.createSpy().and.returnValue(false);
    const clearActiveVisitSpy = spyOn(activityService, 'clearActiveVisit');

    const visitExists = service.selectOnSiteVisit('missing-visit');

    expect(visitExists).toBeFalse();
    expect(clearActiveVisitSpy).toHaveBeenCalled();
  });
});
