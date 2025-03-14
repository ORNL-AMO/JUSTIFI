import { Component, Input } from '@angular/core';
import { IconDefinition, faFileLines, faScrewdriverWrench, faWeightHanging } from '@fortawesome/free-solid-svg-icons';
import { AssessmentReport } from '../../calculations/assessmentReport';
import { LocaleService } from 'src/app/shared/shared-services/locale.service';
import { Subscription } from 'rxjs';
import { CompanyIdbService } from 'src/app/indexed-db/company-idb.service';

@Component({
    selector: 'app-assessment-savings-table',
    templateUrl: './assessment-savings-table.component.html',
    styleUrl: './assessment-savings-table.component.css',
    standalone: false
})
export class AssessmentSavingsTableComponent {
  @Input({required: true})
  assessmentReport: AssessmentReport;


  faWeightHanging: IconDefinition = faWeightHanging;
  faScrewdriverWrench: IconDefinition = faScrewdriverWrench;
  faFileLines: IconDefinition = faFileLines;

  currencyCode: string;
  currencySub: Subscription;

  companyEnergyUnit: string;
  companySub: Subscription;

  constructor(
    private localeService: LocaleService,
    private companyIdbService: CompanyIdbService
  ) {}

  ngOnInit() {
    this.currencySub = this.localeService.currencyCode.subscribe(code => {
      this.currencyCode = code;
    });

    this.companySub = this.companyIdbService.selectedCompany.subscribe(company => {
      if (company) {
        this.companyEnergyUnit = company.companyEnergyUnit;
      }
    });
  }

  ngOnDestroy() {
    if (this.currencySub) {
      this.currencySub.unsubscribe();
    }
  }
}
