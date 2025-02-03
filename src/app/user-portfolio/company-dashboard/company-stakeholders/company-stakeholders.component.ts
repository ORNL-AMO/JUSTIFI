import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { faChevronRight, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { Observable, of, Subscription } from 'rxjs';
import { CompanyIdbService } from 'src/app/indexed-db/company-idb.service';
import { ContactIdbService } from 'src/app/indexed-db/contact-idb.service';
import { IdbCompany } from 'src/app/models/company';
import { IdbContact } from 'src/app/models/contact';
import { CompanyContactsFormService } from 'src/app/shared/shared-company-forms/company-contacts-form/company-contacts-form.service';

@Component({
    selector: 'app-company-stakeholders',
    templateUrl: './company-stakeholders.component.html',
    styleUrl: './company-stakeholders.component.css',
    standalone: false
})
export class CompanyStakeholdersComponent {
  faChevronRight: IconDefinition = faChevronRight;

  companyContacts: Array<IdbContact>;
  contactsSub: Subscription;

  company: IdbCompany;
  selectedCompanySub: Subscription;
  constructor(
    private companyIdbService: CompanyIdbService,
    private contactIdbService: ContactIdbService
  ) {
  }

  ngOnInit() {
    this.selectedCompanySub = this.companyIdbService.selectedCompany.subscribe(_company => {
      this.company = _company;
    });

    this.contactsSub = this.contactIdbService.contacts.subscribe(_contacts => {
      this.companyContacts = _contacts.filter(contact => {
        return contact.companyId == this.company.guid
      });
    });
  }

  ngOnDestroy() {
    this.selectedCompanySub.unsubscribe();
    this.contactsSub.unsubscribe();
  }
}
