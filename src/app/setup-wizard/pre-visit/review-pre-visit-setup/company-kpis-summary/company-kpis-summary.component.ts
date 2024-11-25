import { Component } from '@angular/core';
import { IconDefinition, faBullseye, faChartBar, faUser } from '@fortawesome/free-solid-svg-icons';
import { CompanyIdbService } from 'src/app/indexed-db/company-idb.service';
import { ContactIdbService } from 'src/app/indexed-db/contact-idb.service';
import { KeyPerformanceIndicatorsIdbService } from 'src/app/indexed-db/key-performance-indicators-idb.service';
import { IdbCompany } from 'src/app/models/company';
import { IdbContact } from 'src/app/models/contact';
import { IdbKeyPerformanceIndicator } from 'src/app/models/keyPerformanceIndicator';

@Component({
  selector: 'app-company-kpis-summary',
  templateUrl: './company-kpis-summary.component.html',
  styleUrl: './company-kpis-summary.component.css'
})
export class CompanyKpisSummaryComponent {

  keyPerformanceIndicators: Array<IdbKeyPerformanceIndicator>;
  faChartBar: IconDefinition = faChartBar;
  faBullseye: IconDefinition = faBullseye;
  faUser: IconDefinition = faUser;
  contacts: Array<IdbContact>;
  company: IdbCompany;
  constructor(private companyIdbService: CompanyIdbService, private contactsIdbService: ContactIdbService,
    private keyPerformanceIndicatorIdbService: KeyPerformanceIndicatorsIdbService
  ){

  }

  ngOnInit(){
    this.company = this.companyIdbService.selectedCompany.getValue();
    this.keyPerformanceIndicators = this.keyPerformanceIndicatorIdbService.keyPerformanceIndicators.getValue().filter(kpi => {
      return kpi.companyId == this.company.guid;
    });
    this.contacts = this.contactsIdbService.contacts.getValue();
  }
}
