import { ApplicationRef, Injectable } from '@angular/core';
import { SwUpdate, VersionReadyEvent } from '@angular/service-worker';
import { BehaviorSubject, concat, interval } from 'rxjs';
import { filter, first } from 'rxjs/operators';
import { ElectronService } from 'src/app/electron/electron.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UpdateCheckService {

  updateAvailable: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(private swUpdate: SwUpdate, private electronService: ElectronService,
    private appRef: ApplicationRef
  ) {
    if (environment.production && !this.electronService.isElectron && this.swUpdate.isEnabled) {
      this.swUpdate.versionUpdates
        .pipe(filter((evt): evt is VersionReadyEvent => evt.type === 'VERSION_READY'))
        .subscribe(() => {
          this.updateAvailable.next(true);
        });


      const appIsStable = this.appRef.isStable.pipe(first((isStable) => isStable === true));
      const everySixHours = interval(6 * 60 * 60 * 1000);
      const everySixHoursOnceAppIsStable = concat(appIsStable, everySixHours);

      everySixHoursOnceAppIsStable.subscribe(async () => {
        try {
          const updateFound = await this.swUpdate.checkForUpdate();
          console.log('SW checking for updates', updateFound);
          if (updateFound) {
            this.updateAvailable.next(true);
          }
          console.log(updateFound ? 'A new version is available.' : 'Already on the latest version.');
        } catch (err) {
          console.error('Failed to check for updates:', err);
        }
      });
    }
  }
}
