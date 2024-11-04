import { TestBed } from '@angular/core/testing';

import { ToastNotificationsService } from './toast-notifications.service';
import { LocalStorageDataService } from 'src/app/shared/shared-services/local-storage-data.service';

describe('ToastNotificationsService', () => {
  let service: ToastNotificationsService;

  let localStorageDataService: Partial<LocalStorageDataService> = {}
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: LocalStorageDataService, useValue: localStorageDataService }
      ]
    });
    service = TestBed.inject(ToastNotificationsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
