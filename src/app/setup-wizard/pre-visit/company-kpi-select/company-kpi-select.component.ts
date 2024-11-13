import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IconDefinition, faChartBar, faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { IdbOnSiteVisit } from 'src/app/models/onSiteVisit';
import { OnSiteVisitIdbService } from 'src/app/indexed-db/on-site-visit-idb.service';
import { KeyPerformanceIndicatorsIdbService } from 'src/app/indexed-db/key-performance-indicators-idb.service';
import { IdbKeyPerformanceIndicator } from 'src/app/models/keyPerformanceIndicator';

@Component({
  selector: 'app-company-kpi-select',
  templateUrl: './company-kpi-select.component.html',
  styleUrl: './company-kpi-select.component.css'
})
export class CompanyKpiSelectComponent {
  faChartBar: IconDefinition = faChartBar;
  faChevronRight: IconDefinition = faChevronRight;
  faChevronLeft: IconDefinition = faChevronLeft;
  constructor(private router: Router,
    private onSiteVisitIdbService: OnSiteVisitIdbService,
    private keyPerformanceIndicatorIdbService: KeyPerformanceIndicatorsIdbService,
  ) { }

  ngOnInit() {
  }

  goBack() {
    let onSiteVisit: IdbOnSiteVisit = this.onSiteVisitIdbService.selectedVisit.getValue();
    this.router.navigateByUrl('setup-wizard/pre-visit/' + onSiteVisit.guid + '/company-contacts');
  }

  goToKpiDetails() {
    let onSiteVisit: IdbOnSiteVisit = this.onSiteVisitIdbService.selectedVisit.getValue();
    let keyPerformanceIndicators: Array<IdbKeyPerformanceIndicator> = this.keyPerformanceIndicatorIdbService.keyPerformanceIndicators.getValue();
    let companyKpis: Array<IdbKeyPerformanceIndicator> = keyPerformanceIndicators.filter(kpi => {
      return kpi.companyId == onSiteVisit.companyId
    });
    if (companyKpis.length > 0) {
      this.router.navigateByUrl('setup-wizard/pre-visit/' + onSiteVisit.guid + '/company-kpi-detail/' + companyKpis[0].guid);
    } else {
      this.router.navigateByUrl('setup-wizard/pre-visit/' + onSiteVisit.guid + '/facility-setup');
    }
  }
}
