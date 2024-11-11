import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable, of, Subscription } from 'rxjs';
import { CompanyIdbService } from 'src/app/indexed-db/company-idb.service';
import { ContactIdbService } from 'src/app/indexed-db/contact-idb.service';
import { IdbCompany } from 'src/app/models/company';
import { IdbContact } from 'src/app/models/contact';
import { CompanyContactsFormService } from 'src/app/shared/shared-company-forms/company-contacts-setup-form/company-contacts-form/company-contacts-form.service';

@Component({
  selector: 'app-company-stakeholders',
  templateUrl: './company-stakeholders.component.html',
  styleUrl: './company-stakeholders.component.css'
})
export class CompanyStakeholdersComponent {

  allContacts: Array<IdbContact>;
  contactsSub: Subscription;
  routeGuardWarningModal: boolean = false;

  selectedCompany: IdbCompany;
  selectedCompanySub: Subscription;

  hasInvalidContacts: boolean;
  constructor(
    private companyIdbService: CompanyIdbService,
    private contactIdbService: ContactIdbService,
    private companyContactsFormService: CompanyContactsFormService
  ) {
  }

  ngOnInit() {
    this.selectedCompanySub = this.companyIdbService.selectedCompany.subscribe(_company => {
      this.selectedCompany = _company;
      this.setHasInvalidContacts();
    });

    this.contactsSub = this.contactIdbService.contacts.subscribe(_contacts => {
      this.allContacts = _contacts;
      this.setHasInvalidContacts();
    });
  }

  canDeactivate(): Observable<boolean> {
    if (this.hasInvalidContacts) {
      this.dislayWarningModal();
      return of(false);
    }
    return of(true);
  }

  ngOnDestroy() {
    if (this.selectedCompanySub) {
      this.selectedCompanySub.unsubscribe();
    }
    if (this.contactsSub) {
      this.contactsSub.unsubscribe();
    }
  }

  setHasInvalidContacts() {
    if (this.selectedCompany && this.allContacts) {
      let companyContacts: Array<IdbContact> = this.allContacts.filter(contact => {
        return contact.companyId == this.selectedCompany.guid;
      });
      let hasInvalidContacts: boolean = false;
      companyContacts.forEach(contact => {
        let contactForm: FormGroup = this.companyContactsFormService.getFormFromIdbContact(contact);
        if (contactForm.invalid) {
          for (const name of Object.keys(contactForm.controls)) {
            const control = contactForm.get(name);
            if (control && control.errors?.['required']) {
              hasInvalidContacts = true;
              break;
            }
          }
        }
      });
      this.hasInvalidContacts = hasInvalidContacts;
    }
  }
  
  dislayWarningModal() {
    this.routeGuardWarningModal = true;
  }
  
  closeWarningModal() {
    this.routeGuardWarningModal = false;
  }
}
