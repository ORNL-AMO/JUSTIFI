import { Component, Input } from '@angular/core';
import { faWeightHanging, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';
import { IdbContact } from 'src/app/models/contact';
import { IdbKeyPerformanceMetricImpact } from 'src/app/models/keyPerformanceMetricImpact';
import { IdbNonEnergyBenefit } from 'src/app/models/nonEnergyBenefit';
import { KeyPerformanceMetric } from '../../constants/keyPerformanceMetrics';
import { IdbEnergyOpportunity } from 'src/app/models/energyOpportunity';
import { KeyPerformanceMetricImpactsIdbService } from 'src/app/indexed-db/key-performance-metric-impacts-idb.service';
import { ContactIdbService } from 'src/app/indexed-db/contact-idb.service';
import { KeyPerformanceIndicatorsIdbService } from 'src/app/indexed-db/key-performance-indicators-idb.service';
import { EnergyOpportunityIdbService } from 'src/app/indexed-db/energy-opportunity-idb.service';
import { Router } from '@angular/router';
import { IdbOnSiteVisit } from 'src/app/models/onSiteVisit';
import { OnSiteVisitIdbService } from 'src/app/indexed-db/on-site-visit-idb.service';
import { LocalStorageDataService } from '../../shared-services/local-storage-data.service';

@Component({
  selector: 'app-energy-opportunity-nebs-table',
  templateUrl: './energy-opportunity-nebs-table.component.html',
  styleUrl: './energy-opportunity-nebs-table.component.css'
})
export class EnergyOpportunityNebsTableComponent {
  @Input({ required: true })
  nonEnergyBenefits: Array<IdbNonEnergyBenefit>;
  @Input()
  inDashboard: boolean;

  faWeightHanging: IconDefinition = faWeightHanging;

  keyPerformanceMetricImpacts: Array<IdbKeyPerformanceMetricImpact>;
  keyPerformanceMetricImpactsSub: Subscription;

  contacts: Array<IdbContact>;
  contactsSub: Subscription;

  keyPerformanceMetrics: Array<KeyPerformanceMetric>;
  keyPerformanceIndicatorsSub: Subscription;

  energyOpportunities: Array<IdbEnergyOpportunity>;
  energyOpportunitiesSub: Subscription;

  constructor(private keyPerformanceMetricImpactsIdbService: KeyPerformanceMetricImpactsIdbService,
    private contactIdbService: ContactIdbService,
    private keyPerformanceIndicatorsIdbService: KeyPerformanceIndicatorsIdbService,
    private energyOpportunityIdbService: EnergyOpportunityIdbService,
    private router: Router,
    private onSiteVisitIdbService: OnSiteVisitIdbService,
    private localStorageDataService: LocalStorageDataService
  ) { }

  ngOnInit() {
    this.keyPerformanceMetricImpactsSub = this.keyPerformanceMetricImpactsIdbService.keyPerformanceMetricImpacts.subscribe(kpmImpacts => {
      this.keyPerformanceMetricImpacts = kpmImpacts;
    });

    this.contactsSub = this.contactIdbService.contacts.subscribe(contacts => {
      this.contacts = contacts;
    });

    this.keyPerformanceIndicatorsSub = this.keyPerformanceIndicatorsIdbService.keyPerformanceIndicators.subscribe(kpis => {
      this.keyPerformanceMetrics = kpis.flatMap(kpi => {
        return kpi.performanceMetrics;
      })
    });

    this.energyOpportunitiesSub = this.energyOpportunityIdbService.energyOpportunities.subscribe(energyOpportunities => {
      this.energyOpportunities = energyOpportunities
    });
  }

  ngOnDestroy() {
    this.keyPerformanceMetricImpactsSub.unsubscribe();
    this.contactsSub.unsubscribe();
    this.keyPerformanceIndicatorsSub.unsubscribe();
    this.energyOpportunitiesSub.unsubscribe();
  }

  goToEnergyOpportunity(nonEnergyBenefit: IdbNonEnergyBenefit) {
    if (this.router.url.includes('portfolio')) {
      this.router.navigateByUrl('/portfolio/assessment/' + nonEnergyBenefit.assessmentId + '/energy-opportunities/' + nonEnergyBenefit.energyOpportunityId)
    } else if (this.router.url.includes('setup-wizard')) {
      let onSiteVisit: IdbOnSiteVisit = this.onSiteVisitIdbService.getByAssessmentGUID(nonEnergyBenefit.assessmentId);
      this.localStorageDataService.setEnergyOppAccordionGuid(nonEnergyBenefit.energyOpportunityId);
      this.localStorageDataService.setNebAccordionGuid(nonEnergyBenefit.guid);
      this.router.navigateByUrl('setup-wizard/data-collection/' + onSiteVisit.guid + '/assessment/' + nonEnergyBenefit.assessmentId + '/energy-opportunities')
    }
  }
}
