import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SetupWizardService {

  sidebarOpen: BehaviorSubject<boolean>;
  helpPanelOpen: BehaviorSubject<boolean>;
  helpWidth: number = 200;
  sidebarWidth: number = 200;
  constructor(  ) {
    this.sidebarOpen = new BehaviorSubject<boolean>(true);
    this.helpPanelOpen = new BehaviorSubject<boolean>(false);
  }
}