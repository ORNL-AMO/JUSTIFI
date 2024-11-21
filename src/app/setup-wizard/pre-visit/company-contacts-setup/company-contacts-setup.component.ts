import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IconDefinition, faAddressBook, faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { IdbContact } from 'src/app/models/contact';
import { IdbCompany } from 'src/app/models/company';
import { CompanyIdbService } from 'src/app/indexed-db/company-idb.service';
import { ContactIdbService } from 'src/app/indexed-db/contact-idb.service';
import { Observable, Subscription, of } from 'rxjs';
import { IdbOnSiteVisit } from 'src/app/models/onSiteVisit';
import { OnSiteVisitIdbService } from 'src/app/indexed-db/on-site-visit-idb.service';
import * as _ from 'lodash';
import { CompanyContactsFormService } from '../../../shared/shared-company-forms/company-contacts-form/company-contacts-form.service';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-company-contacts-setup',
  templateUrl: './company-contacts-setup.component.html',
  styleUrl: './company-contacts-setup.component.css'
})
export class CompanyContactsSetupComponent implements OnInit, OnDestroy {

  allContacts: Array<IdbContact>;
  contactsSub: Subscription;
  routeGuardWarningModal: boolean = false;

  selectedCompany: IdbCompany;
  selectedCompanySub: Subscription;

  faChevronRight: IconDefinition = faChevronRight;
  faChevronLeft: IconDefinition = faChevronLeft;
  faAddressBook: IconDefinition = faAddressBook;

  hasInvalidContacts: boolean;
  constructor(private router: Router,
    private companyIdbService: CompanyIdbService,
    private contactIdbService: ContactIdbService,
    private onSiteVisitIdbService: OnSiteVisitIdbService,
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
      this.displayWarningModal();
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

  goBack() {
    let onSiteVisit: IdbOnSiteVisit = this.onSiteVisitIdbService.selectedVisit.getValue();
    this.router.navigateByUrl('setup-wizard/pre-visit/' + onSiteVisit.guid + '/company-setup');
  }

  goToKPIs() {
    let onSiteVisit: IdbOnSiteVisit = this.onSiteVisitIdbService.selectedVisit.getValue();
    this.router.navigateByUrl('setup-wizard/pre-visit/' + onSiteVisit.guid + '/company-kpi-select');
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
  displayWarningModal() {
    this.routeGuardWarningModal = true;
  }
  closeWarningModal() {
    this.routeGuardWarningModal = false;
  }
}
