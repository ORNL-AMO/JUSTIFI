import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IconDefinition, faChartBar, faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { IdbOnSiteVisit } from 'src/app/models/onSiteVisit';
import { OnSiteVisitIdbService } from 'src/app/indexed-db/on-site-visit-idb.service';
import { KeyPerformanceIndicatorsIdbService } from 'src/app/indexed-db/key-performance-indicators-idb.service';
import { IdbKeyPerformanceIndicator } from 'src/app/models/keyPerformanceIndicator';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-company-kpi-select',
  templateUrl: './company-kpi-select.component.html',
  styleUrl: './company-kpi-select.component.css'
})
export class CompanyKpiSelectComponent {
  faChartBar: IconDefinition = faChartBar;
  faChevronRight: IconDefinition = faChevronRight;
  faChevronLeft: IconDefinition = faChevronLeft;

  companyKpiSub: Subscription;
  companyKpis: Array<IdbKeyPerformanceIndicator>;
  onSiteVisit: IdbOnSiteVisit;
  constructor(private router: Router,
    private onSiteVisitIdbService: OnSiteVisitIdbService,
    private keyPerformanceIndicatorIdbService: KeyPerformanceIndicatorsIdbService,
  ) { }

  ngOnInit() {
    this.onSiteVisit = this.onSiteVisitIdbService.selectedVisit.getValue();
    this.companyKpiSub = this.keyPerformanceIndicatorIdbService.keyPerformanceIndicators.subscribe(kpis => {
      let keyPerformanceIndicators: Array<IdbKeyPerformanceIndicator> = this.keyPerformanceIndicatorIdbService.keyPerformanceIndicators.getValue();
      this.companyKpis = keyPerformanceIndicators.filter(kpi => {
        return kpi.companyId == this.onSiteVisit.companyId
      });
    });
  }

  ngOnDestroy(){
    this.companyKpiSub.unsubscribe();
  }

  goBack() {
    let onSiteVisit: IdbOnSiteVisit = this.onSiteVisitIdbService.selectedVisit.getValue();
    this.router.navigateByUrl('setup-wizard/pre-visit/' + onSiteVisit.guid + '/company-contacts');
  }

  goToKpiDetails() {
    if (this.companyKpis.length > 0) {
      this.router.navigateByUrl('setup-wizard/pre-visit/' + this.onSiteVisit.guid + '/company-kpi-detail/' + this.companyKpis[0].guid);
    } else {
      this.router.navigateByUrl('setup-wizard/pre-visit/' + this.onSiteVisit.guid + '/facility-setup');
    }
  }
}
