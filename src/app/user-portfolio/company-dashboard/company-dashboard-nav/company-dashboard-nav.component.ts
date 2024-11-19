import { Component } from '@angular/core';
import { faAddressBook, faBullseye, faFile, faGears, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';
import { CompanyIdbService } from 'src/app/indexed-db/company-idb.service';
import { IdbCompany } from 'src/app/models/company';

@Component({
  selector: 'app-company-dashboard-nav',
  templateUrl: './company-dashboard-nav.component.html',
  styleUrl: './company-dashboard-nav.component.css'
})
export class CompanyDashboardNavComponent {

  faFile: IconDefinition = faFile;
  faGears: IconDefinition = faGears;
  faAddressBook: IconDefinition = faAddressBook;
  faBullseye: IconDefinition = faBullseye;

  company: IdbCompany;
  companySub: Subscription;
  constructor(private companyIdbService: CompanyIdbService) {
  }

  ngOnInit() {
    this.companySub = this.companyIdbService.selectedCompany.subscribe(company => {
      this.company = company;
    })
  }

  ngOnDestroy() {
    this.companySub.unsubscribe();
  }
}
