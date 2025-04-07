import { TestBed } from '@angular/core/testing';

import { DbChangesService } from './db-changes.service';
import { stubServiceProviders } from '../spec-helpers/spec-test-service-stub';

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
});
