import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ContactContext, IdbContact } from 'src/app/models/contact';

@Injectable({
  providedIn: 'root'
})
export class SharedDataService {

  sidebarOpen: BehaviorSubject<boolean>;
  createAssessmentModalOpen: BehaviorSubject<boolean>;

  displayAddNebsModal: BehaviorSubject<{
    assessmentId: string,
    energyOpportunityId: string
  }>;

  displayContactModal: BehaviorSubject<{
    context: ContactContext,
    viewContact: IdbContact,
    contextGuid: string,
    companyId: string
  }>;
  constructor() {
    this.createAssessmentModalOpen = new BehaviorSubject<boolean>(false);
    this.sidebarOpen = new BehaviorSubject<boolean>(false);
    this.displayAddNebsModal = new BehaviorSubject<{ assessmentId: string, energyOpportunityId: string }>(undefined);
    this.displayContactModal = new BehaviorSubject<{ context: ContactContext, viewContact: IdbContact, contextGuid: string, companyId: string }>(undefined);
  }
}
