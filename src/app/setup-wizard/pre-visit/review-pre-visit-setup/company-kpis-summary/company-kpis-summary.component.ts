import { Component } from '@angular/core';
import { IconDefinition, faBullseye, faChartBar, faUser } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';
import { CompanyIdbService } from 'src/app/indexed-db/company-idb.service';
import { ContactIdbService } from 'src/app/indexed-db/contact-idb.service';
import { KeyPerformanceIndicatorsIdbService } from 'src/app/indexed-db/key-performance-indicators-idb.service';
import { IdbCompany } from 'src/app/models/company';
import { IdbContact } from 'src/app/models/contact';
import { IdbKeyPerformanceIndicator } from 'src/app/models/keyPerformanceIndicator';
import { LocaleService } from 'src/app/shared/shared-services/locale.service';

@Component({
    selector: 'app-company-kpis-summary',
    templateUrl: './company-kpis-summary.component.html',
    styleUrl: './company-kpis-summary.component.css',
    standalone: false
})
export class CompanyKpisSummaryComponent {

  keyPerformanceIndicators: Array<IdbKeyPerformanceIndicator>;
  faChartBar: IconDefinition = faChartBar;
  faBullseye: IconDefinition = faBullseye;
  faUser: IconDefinition = faUser;
  contacts: Array<IdbContact>;
  company: IdbCompany;

  currencyCode: string;
  currencySub: Subscription;
  
  constructor(private companyIdbService: CompanyIdbService, private contactsIdbService: ContactIdbService,
    private keyPerformanceIndicatorIdbService: KeyPerformanceIndicatorsIdbService,
    private localeService: LocaleService,
  ){

  }

  ngOnInit(){
    this.company = this.companyIdbService.selectedCompany.getValue();
    this.keyPerformanceIndicators = this.keyPerformanceIndicatorIdbService.keyPerformanceIndicators.getValue().filter(kpi => {
      return kpi.companyId == this.company.guid;
    });
    this.contacts = this.contactsIdbService.contacts.getValue();
    this.currencySub = this.localeService.currencyCode.subscribe(code => {
      this.currencyCode = code;
    });
  }

  ngOnDestroy(){
    this.currencySub.unsubscribe();
  }
}
