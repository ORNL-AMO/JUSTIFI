import { Component } from '@angular/core';
import { faBullseye, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';
import { CompanyIdbService } from 'src/app/indexed-db/company-idb.service';
import { KeyPerformanceIndicatorsIdbService } from 'src/app/indexed-db/key-performance-indicators-idb.service';
import { IdbCompany } from 'src/app/models/company';
import { IdbKeyPerformanceIndicator } from 'src/app/models/keyPerformanceIndicator';

@Component({
  selector: 'app-company-performance-indicators',
  templateUrl: './company-performance-indicators.component.html',
  styleUrl: './company-performance-indicators.component.css'
})
export class CompanyPerformanceIndicatorsComponent {

  faBullseye: IconDefinition = faBullseye;

  keyPerformanceIndicators: Array<IdbKeyPerformanceIndicator>;
  keyPerformanceIndicatorsSub: Subscription;

  company: IdbCompany;
  companySub: Subscription;

  selectedKpi: IdbKeyPerformanceIndicator;
  constructor(private keyPerformanceIndicatorIdbService: KeyPerformanceIndicatorsIdbService,
    private companyIdbService: CompanyIdbService
  ) {
  }

  ngOnInit() {
    this.companySub = this.companyIdbService.selectedCompany.subscribe(company => {
      this.company = company;
    })

    this.keyPerformanceIndicatorsSub = this.keyPerformanceIndicatorIdbService.keyPerformanceIndicators.subscribe(kpis => {
      this.keyPerformanceIndicators = kpis.filter(kpi => {
        return kpi.companyId == this.company.guid
      });
    });
  }

  ngOnDestroy() {
    this.companySub.unsubscribe();
    this.companySub.unsubscribe();
  }

  setSelectedKpi(kpi: IdbKeyPerformanceIndicator) {
    this.selectedKpi = kpi;
  }
}
