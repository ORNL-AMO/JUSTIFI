import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IconDefinition, faChartBar, faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { IdbOnSiteVisit } from 'src/app/models/onSiteVisit';
import { OnSiteVisitIdbService } from 'src/app/indexed-db/on-site-visit-idb.service';
import { KeyPerformanceIndicatorsIdbService } from 'src/app/indexed-db/key-performance-indicators-idb.service';
import { IdbKeyPerformanceIndicator } from 'src/app/models/keyPerformanceIndicator';
import { Subscription } from 'rxjs';
import { FacilityIdbService } from 'src/app/indexed-db/facility-idb.service';
import { IdbFacility } from 'src/app/models/facility';

@Component({
  selector: 'app-facility-kpi-select',
  templateUrl: './facility-kpi-select.component.html',
  styleUrl: './facility-kpi-select.component.css'
})
export class FacilityKpiSelectComponent {
  faChartBar: IconDefinition = faChartBar;
  faChevronRight: IconDefinition = faChevronRight;
  faChevronLeft: IconDefinition = faChevronLeft;

  facilityKpiSub: Subscription;
  facilityKpis: Array<IdbKeyPerformanceIndicator>;
  onSiteVisit: IdbOnSiteVisit;
  constructor(private router: Router,
    private onSiteVisitIdbService: OnSiteVisitIdbService,
    private keyPerformanceIndicatorIdbService: KeyPerformanceIndicatorsIdbService,
    private facilityIdbService: FacilityIdbService
  ) { }

  ngOnInit() {
    this.onSiteVisit = this.onSiteVisitIdbService.selectedVisit.getValue();
    this.facilityKpiSub = this.keyPerformanceIndicatorIdbService.keyPerformanceIndicators.subscribe(kpis => {
      this.facilityKpis = kpis.filter(kpi => {
        return kpi.facilityId == this.onSiteVisit.facilityId
      });
    });
  }

  ngOnDestroy() {
    this.facilityKpiSub.unsubscribe();
  }

  async goBack() {
    await this.collapseKpi();
    let onSiteVisit: IdbOnSiteVisit = this.onSiteVisitIdbService.selectedVisit.getValue();
    this.router.navigateByUrl('setup-wizard/pre-visit/' + onSiteVisit.guid + '/facility-setup');
  }

  async goToKpiDetails() {
    if (this.facilityKpis.length > 0) {
      this.router.navigateByUrl('setup-wizard/pre-visit/' + this.onSiteVisit.guid + '/facility-kpi-detail/' + this.facilityKpis[0].guid);
    } else {
      await this.collapseKpi();
      this.router.navigateByUrl('setup-wizard/pre-visit/' + this.onSiteVisit.guid + '/facility-energy-equipment');
    }
  }

  async collapseKpi() {
    let facility: IdbFacility = this.facilityIdbService.selectedFacility.getValue();
    if (facility.sidebarKPIsOpen) {
      facility.sidebarKPIsOpen = false;
      await this.facilityIdbService.asyncUpdate(facility);
    }
  }
}
