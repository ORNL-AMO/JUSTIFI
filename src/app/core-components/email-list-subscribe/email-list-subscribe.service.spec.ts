import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { AnalyticsService } from 'src/app/analytics/analytics.service';
import { environment } from 'src/environments/environment';
import { EmailListSubscribeService } from './email-list-subscribe.service';

describe('EmailListSubscribeService', () => {
  let service: EmailListSubscribeService;
  let httpTestingController: HttpTestingController;
  let analyticsService: jasmine.SpyObj<AnalyticsService>;

  beforeEach(() => {
    analyticsService = jasmine.createSpyObj<AnalyticsService>('AnalyticsService', ['sendEvent']);

    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: AnalyticsService, useValue: analyticsService }
      ]
    });

    service = TestBed.inject(EmailListSubscribeService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should validate email addresses', () => {
    expect(service.checkEmailValid(undefined)).toBe('Please enter a valid email address.');
    expect(service.checkEmailValid('not-an-email')).toBe('Please enter a valid email address.');
    expect(service.checkEmailValid(' person@example.com ')).toBeUndefined();
  });

  [200, 201].forEach(status => {
    it(`should submit an email and set success for HTTP ${status}`, () => {
      let completed = false;

      service.submitSubscriberEmail('person@example.com').subscribe(() => completed = true);

      expect(service.submittedStatus.value).toBe('sending');
      const request = httpTestingController.expectOne(
        environment.measurUtilitiesApi + 'justifi-email-subscriber'
      );
      expect(request.request.method).toBe('POST');
      expect(request.request.body).toEqual({
        email: 'person@example.com',
        name: 'person@example.com'
      });

      request.flush({ id: 123 }, { status, statusText: 'OK' });

      expect(completed).toBeTrue();
      expect(service.submittedStatus.value).toBe('success');
      expect(analyticsService.sendEvent).toHaveBeenCalledOnceWith('email-list-subscribe');
    });
  });

  it('should contain HTTP errors and expose a retryable error state', () => {
    let completed = false;

    service.submitSubscriberEmail('person@example.com').subscribe(() => completed = true);
    const request = httpTestingController.expectOne(
      environment.measurUtilitiesApi + 'justifi-email-subscriber'
    );

    request.flush({}, { status: 500, statusText: 'Server Error' });

    expect(completed).toBeTrue();
    expect(service.submittedStatus.value).toBe('error');
    expect(analyticsService.sendEvent).not.toHaveBeenCalled();
  });
});
