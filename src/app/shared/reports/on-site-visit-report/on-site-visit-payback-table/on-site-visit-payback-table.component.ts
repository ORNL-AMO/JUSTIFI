import { Component, Input } from '@angular/core';
import { OnSiteVisitReport } from '../../calculations/visitReport';
import { Subscription } from 'rxjs';
import { LocaleService } from 'src/app/shared/shared-services/locale.service';

@Component({
    selector: 'app-on-site-visit-payback-table',
    templateUrl: './on-site-visit-payback-table.component.html',
    styleUrl: './on-site-visit-payback-table.component.css',
    standalone: false
})
export class OnSiteVisitPaybackTableComponent {
  @Input({ required: true })
  onSiteVisitReport: OnSiteVisitReport;

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
