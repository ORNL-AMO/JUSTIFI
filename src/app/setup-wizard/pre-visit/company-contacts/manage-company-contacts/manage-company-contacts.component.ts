import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IconDefinition, faAddressBook, faChevronLeft, faChevronRight, faPlus } from '@fortawesome/free-solid-svg-icons';
import { getNewIdbContact, IdbContact } from 'src/app/models/contact';
import { IdbCompany } from 'src/app/models/company';
import { CompanyIdbService } from 'src/app/indexed-db/company-idb.service';
import { ContactIdbService } from 'src/app/indexed-db/contact-idb.service';
import { Observable, Subscription, firstValueFrom, of } from 'rxjs';
import { IdbOnSiteVisit } from 'src/app/models/onSiteVisit';
import { OnSiteVisitIdbService } from 'src/app/indexed-db/on-site-visit-idb.service';
import * as _ from 'lodash';

import { FormGroup } from '@angular/forms';
import { CompanyContactsFormService } from 'src/app/shared/shared-company-forms/company-contacts-form/company-contacts-form.service';

@Component({
  selector: 'app-manage-company-contacts',
  templateUrl: './manage-company-contacts.component.html',
  styleUrl: './manage-company-contacts.component.css'
})
export class ManageCompanyContactsComponent {
  companyContacts: Array<IdbContact>;
  contactsSub: Subscription;
  routeGuardWarningModal: boolean = false;

  selectedCompany: IdbCompany;
  selectedCompanySub: Subscription;

  faChevronRight: IconDefinition = faChevronRight;
  faChevronLeft: IconDefinition = faChevronLeft;
  faAddressBook: IconDefinition = faAddressBook;
  faPlus: IconDefinition = faPlus;

  hasInvalidContacts: boolean;

  onSiteVisit: IdbOnSiteVisit;
  onSiteVisitSub: Subscription;
  constructor(private router: Router,
    private companyIdbService: CompanyIdbService,
    private contactIdbService: ContactIdbService,
    private onSiteVisitIdbService: OnSiteVisitIdbService
  ) {
  }

  ngOnInit() {
    this.selectedCompanySub = this.companyIdbService.selectedCompany.subscribe(_company => {
      this.selectedCompany = _company;
    });

    this.contactsSub = this.contactIdbService.contacts.subscribe(_contacts => {
      this.companyContacts = _contacts.filter(c => { return c.companyId == this.selectedCompany.guid });
    });
    this.onSiteVisitSub = this.onSiteVisitIdbService.selectedVisit.subscribe(visit => {
      this.onSiteVisit = visit;
    })
  }

  ngOnDestroy() {
    if (this.selectedCompanySub) {
      this.selectedCompanySub.unsubscribe();
    }
    if (this.contactsSub) {
      this.contactsSub.unsubscribe();
    }
    this.onSiteVisitSub.unsubscribe();
  }

  async goBack() {
    if(this.selectedCompany.sidebarContactsOpen){
      this.selectedCompany.sidebarContactsOpen = false;
      await this.companyIdbService.asyncUpdate(this.selectedCompany);
    }
    this.router.navigateByUrl('setup-wizard/pre-visit/' + this.onSiteVisit.guid + '/company-setup');
  }

   async next() {
    if (this.companyContacts.length == 0) {
      if(this.selectedCompany.sidebarContactsOpen){
        this.selectedCompany.sidebarContactsOpen = false;
        this.selectedCompany.sidebarOpen = false;
        await this.companyIdbService.asyncUpdate(this.selectedCompany);
      }
      this.router.navigateByUrl('setup-wizard/pre-visit/' + this.onSiteVisit.guid + '/facility-setup');
    } else {
      this.goToContact(this.companyContacts[0]);
    }
  }


  async addContact() {
    let newContact: IdbContact = getNewIdbContact(this.selectedCompany.userId, this.selectedCompany.guid);
    await firstValueFrom(this.contactIdbService.addWithObservable(newContact))
    await this.contactIdbService.setContacts();
    this.goToContact(newContact);
  }

  goToContact(contact: IdbContact) {
    this.router.navigateByUrl('setup-wizard/pre-visit/' + this.onSiteVisit.guid + '/company-contacts/' + contact.guid)
  }
}
