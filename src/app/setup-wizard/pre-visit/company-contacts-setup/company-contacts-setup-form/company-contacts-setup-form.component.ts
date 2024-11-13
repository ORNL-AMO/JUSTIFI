import { ChangeDetectorRef, Component } from '@angular/core';
import { firstValueFrom, Subscription } from 'rxjs';
import { getNewIdbContact, IdbContact } from 'src/app/models/contact';
import { IdbCompany } from 'src/app/models/company';
import { faAddressBook, faCircleExclamation, faPlus, faUser, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { CompanyIdbService } from 'src/app/indexed-db/company-idb.service';
import { ContactIdbService } from 'src/app/indexed-db/contact-idb.service';
import { LocalStorageDataService } from 'src/app/shared/shared-services/local-storage-data.service';
import { BootstrapService } from 'src/app/shared/shared-services/bootstrap.service';

@Component({
  selector: 'app-company-contacts-setup-form',
  templateUrl: './company-contacts-setup-form.component.html',
  styleUrl: './company-contacts-setup-form.component.css'
})
export class CompanyContactsSetupFormComponent {

  faUser: IconDefinition = faUser;
  faCircleExclamation: IconDefinition = faCircleExclamation;
  
  allContacts: Array<IdbContact>;
  companyContactGuids: Array<string>;
  contactsSub: Subscription
  companyContacts: Array<IdbContact>;
  routeGuardWarningModal: boolean = false;

  selectedCompany: IdbCompany;
  selectedCompanySub: Subscription;

  accordionGuid: string;
  faAddressBook: IconDefinition = faAddressBook;
  faPlus: IconDefinition = faPlus;

  hasInvalidContacts: boolean;
  isAddNew: boolean = false;
  constructor(
    private companyIdbService: CompanyIdbService,
    private contactIdbService: ContactIdbService,
    private localStorageDataService: LocalStorageDataService,
    private bootstrapService: BootstrapService,
    private cd: ChangeDetectorRef
  ) {
  }

  ngOnInit() {
    this.selectedCompanySub = this.companyIdbService.selectedCompany.subscribe(_company => {
      this.selectedCompany = _company;
      this.setCompanyContacts();
    });

    this.contactsSub = this.contactIdbService.contacts.subscribe(_contacts => {
      this.allContacts = _contacts;
      this.setCompanyContacts();
    });
  }

  ngAfterViewInit() {
    //open the accordion for last viewed neb
    let lastContactGuid: string = this.localStorageDataService.contactAccordionGuid;
    if (lastContactGuid && this.companyContactGuids.includes(lastContactGuid)) {
      this.toggleBS(lastContactGuid);
      this.cd.detectChanges();
    }
  }

  setCompanyContacts() {
    if (this.selectedCompany && this.allContacts) {
      let tmpCompanyContacts: Array<IdbContact> = this.allContacts.filter(contact => {
        return contact.companyId == this.selectedCompany.guid;
      });
      let tmpContactIds: Array<string> = tmpCompanyContacts.map(contact => {
        return contact.guid;
      });

      if (!this.companyContactGuids) {
        this.companyContactGuids = tmpContactIds;
      } else {
        //check contact added/removed
        if (this.companyContactGuids.length != tmpContactIds.length) {
          this.companyContactGuids = tmpContactIds;
        }
      }
    }
  }

  ngOnDestroy() {
    if (this.selectedCompanySub) {
      this.selectedCompanySub.unsubscribe();
    }
    if (this.contactsSub) {
      this.contactsSub.unsubscribe();
    }
  }

  async addContact() {
    let newContact: IdbContact = getNewIdbContact(this.selectedCompany.userId, this.selectedCompany.guid);
    await firstValueFrom(this.contactIdbService.addWithObservable(newContact))
    await this.contactIdbService.setContacts();
    this.isAddNew = true;
  }

  toggleBS(contactGuid: string) {
    this.bootstrapService.bsCollapse('#' + contactGuid);
    if (this.accordionGuid != contactGuid) {
      this.accordionGuid = contactGuid;
    } else {
      this.accordionGuid = undefined;
    }
    this.localStorageDataService.setContactAccordionGuid(this.accordionGuid);
  }

  childFormInitialized(contactGuid: string, isLast: boolean) {
    if (this.isAddNew == true && isLast) {
      this.toggleBS(contactGuid);
      this.isAddNew = false;
      this.cd.detectChanges();
    }
  }
}
