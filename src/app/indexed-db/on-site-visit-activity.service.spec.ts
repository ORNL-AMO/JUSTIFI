import { TestBed } from '@angular/core/testing';
import { firstValueFrom, of, throwError } from 'rxjs';
import { OnSiteVisitActivityService } from './on-site-visit-activity.service';
import { OnSiteVisitIdbService } from './on-site-visit-idb.service';

describe('OnSiteVisitActivityService', () => {
  let service: OnSiteVisitActivityService;
  let onSiteVisitIdbService: jasmine.SpyObj<OnSiteVisitIdbService>;

  beforeEach(() => {
    onSiteVisitIdbService = jasmine.createSpyObj<OnSiteVisitIdbService>('OnSiteVisitIdbService', [
      'touchModifiedDate'
    ]);
    onSiteVisitIdbService.touchModifiedDate.and.resolveTo();

    TestBed.configureTestingModule({
      providers: [
        { provide: OnSiteVisitIdbService, useValue: onSiteVisitIdbService }
      ]
    });
    service = TestBed.inject(OnSiteVisitActivityService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should touch the active visit after a successful operation', async () => {
    service.setActiveVisit('visit-1');

    const result = await firstValueFrom(service.trackActivity(of('saved')));

    expect(result).toBe('saved');
    expect(onSiteVisitIdbService.touchModifiedDate).toHaveBeenCalledOnceWith('visit-1');
  });

  it('should not touch a visit when there is no active visit', async () => {
    const result = await firstValueFrom(service.trackActivity(of('saved')));

    expect(result).toBe('saved');
    expect(onSiteVisitIdbService.touchModifiedDate).not.toHaveBeenCalled();
  });

  it('should stop tracking activity after the active visit is cleared', async () => {
    service.setActiveVisit('visit-1');
    service.clearActiveVisit();

    await firstValueFrom(service.trackActivity(of('saved')));

    expect(onSiteVisitIdbService.touchModifiedDate).not.toHaveBeenCalled();
  });

  it('should not touch the active visit when the operation fails', async () => {
    service.setActiveVisit('visit-1');

    await expectAsync(firstValueFrom(
      service.trackActivity(throwError(() => new Error('save failed')))
    )).toBeRejectedWithError('save failed');

    expect(onSiteVisitIdbService.touchModifiedDate).not.toHaveBeenCalled();
  });

  it('should preserve a successful operation result when touching the visit fails', async () => {
    service.setActiveVisit('visit-1');
    onSiteVisitIdbService.touchModifiedDate.and.rejectWith(new Error('touch failed'));
    const consoleErrorSpy = spyOn(console, 'error');

    const result = await firstValueFrom(service.trackActivity(of('saved')));

    expect(result).toBe('saved');
    expect(onSiteVisitIdbService.touchModifiedDate).toHaveBeenCalledOnceWith('visit-1');
    expect(consoleErrorSpy).toHaveBeenCalled();
  });
});
