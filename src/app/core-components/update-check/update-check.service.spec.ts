import { TestBed } from '@angular/core/testing';

import { UpdateCheckService } from './update-check.service';
import { SwUpdate } from '@angular/service-worker';
import { ElectronService } from 'src/app/electron/electron.service';
import { of, Subject } from 'rxjs';

describe('UpdateCheckService', () => {
  let service: UpdateCheckService;


  class SwUpdateStub {
    isEnabled = false;
    versionUpdates = new Subject();
    checkForUpdate = async () => false;
  }

  class ElectronServiceStub {
    isElectron = false;
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: SwUpdate, useClass: SwUpdateStub },
        { provide: ElectronService, useClass: ElectronServiceStub }
      ]
    });
    service = TestBed.inject(UpdateCheckService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
