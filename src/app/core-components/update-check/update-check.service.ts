import { Injectable } from '@angular/core';
import { SwUpdate, VersionReadyEvent } from '@angular/service-worker';
import { BehaviorSubject } from 'rxjs';
import { filter } from 'rxjs/operators';
import { ElectronService } from 'src/app/electron/electron.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UpdateCheckService {

  updateAvailable: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(private swUpdate: SwUpdate, private electronService: ElectronService) {
    if (environment.production && !this.electronService.isElectron && this.swUpdate.isEnabled) {
      this.swUpdate.versionUpdates
        .pipe(filter((evt): evt is VersionReadyEvent => evt.type === 'VERSION_READY'))
        .subscribe(() => {
          this.updateAvailable.next(true);
        });
    }
  }
}
