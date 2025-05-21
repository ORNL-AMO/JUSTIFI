import { TestBed } from '@angular/core/testing';

import { BackupModalService } from './backup-modal.service';

describe('ImportBackupModalService', () => {
  let service: BackupModalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BackupModalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
