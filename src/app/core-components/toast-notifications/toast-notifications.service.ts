import { Injectable } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ToastNotificationsService {

  toastNotification: BehaviorSubject<ToastNotification>;
  disableNotification: BehaviorSubject<boolean>;
  disableNotificaitonSub: Subscription;
  constructor() {
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
}

export interface ToastNotification {
  autoHide: boolean,
  title: string,
  body: string,
  toastClass: ToastClass,
  showDisable: boolean
}

export type ToastClass = 'bg-success' | 'bg-info' | 'bg-danger' | 'bg-primary' | 'bg-secondary' | 'bg-warning' | 'bg-light' | 'bg-dark';