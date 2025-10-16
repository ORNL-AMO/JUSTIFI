import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IconDefinition, faBullseye, faCircleQuestion, faPlus, faTrash, faUser } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';
import { DbChangesService } from 'src/app/indexed-db/db-changes.service';
import { FacilityIdbService } from 'src/app/indexed-db/facility-idb.service';
import { KeyPerformanceIndicatorsIdbService } from 'src/app/indexed-db/key-performance-indicators-idb.service';
import { KeyPerformanceMetricImpactsIdbService } from 'src/app/indexed-db/key-performance-metric-impacts-idb.service';
import { OnSiteVisitIdbService } from 'src/app/indexed-db/on-site-visit-idb.service';
import { IdbFacility } from 'src/app/models/facility';
import { IdbKeyPerformanceIndicator } from 'src/app/models/keyPerformanceIndicator';
import { IdbKeyPerformanceMetricImpact } from 'src/app/models/keyPerformanceMetricImpact';
import { IdbOnSiteVisit } from 'src/app/models/onSiteVisit';

@Component({
    selector: 'app-kpi-list',
    templateUrl: './kpi-list.component.html',
    styleUrl: './kpi-list.component.css',
    standalone: false
})
export class KpiListComponent {

  faTrash: IconDefinition = faTrash;
  faBullseye: IconDefinition = faBullseye;
  faUser: IconDefinition = faUser;
  faPlus: IconDefinition = faPlus;
  faCircleQuestion: IconDefinition = faCircleQuestion;

  facility: IdbFacility;
  facilitySub: Subscription;


  kpiToDelete: IdbKeyPerformanceIndicator;
  displayDeleteModal: boolean = false;

  keyPerformanceIndicators: Array<IdbKeyPerformanceIndicator>;
  keyPerformanceIndicatorSub: Subscription;

  keyPerformanceMetricImpacts: Array<IdbKeyPerformanceMetricImpact>
  keyPerformanceMetricImpactsSub: Subscription;
  constructor(
    private keyPerformanceIndicatorIdbService: KeyPerformanceIndicatorsIdbService,
    private dbChangesService: DbChangesService,
    private router: Router,
    private onSiteVisitIdbService: OnSiteVisitIdbService,
    private keyPerformanceMetricImpactsIdbService: KeyPerformanceMetricImpactsIdbService,
    private facilityIdbService: FacilityIdbService
  ) {
  }

  ngOnInit() {
    this.facilitySub = this.facilityIdbService.selectedFacility.subscribe(_facility => {
      this.facility = _facility;
    });
    this.keyPerformanceIndicatorSub = this.keyPerformanceIndicatorIdbService.keyPerformanceIndicators.subscribe(_keyPerformanceIndicators => {
      this.keyPerformanceIndicators = _keyPerformanceIndicators;
    });
    this.keyPerformanceMetricImpactsSub = this.keyPerformanceMetricImpactsIdbService.keyPerformanceMetricImpacts.subscribe(_kpmImpacts => {
      this.keyPerformanceMetricImpacts = _kpmImpacts;
    })
  }

  ngOnDestroy() {
    this.facilitySub.unsubscribe();
    this.keyPerformanceIndicatorSub.unsubscribe();
    this.keyPerformanceMetricImpactsSub.unsubscribe();
  }

  openDeleteModal(kpi: IdbKeyPerformanceIndicator) {
    this.kpiToDelete = kpi;
    this.displayDeleteModal = true;
  }

  closeDeleteModal() {
    this.displayDeleteModal = false;
    this.kpiToDelete = undefined;
  }

  async removeKPI() {
    await this.dbChangesService.deleteKPIs([this.kpiToDelete]);
    this.closeDeleteModal();
  }

  goToKpiDetails(kpi: IdbKeyPerformanceIndicator) {
    if (this.router.url.includes('portfolio')) {
      this.router.navigateByUrl('portfolio/facility/' + kpi.facilityId + '/performance-indicators/details/' + kpi.guid);
    } else {
      let onSiteVisit: IdbOnSiteVisit = this.onSiteVisitIdbService.selectedVisit.getValue();
      this.router.navigateByUrl('setup-wizard/pre-visit/' + onSiteVisit.guid + '/facility-kpi-detail/' + kpi.guid);
    }
  }

}
