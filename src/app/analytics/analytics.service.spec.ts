import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';

import { AnalyticsService } from './analytics.service';
import { stubServiceProviders } from '../spec-helpers/spec-test-service-stub';

describe('AnalyticsService', () => {
  let service: AnalyticsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), ...stubServiceProviders]
    });
    service = TestBed.inject(AnalyticsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
