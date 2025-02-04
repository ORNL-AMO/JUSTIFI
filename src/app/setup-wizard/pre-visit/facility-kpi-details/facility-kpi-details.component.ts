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
import { IdbFacility } from 'src/app/models/facility';
import { FacilityIdbService } from 'src/app/indexed-db/facility-idb.service';

@Component({
    selector: 'app-facility-kpi-details',
    templateUrl: './facility-kpi-details.component.html',
    styleUrl: './facility-kpi-details.component.css',
    standalone: false
})
export class FacilityKpiDetailsComponent {

  faChevronRight: IconDefinition = faChevronRight;
  faChevronLeft: IconDefinition = faChevronLeft;

  keyPerformanceIndicator: IdbKeyPerformanceIndicator;
  faBullseye: IconDefinition = faBullseye;

  facilitySub: Subscription;
  facility: IdbFacility;

  indicatorIndex: number;
  numFacilityKpis: number;

  constructor(private router: Router,
    private onSiteVisitIdbService: OnSiteVisitIdbService,
    private keyPerformanceIndicatorIdbService: KeyPerformanceIndicatorsIdbService,
    private activatedRoute: ActivatedRoute,
    private facilityIdbService: FacilityIdbService,
  ) {
  }

  ngOnInit() {
    this.facilitySub = this.facilityIdbService.selectedFacility.subscribe(facility => {
      this.facility = facility;
    });

    this.activatedRoute.params.subscribe(params => {
      let kpiGuid: string = params['id'];
      this.keyPerformanceIndicator = this.keyPerformanceIndicatorIdbService.getByGuid(kpiGuid);
      this.setIndexValues();
    });
  }

  ngOnDestroy() {
    this.facilitySub.unsubscribe();
  }

  async goBack() {
    if (this.indicatorIndex == 0) {
      let onSiteVisit: IdbOnSiteVisit = this.onSiteVisitIdbService.selectedVisit.getValue();
      this.router.navigateByUrl('setup-wizard/pre-visit/' + onSiteVisit.guid + '/kpi-select');
    } else {
      let facilityKpis: Array<IdbKeyPerformanceIndicator> = this.getFacilityKPIs();
      await this.goToKPI(facilityKpis[this.indicatorIndex - 1].guid);
    }
  }

  async goNext() {
    if (this.numFacilityKpis - 1 == this.indicatorIndex) {
      await this.goToSystemInventory();
    } else {
      let facilityKpis: Array<IdbKeyPerformanceIndicator> = this.getFacilityKPIs();
      this.goToKPI(facilityKpis[this.indicatorIndex + 1].guid);
    }
  }

  goToKPI(kpiGUID: string) {
    let onSiteVisit: IdbOnSiteVisit = this.onSiteVisitIdbService.selectedVisit.getValue();
    this.router.navigateByUrl('setup-wizard/pre-visit/' + onSiteVisit.guid + '/facility-kpi-detail/' + kpiGUID);
  }

  async goToSystemInventory() {
    let onSiteVisit: IdbOnSiteVisit = this.onSiteVisitIdbService.selectedVisit.getValue();
    if (!this.facility.sidebarSystemInventoryOpen) {
      this.facility.sidebarSystemInventoryOpen = true;
      this.facility.sidebarKPIsOpen = false;
      await this.facilityIdbService.asyncUpdate(this.facility);
    }
    this.router.navigateByUrl('setup-wizard/pre-visit/' + onSiteVisit.guid + '/facility-energy-equipment');
  }

  setIndexValues() {
    let facilityKpis: Array<IdbKeyPerformanceIndicator> = this.getFacilityKPIs();
    this.numFacilityKpis = facilityKpis.length;
    this.indicatorIndex = facilityKpis.findIndex(kpi => {
      return kpi.guid == this.keyPerformanceIndicator.guid
    });
  }

  getFacilityKPIs(): Array<IdbKeyPerformanceIndicator> {
    let kpis: Array<IdbKeyPerformanceIndicator> = this.keyPerformanceIndicatorIdbService.keyPerformanceIndicators.getValue();
    return kpis.filter(kpi => {
      return kpi.facilityId == this.facility.guid
    });
  }
}
