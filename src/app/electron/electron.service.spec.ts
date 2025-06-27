import { TestBed } from '@angular/core/testing';

import { ElectronService } from './electron.service';
import { stubServiceProviders } from '../spec-helpers/spec-test-service-stub';

describe('ElectronService', () => {
  let service: ElectronService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: stubServiceProviders
    });
    service = TestBed.inject(ElectronService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
