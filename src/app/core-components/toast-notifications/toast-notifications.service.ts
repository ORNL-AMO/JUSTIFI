import { Injectable } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';
import { LocalStorageDataService } from 'src/app/shared/shared-services/local-storage-data.service';

@Injectable({
  providedIn: 'root'
})
export class ToastNotificationsService {

  toastNotification: BehaviorSubject<ToastNotification>;
  disableNotification: BehaviorSubject<boolean>;
  disableNotificaitonSub: Subscription;
  constructor(private localStorageDataService: LocalStorageDataService) {
    this.toastNotification = new BehaviorSubject<ToastNotification>(undefined);
    this.disableNotification = new BehaviorSubject<boolean>(false);
  }

  showToast(title: string, body: string, toastClass: ToastClass, autoHide: boolean, showDisable: boolean) {
    this.toastNotification.next({
      autoHide: autoHide,
      title: title,
      body: body,
      toastClass: toastClass,
      showDisable: showDisable
    })
  }

  showWebDisclaimer() {
    if (!this.localStorageDataService.disableDataDisclaimer) {
      let title: string = "JUSTIFI Web";
      let body: string = `You are running the Software in a web browser on your device. 
        All application data is saved locally within this browser to your device and/or browser. 
        NREL, ORNL, and DOE do not have access to data you input into the Software and/or outputs 
        based on your data provided by the Software. 
        Should the Software, your browser, and/or your device crash, fail, or otherwise have an error, 
        data you entered into the Software and the outputs based on that data may be lost. 
        It is encouraged that you download backup files of your data frequently. 
        Backups can be imported back into the Software if needed to restore lost or corrupted data. 
        <br>
        <br>
        You may voluntarily provide a backup file of your data to NREL and ORNL for use in improving the Software.
        By providing such data you are agreeing that NREL and ORNL may use such data without restriction and without 
        compensation or obligation to you. 
        To the extent any license would be required to utilize such data, you automatically grant NREL and ORNL, 
        when submitting such data, a worldwide, royalty-free, perpetual, irrevocable, non-exclusive, 
        transferrable, and sublicensable license under any rights necessary for such use or implementation.`
      this.showToast(title, body, "bg-info", false, true);
      let initDisable: boolean = true;
      this.disableNotificaitonSub = this.disableNotification.subscribe(val => {
        if (val == true) {
          this.localStorageDataService.setDisableDataDisclaimer(true)
        };
        if (!initDisable) {
          this.disableNotificaitonSub.unsubscribe();
        } else {
          initDisable = false;
        }
      });
    }
  }
}

export interface ToastNotification {
  autoHide: boolean,
  title: string,
  body: string,
  toastClass: ToastClass,
  showDisable: boolean
}

export type ToastClass = 'bg-success' | 'bg-info' | 'bg-danger' | 'bg-primary' | 'bg-secondary' | 'bg-warning' | 'bg-light' | 'bg-dark';