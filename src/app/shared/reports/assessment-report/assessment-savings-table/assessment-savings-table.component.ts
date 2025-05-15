import { Component, Input } from '@angular/core';
import { IconDefinition, faFileLines, faScrewdriverWrench, faWeightHanging, faPlugCircleBolt, faWater, faMoneyBillWave } from '@fortawesome/free-solid-svg-icons';
import { AssessmentReport } from '../../calculations/assessmentReport';
import { LocaleService } from 'src/app/shared/shared-services/locale.service';
import { Subscription } from 'rxjs';

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
  faPlugCircleBolt: IconDefinition = faPlugCircleBolt;
  faWater: IconDefinition = faWater;
  faMoneyBillWave: IconDefinition = faMoneyBillWave;

  currencyCode: string;
  currencySub: Subscription;

  constructor(
    private localeService: LocaleService
  ) {}

  ngOnInit() {
    this.currencySub = this.localeService.currencyCode.subscribe(code => {
      this.currencyCode = code;
    });
  }

  ngOnDestroy() {
    if (this.currencySub) {
      this.currencySub.unsubscribe();
    }
  }
}
