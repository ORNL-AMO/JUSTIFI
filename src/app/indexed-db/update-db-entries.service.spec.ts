import { TestBed } from '@angular/core/testing';

import { UpdateDbEntriesService } from './update-db-entries.service';
import { stubServiceProviders } from '../spec-helpers/spec-test-service-stub';

describe('UpdateDbEntriesService', () => {
  let service: UpdateDbEntriesService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: stubServiceProviders
    });
    service = TestBed.inject(UpdateDbEntriesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
