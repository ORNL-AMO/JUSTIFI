import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedDataService {

  sidebarOpen: BehaviorSubject<boolean>;
  createAssessmentModalOpen: BehaviorSubject<boolean>;
  dataInitialized: BehaviorSubject<boolean>;

  displayAddNebsModal: BehaviorSubject<{
    assessmentId: string,
    energyOpportunityId: string
  }>;

  print: BehaviorSubject<boolean>;
  createPowerPoint: BehaviorSubject<boolean>;
  showSlideShow: BehaviorSubject<boolean>;
  exportToExcel: BehaviorSubject<boolean>;
  exportReportToExcel: BehaviorSubject<string>;
  constructor() {
    this.createAssessmentModalOpen = new BehaviorSubject<boolean>(false);
    this.sidebarOpen = new BehaviorSubject<boolean>(false);
    this.displayAddNebsModal = new BehaviorSubject<{ assessmentId: string, energyOpportunityId: string }>(undefined);
    this.print = new BehaviorSubject<boolean>(false);
    this.dataInitialized = new BehaviorSubject<boolean>(false);
    this.createPowerPoint = new BehaviorSubject<boolean>(false);
    this.showSlideShow = new BehaviorSubject<boolean>(false);
    this.exportToExcel = new BehaviorSubject<boolean>(false);
    this.exportReportToExcel = new BehaviorSubject<string>(undefined);
  }
}
