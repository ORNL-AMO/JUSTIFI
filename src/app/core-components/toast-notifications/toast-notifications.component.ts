import { Component, ElementRef, ViewChild } from '@angular/core';
import * as bootstrap from 'bootstrap';
import { ToastNotification, ToastNotificationsService } from './toast-notifications.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-toast-notifications',
  templateUrl: './toast-notifications.component.html',
  styleUrl: './toast-notifications.component.css'
})
export class ToastNotificationsComponent {


  @ViewChild('toastItem', { static: false }) toastItem: ElementRef;
  toast: any;

  toastNotification: ToastNotification;
  toastNotificationSub: Subscription;
  constructor(private toastNotificationService: ToastNotificationsService) {
  }

  ngOnInit(): void {
    this.toastNotificationSub = this.toastNotificationService.toastNotification.subscribe(notification => {
      this.toastNotification = notification;
      this.showToast();
    })
  }

  ngAfterViewInit() {
    //Bootstrap toast initialization
    if (bootstrap) {
      this.toast = new bootstrap.Toast(this.toastItem.nativeElement);
      this.showToast();
    }
  }

  ngOnDestroy() {
    this.toastNotificationSub.unsubscribe();
    if (this.toast) {
      this.toast.dispose();
    }
  }

  showToast() {
    if (this.toastNotification && this.toast) {
      this.toast.show();
    }
  }



  closeToast() {
    this.toast.hide();
    this.toastNotificationService.toastNotification.next(undefined);
  }

}
