import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IconDefinition, faBullseye, faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { IdbOnSiteVisit } from 'src/app/models/onSiteVisit';
import { OnSiteVisitIdbService } from 'src/app/indexed-db/on-site-visit-idb.service';
import { CompanyIdbService } from 'src/app/indexed-db/company-idb.service';
import { KeyPerformanceIndicatorsIdbService } from 'src/app/indexed-db/key-performance-indicators-idb.service';
import { IdbKeyPerformanceIndicator } from 'src/app/models/keyPerformanceIndicator';
import * as _ from 'lodash';
import { Subscription } from 'rxjs';
import { IdbCompany } from 'src/app/models/company';

@Component({
  selector: 'app-facility-kpi-details',
  templateUrl: './facility-kpi-details.component.html',
  styleUrl: './facility-kpi-details.component.css'
})
export class FacilityKpiDetailsComponent {

  faChevronRight: IconDefinition = faChevronRight;
  faChevronLeft: IconDefinition = faChevronLeft;

  keyPerformanceIndicator: IdbKeyPerformanceIndicator;
  faBullseye: IconDefinition = faBullseye;

  companySub: Subscription;
  company: IdbCompany;

  indicatorIndex: number;
  numCompanyKpis: number;

  constructor(private router: Router,
    private onSiteVisitIdbService: OnSiteVisitIdbService,
    private keyPerformanceIndicatorIdbService: KeyPerformanceIndicatorsIdbService,
    private activatedRoute: ActivatedRoute,
    private companyIdbService: CompanyIdbService,
  ) {
  }

  ngOnInit() {
    this.companySub = this.companyIdbService.selectedCompany.subscribe(_company => {
      this.company = _company;
    });

    this.activatedRoute.params.subscribe(params => {
      let kpiGuid: string = params['id'];
      this.keyPerformanceIndicator = this.keyPerformanceIndicatorIdbService.getByGuid(kpiGuid);
      this.setIndexValues();
    });
  }

  ngOnDestroy() {
    this.companySub.unsubscribe();
  }

  goBack() {
    if (this.indicatorIndex == 0) {
      let onSiteVisit: IdbOnSiteVisit = this.onSiteVisitIdbService.selectedVisit.getValue();
      this.router.navigateByUrl('setup-wizard/pre-visit/' + onSiteVisit.guid + '/kpi-select');
    } else {
      let companyKpis: Array<IdbKeyPerformanceIndicator> = this.getCompanyKPIs();
      this.goToKPI(companyKpis[this.indicatorIndex - 1].guid);
    }
  }

  goNext() {
    if (this.numCompanyKpis - 1 == this.indicatorIndex) {
      this.goToFacility();
    } else {
      let companyKpis: Array<IdbKeyPerformanceIndicator> = this.getCompanyKPIs();
      this.goToKPI(companyKpis[this.indicatorIndex + 1].guid);
    }
  }

  goToKPI(kpiGUID: string) {
    let onSiteVisit: IdbOnSiteVisit = this.onSiteVisitIdbService.selectedVisit.getValue();
    this.router.navigateByUrl('setup-wizard/pre-visit/' + onSiteVisit.guid + '/kpi-detail/' + kpiGUID);
  }

  goToFacility() {
    let onSiteVisit: IdbOnSiteVisit = this.onSiteVisitIdbService.selectedVisit.getValue();
    this.router.navigateByUrl('setup-wizard/pre-visit/' + onSiteVisit.guid + '/facility-setup');
  }

  setIndexValues() {
    let companyKpis: Array<IdbKeyPerformanceIndicator> = this.getCompanyKPIs();
    this.numCompanyKpis = companyKpis.length;
    this.indicatorIndex = companyKpis.findIndex(kpi => {
      return kpi.guid == this.keyPerformanceIndicator.guid
    });
  }

  getCompanyKPIs(): Array<IdbKeyPerformanceIndicator> {
    let kpis: Array<IdbKeyPerformanceIndicator> = this.keyPerformanceIndicatorIdbService.keyPerformanceIndicators.getValue();
    return kpis.filter(kpi => {
      return kpi.companyId == this.company.guid
    });
  }
}
