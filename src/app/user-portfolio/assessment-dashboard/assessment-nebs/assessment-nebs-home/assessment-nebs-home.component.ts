import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { faPlus, faSearchPlus, faWeightHanging, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { firstValueFrom, Subscription } from 'rxjs';
import { ToastNotificationsService } from 'src/app/core-components/toast-notifications/toast-notifications.service';
import { AssessmentIdbService } from 'src/app/indexed-db/assessment-idb.service';
import { ContactIdbService } from 'src/app/indexed-db/contact-idb.service';
import { EnergyOpportunityIdbService } from 'src/app/indexed-db/energy-opportunity-idb.service';
import { KeyPerformanceIndicatorsIdbService } from 'src/app/indexed-db/key-performance-indicators-idb.service';
import { KeyPerformanceMetricImpactsIdbService } from 'src/app/indexed-db/key-performance-metric-impacts-idb.service';
import { NonEnergyBenefitsIdbService } from 'src/app/indexed-db/non-energy-benefits-idb.service';
import { IdbAssessment } from 'src/app/models/assessment';
import { IdbContact } from 'src/app/models/contact';
import { IdbEnergyOpportunity } from 'src/app/models/energyOpportunity';
import { IdbKeyPerformanceMetricImpact } from 'src/app/models/keyPerformanceMetricImpact';
import { getNewIdbNonEnergyBenefit, IdbNonEnergyBenefit } from 'src/app/models/nonEnergyBenefit';
import { KeyPerformanceMetric } from 'src/app/shared/constants/keyPerformanceMetrics';
import { SharedDataService } from 'src/app/shared/shared-services/shared-data.service';

@Component({
  selector: 'app-assessment-nebs-home',
  templateUrl: './assessment-nebs-home.component.html',
  styleUrl: './assessment-nebs-home.component.css'
})
export class AssessmentNebsHomeComponent {

  faPlus: IconDefinition = faPlus;
  faWeightHanging: IconDefinition = faWeightHanging;
  faSearchPlus: IconDefinition = faSearchPlus;

  assessment: IdbAssessment;
  assessmentSub: Subscription;

  energyOppNonEnergyBenefits: Array<IdbNonEnergyBenefit>;
  assessmentNonEnergyBenefits: Array<IdbNonEnergyBenefit>;

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
    private router: Router,
    private toastNotificationsService: ToastNotificationsService,
    private sharedDataService: SharedDataService,
    private keyPerformanceMetricImpactsIdbService: KeyPerformanceMetricImpactsIdbService,
    private contactIdbService: ContactIdbService,
    private keyPerformanceIndicatorsIdbService: KeyPerformanceIndicatorsIdbService,
    private energyOpportunityIdbService: EnergyOpportunityIdbService

  ) { }

  ngOnInit() {
    this.assessmentSub = this.assessmentIdbService.selectedAssessment.subscribe(assessment => {
      this.assessment = assessment;
    });

    this.nonEnergyBenefitsSub = this.nonEnergyBenefitsIdbService.nonEnergyBenefits.subscribe(nebs => {
      this.assessmentNonEnergyBenefits = nebs.filter(neb => {
        return neb.assessmentId == this.assessment.guid && neb.energyOpportunityId == undefined;
      });
      this.energyOppNonEnergyBenefits = nebs.filter(neb => {
        return neb.assessmentId == this.assessment.guid && neb.energyOpportunityId;
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

  async addNEB() {
    this.showAddNebDropdown = false;
    let newNonEnergyBenefit: IdbNonEnergyBenefit = getNewIdbNonEnergyBenefit(this.assessment.userId, this.assessment.companyId, this.assessment.facilityId, this.assessment.guid, undefined, undefined, true);
    await firstValueFrom(this.nonEnergyBenefitsIdbService.addWithObservable(newNonEnergyBenefit));
    await this.nonEnergyBenefitsIdbService.setNonEnergyBenefits();
  }

  toggleAddNebDropdown() {
    this.showAddNebDropdown = !this.showAddNebDropdown;
  }
}
