import { Component } from '@angular/core';
import { faMoneyBillWave, faPlus, faSearchPlus, faWeightHanging, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { firstValueFrom, Subscription } from 'rxjs';
import { AssessmentIdbService } from 'src/app/indexed-db/assessment-idb.service';
import { ContactIdbService } from 'src/app/indexed-db/contact-idb.service';
import { EnergyOpportunityIdbService } from 'src/app/indexed-db/energy-opportunity-idb.service';
import { KeyPerformanceIndicatorsIdbService } from 'src/app/indexed-db/key-performance-indicators-idb.service';
import { KeyPerformanceMetricImpactsIdbService } from 'src/app/indexed-db/key-performance-metric-impacts-idb.service';
import { NonEnergyBenefitsIdbService } from 'src/app/indexed-db/non-energy-benefits-idb.service';
import { OnSiteVisitIdbService } from 'src/app/indexed-db/on-site-visit-idb.service';
import { ReportIdbService } from 'src/app/indexed-db/report-idb.service';
import { IdbAssessment } from 'src/app/models/assessment';
import { IdbContact } from 'src/app/models/contact';
import { IdbEnergyOpportunity } from 'src/app/models/energyOpportunity';
import { IdbKeyPerformanceMetricImpact } from 'src/app/models/keyPerformanceMetricImpact';
import { getNewIdbNonEnergyBenefit, IdbNonEnergyBenefit } from 'src/app/models/nonEnergyBenefit';
import { IdbOnSiteVisit } from 'src/app/models/onSiteVisit';
import { KeyPerformanceMetric } from 'src/app/shared/constants/keyPerformanceMetrics';
import { SharedDataService } from 'src/app/shared/shared-services/shared-data.service';

@Component({
  selector: 'app-assessment-nebs-home',
  templateUrl: './assessment-nebs-home.component.html',
  styleUrl: './assessment-nebs-home.component.css',
  standalone: false
})
export class AssessmentNebsHomeComponent {

  faPlus: IconDefinition = faPlus;
  faWeightHanging: IconDefinition = faWeightHanging;
  faSearchPlus: IconDefinition = faSearchPlus;
  faMoneyBillWave: IconDefinition = faMoneyBillWave;

  assessment: IdbAssessment;
  assessmentSub: Subscription;

  nonEnergyBenefits: Array<IdbNonEnergyBenefit>;

  keyPerformanceMetricImpacts: Array<IdbKeyPerformanceMetricImpact>;
  keyPerformanceMetricImpactsSub: Subscription;

  contacts: Array<IdbContact>;
  contactsSub: Subscription;

  nonEnergyBenefitsSub: Subscription;
  showAddNebDropdown: boolean = false;
  keyPerformanceMetrics: Array<KeyPerformanceMetric>;
  keyPerformanceIndicatorsSub: Subscription;

  energyOpportunities: Array<IdbEnergyOpportunity>;
  energyOpportunitiesSub: Subscription;
  constructor(private assessmentIdbService: AssessmentIdbService,
    private nonEnergyBenefitsIdbService: NonEnergyBenefitsIdbService,
    private sharedDataService: SharedDataService,
    private keyPerformanceMetricImpactsIdbService: KeyPerformanceMetricImpactsIdbService,
    private contactIdbService: ContactIdbService,
    private keyPerformanceIndicatorsIdbService: KeyPerformanceIndicatorsIdbService,
    private energyOpportunityIdbService: EnergyOpportunityIdbService,
    private onSiteVisitIdbService: OnSiteVisitIdbService,
    private reportIdbService: ReportIdbService

  ) { }

  ngOnInit() {
    this.assessmentSub = this.assessmentIdbService.selectedAssessment.subscribe(assessment => {
      this.assessment = assessment;
    });

    this.nonEnergyBenefitsSub = this.nonEnergyBenefitsIdbService.nonEnergyBenefits.subscribe(nebs => {
      this.nonEnergyBenefits = nebs.filter(neb => {
        return neb.assessmentId == this.assessment.guid;
      });
    });

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
    this.assessmentSub.unsubscribe();
    this.nonEnergyBenefitsSub.unsubscribe();
    this.keyPerformanceMetricImpactsSub.unsubscribe();
    this.contactsSub.unsubscribe();
    this.keyPerformanceIndicatorsSub.unsubscribe();
    this.energyOpportunitiesSub.unsubscribe();
  }

  showSuggestedNEBs() {
    this.showAddNebDropdown = false;
    this.sharedDataService.displayAddNebsModal.next({
      assessmentId: this.assessment.guid,
      energyOpportunityId: undefined
    });
  }

  async addNEB(isRebate: boolean) {
    this.showAddNebDropdown = false;
    let newNonEnergyBenefit: IdbNonEnergyBenefit = getNewIdbNonEnergyBenefit(this.assessment.userId, this.assessment.companyId, this.assessment.facilityId, this.assessment.guid, undefined, undefined, true);
    if (isRebate) {
      newNonEnergyBenefit.costImpactType = 'oneTime';
      newNonEnergyBenefit.name = 'One-time Incentive';
    }
    await firstValueFrom(this.nonEnergyBenefitsIdbService.addWithObservable(newNonEnergyBenefit));
    let onSiteVisit: IdbOnSiteVisit = this.onSiteVisitIdbService.getByAssessmentGUID(newNonEnergyBenefit.assessmentId);
    await this.reportIdbService.addNonEnergyBenefit(newNonEnergyBenefit, onSiteVisit.guid);
    await this.nonEnergyBenefitsIdbService.setNonEnergyBenefits();
  }

  toggleAddNebDropdown() {
    this.showAddNebDropdown = !this.showAddNebDropdown;
  }
}
