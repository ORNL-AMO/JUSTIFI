import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ToastNotificationsService } from '../core-components/toast-notifications/toast-notifications.service';
import { LoadingService } from '../core-components/loading/loading.service';

@Injectable({
  providedIn: 'root'
})
export class ElectronService {

  updateAvailable: BehaviorSubject<boolean>;
  updateInfo: BehaviorSubject<{ releaseName: string, releaseNotes: string }>;
  updateError: BehaviorSubject<boolean>;
  isElectron: boolean;
  electronWindow: ElectronWindow;
  constructor(private toastNotificationsService: ToastNotificationsService,
    private loadingService: LoadingService
  ) {
    this.updateAvailable = new BehaviorSubject<boolean>(false);
    this.updateInfo = new BehaviorSubject<{ releaseName: string, releaseNotes: string }>(undefined);
    this.updateError = new BehaviorSubject<boolean>(false);
    this.electronWindow = window;
    this.isElectron = this.electronWindow["electronAPI"];
    if (this.isElectron) {
      console.log('Application running inside of Electron.')
      //application running in electron listen for signals
      this.listen();
    } else {
      console.warn('Application is running on the Web.');
    }
  }

  //listens for messages from electron about updates
  listen(): void {
    if (!this.electronWindow["electronAPI"]) {
      return;
    }
    this.electronWindow["electronAPI"].on("release-info", (data: { releaseName: string, releaseNotes: string }) => {
      console.log('release-info');
      console.log(data);
      this.updateInfo.next(data);
    });
    this.electronWindow["electronAPI"].on("available", (data: any) => {
      console.log('available');
      console.log(data);
      this.updateAvailable.next(true);
    });
    this.electronWindow["electronAPI"].on("error", (data: any) => {
      console.log('error');
      console.log(data);
      this.updateError.next(true);
      this.loadingService.setLoadingStatus(false)
      this.toastNotificationsService.showToast("Error", "An error occurred while checking for updates. Please use the feedback links to notify the development team of errors.", "bg-danger", true, false);
    });
    this.electronWindow["electronAPI"].on("update-downloaded", (data: any) => {
      console.log('update-downloaded');
      console.log(data)
    });
  }

  //Used to tell electron that app is ready
  //does nothing when in browser
  sendAppReady(data: any): void {
    if (!this.electronWindow["electronAPI"]) {
      return;
    }
    this.electronWindow["electronAPI"].send("ready", data);
  }

  //send signal to ipcMain to update
  sendUpdateSignal() {
    if (!this.electronWindow["electronAPI"]) {
      this.updateError.next(true)
      return;
    }
    this.electronWindow["electronAPI"].send("update");
  }

  sendAppRelaunch() {
    if (!this.electronWindow["electronAPI"]) {
      return;
    }
    this.electronWindow["electronAPI"].send("relaunch");
  }
}

export interface ElectronWindow extends Window {
  electronAPI?: any
}