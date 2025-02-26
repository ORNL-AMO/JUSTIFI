import { Component, Input } from '@angular/core';
import { AssessmentReport } from '../../calculations/assessmentReport';
import { Subscription } from 'rxjs';
import { LocaleService } from 'src/app/shared/shared-services/locale.service';

@Component({
    selector: 'app-payback-table',
    templateUrl: './payback-table.component.html',
    styleUrl: './payback-table.component.css',
    standalone: false
})
export class PaybackTableComponent {
  @Input({required: true})
  assessmentReport: AssessmentReport;

  currencyCode: string;
  currencySub: Subscription;

  constructor(
    private localeService: LocaleService,
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
