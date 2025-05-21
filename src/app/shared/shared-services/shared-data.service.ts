import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ContactContext, IdbContact } from 'src/app/models/contact';

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
  constructor() {
    this.createAssessmentModalOpen = new BehaviorSubject<boolean>(false);
    this.sidebarOpen = new BehaviorSubject<boolean>(false);
    this.displayAddNebsModal = new BehaviorSubject<{ assessmentId: string, energyOpportunityId: string }>(undefined);
    this.print = new BehaviorSubject<boolean>(false);
    this.dataInitialized = new BehaviorSubject<boolean>(false);
  }
}
