import { Injectable } from '@angular/core';
import { LocalStorageService } from 'ngx-webstorage';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SetupWizardService {

  sidebarOpen: BehaviorSubject<boolean>;
  helpPanelOpen: BehaviorSubject<boolean>;
  helpWidth: number = 200;
  sidebarWidth: number = 200;
  focusedHelp: BehaviorSubject<string>;
  btnTextSubject: BehaviorSubject<string>;
  btnText: Observable<string>; 
  flagSubject: BehaviorSubject<boolean>;
  flag: Observable<boolean>;
  constructor(private localStorageService: LocalStorageService) {
    this.helpWidth = this.localStorageService.retrieve("helpWidth");
    if (!this.helpWidth) {
      this.helpWidth = 200;
    }
    if (this.helpWidth == 50) {
      this.helpPanelOpen = new BehaviorSubject<boolean>(false);
    } else {
      this.helpPanelOpen = new BehaviorSubject<boolean>(true);
    }

    this.sidebarWidth = this.localStorageService.retrieve("sidebarWidth");
    if (!this.sidebarWidth) {
      this.sidebarWidth = 200;
    }
    if (this.sidebarWidth == 50) {
      this.sidebarOpen = new BehaviorSubject<boolean>(false);
    } else {
      this.sidebarOpen = new BehaviorSubject<boolean>(true);
    }

    this.focusedHelp = new BehaviorSubject<string>(undefined);

    this.btnTextSubject = new BehaviorSubject<string>(undefined);
    this.btnText = this.btnTextSubject.asObservable();

    this.flagSubject = new BehaviorSubject<boolean>(false);
    this.flag = this.flagSubject.asObservable();
  }

  setHelpWidth(val: number) {
    this.helpWidth = val;
    this.localStorageService.store("helpWidth", val);
  }

  setSidebarWidth(val: number) {
    this.sidebarWidth = val;
    this.localStorageService.store("sidebarWidth", val);
  }

  setBtnText(value: string){
    this.btnTextSubject.next(value);
  }

  setFlag(value: boolean){
    this.flagSubject.next(value);
  }
}