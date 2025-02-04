import { Component } from '@angular/core';
import { IconDefinition, faBuilding } from '@fortawesome/free-solid-svg-icons';
import { CompanyIdbService } from 'src/app/indexed-db/company-idb.service';
import { ContactIdbService } from 'src/app/indexed-db/contact-idb.service';
import { IdbCompany } from 'src/app/models/company';
import { IdbContact } from 'src/app/models/contact';

@Component({
    selector: 'app-company-details-summary',
    templateUrl: './company-details-summary.component.html',
    styleUrl: './company-details-summary.component.css',
    standalone: false
})
export class CompanyDetailsSummaryComponent {

  company: IdbCompany;
  contacts: Array<IdbContact>;
  faBuilding: IconDefinition = faBuilding;
  constructor(private companyIdbService: CompanyIdbService, private contactsIdbService: ContactIdbService
  ) {
  }

  ngOnInit() {
    this.company = this.companyIdbService.selectedCompany.getValue();
    this.contacts = this.contactsIdbService.contacts.getValue();
  }
}
