import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ToastNotificationsService {

  toastNotification: BehaviorSubject<ToastNotification>;

  constructor() {
    this.toastNotification = new BehaviorSubject<ToastNotification>(undefined);
  }

  showToast(title: string, body: string, toastClass: ToastClass, autoHide: boolean) {
    this.toastNotification.next({
      autoHide: autoHide,
      title: title,
      body: body,
      toastClass: toastClass
    })
  }

  showWebDisclaimer() {
    let title: string = "JUSTIFI Web";
    let body: string = `You are running JUSTIFI in a web browser. All application data is saved within this browser (The DOE does not have access to your data). 
      It is encouraged that you download backup files of your data frequently. Backups can be uploaded to restore lost or corrupted data. Additionally, sharing backups with the development team can help in their effort to make this tool. <br> <hr>
      You can download data backups using the "Download Data" button in the upper right hand corner of your screen.`
    this.showToast(title, body, "bg-info", false);
  }
}

export interface ToastNotification {
  autoHide: boolean,
  title: string,
  body: string,
  toastClass: ToastClass
}

export type ToastClass = 'bg-success' | 'bg-info' | 'bg-danger' | 'bg-primary' | 'bg-secondary' | 'bg-warning' | 'bg-light' | 'bg-dark';