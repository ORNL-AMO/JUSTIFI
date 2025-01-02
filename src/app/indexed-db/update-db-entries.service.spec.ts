import { TestBed } from '@angular/core/testing';

import { UpdateDbEntriesService } from './update-db-entries.service';

describe('UpdateDbEntriesService', () => {
  let service: UpdateDbEntriesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UpdateDbEntriesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
