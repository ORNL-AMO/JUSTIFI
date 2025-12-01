import { TestBed } from '@angular/core/testing';

import { UpdateCheckService } from './update-check.service';

describe('UpdateCheckService', () => {
  let service: UpdateCheckService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UpdateCheckService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
