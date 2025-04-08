import { Component, Input } from '@angular/core';
import { AssessmentReport } from '../../calculations/assessmentReport';
import { CompanyIdbService } from 'src/app/indexed-db/company-idb.service';
import { LocaleService } from 'src/app/shared/shared-services/locale.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-assessment-cost-table',
  standalone: false,
  
  templateUrl: './assessment-cost-table.component.html',
  styleUrl: './assessment-cost-table.component.css'
})
export class AssessmentCostTableComponent {
  @Input({required: true})
  assessmentReport: AssessmentReport;

  currencySub: Subscription;
  currencyCode: string;

  companySub: Subscription;
  companyEnergyUnit: string;

  constructor(
    private companyIdbService: CompanyIdbService,
    private localeService: LocaleService
  ) { }

  ngOnInit() {
    this.companySub = this.companyIdbService.selectedCompany.subscribe(company => {
      if (company) {
        this.companyEnergyUnit = company.companyEnergyUnit;
      }
    });
    this.currencySub = this.localeService.currencyCode.subscribe(code => {
      this.currencyCode = code;
    });
  }

}
