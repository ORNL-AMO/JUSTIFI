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
      let body: string = `You are running JUSTIFI in a web browser. All application data is saved within this browser (The DOE does not have access to your data). 
        It is encouraged that you download backup files of your data frequently. Backups can be uploaded to restore lost or corrupted data. Additionally, sharing backups with the development team can help in their effort to make this tool. <br> <hr>
        You can download data backups using the "Download Data" button in the upper right hand corner of your screen.`
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