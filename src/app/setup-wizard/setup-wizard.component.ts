import { Component } from '@angular/core';
import { SharedDataService } from '../shared/shared-services/shared-data.service';
import { Subscription } from 'rxjs';
import { ContactContext, IdbContact } from '../models/contact';

@Component({
  selector: 'app-setup-wizard',
  templateUrl: './setup-wizard.component.html',
  styleUrl: './setup-wizard.component.css'
})
export class SetupWizardComponent {


  displayContactModal: { context: ContactContext, viewContact: IdbContact, contextGuid: string, companyId: string };
  displayContactModalSub: Subscription;
  constructor(private sharedDataService: SharedDataService) {

  }

  ngOnInit() {
    this.displayContactModalSub = this.sharedDataService.displayContactModal.subscribe(_displayContactModal => {
      this.displayContactModal = _displayContactModal;
    });
  }

  ngOnDestroy() {
    this.displayContactModalSub.unsubscribe();
  }

  closeContactModal() {
    this.sharedDataService.displayContactModal.next(undefined);
  }
}
