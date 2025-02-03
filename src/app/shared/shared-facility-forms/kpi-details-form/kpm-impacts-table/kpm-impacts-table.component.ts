import { Component, Input } from '@angular/core';
import { faChevronDown, faChevronRight, faDollar, faFileLines, faScrewdriverWrench, faWeightHanging, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';
import { AssessmentIdbService } from 'src/app/indexed-db/assessment-idb.service';
import { EnergyOpportunityIdbService } from 'src/app/indexed-db/energy-opportunity-idb.service';
import { KeyPerformanceMetricImpactsIdbService } from 'src/app/indexed-db/key-performance-metric-impacts-idb.service';
import { NonEnergyBenefitsIdbService } from 'src/app/indexed-db/non-energy-benefits-idb.service';
import { IdbAssessment } from 'src/app/models/assessment';
import { IdbEnergyOpportunity } from 'src/app/models/energyOpportunity';
import { IdbKeyPerformanceMetricImpact } from 'src/app/models/keyPerformanceMetricImpact';
import { IdbNonEnergyBenefit } from 'src/app/models/nonEnergyBenefit';

@Component({
  selector: 'app-kpm-impacts-table',
  templateUrl: './kpm-impacts-table.component.html',
  styleUrl: './kpm-impacts-table.component.css'
})
export class KpmImpactsTableComponent {
  @Input({ required: true })
  kpmGuid: string;

  faScrewdriverWrench: IconDefinition = faScrewdriverWrench;
  faWeightHanging: IconDefinition = faWeightHanging;
  faFileLines: IconDefinition = faFileLines;
  faDollar: IconDefinition = faDollar;
  faChevronRight: IconDefinition = faChevronRight;
  faChevronDown: IconDefinition = faChevronDown;

  displayTable: boolean = true;

  keyPerformanceMetricImpacts: Array<IdbKeyPerformanceMetricImpact>;
  keyPerformanceMetricImpactsSub: Subscription;

  assessments: Array<IdbAssessment>;
  assessmentsSub: Subscription;

  energyOpportunities: Array<IdbEnergyOpportunity>;
  energyOpportunitiesSub: Subscription;

  nonEnergyBenefits: Array<IdbNonEnergyBenefit>;
  nonEnergyBenefitsSub: Subscription;
  constructor(
    private keyPerformanceMetricImpactIdbService: KeyPerformanceMetricImpactsIdbService,
    private assessmentIdbService: AssessmentIdbService,
    private energyOpportunityIdbService: EnergyOpportunityIdbService,
    private nonEnergyBenefitsIdbService: NonEnergyBenefitsIdbService
  ) {

  }

  ngOnInit() {
    this.keyPerformanceMetricImpactsSub = this.keyPerformanceMetricImpactIdbService.keyPerformanceMetricImpacts.subscribe(_keyPerformanceMetricImpacts => {
      this.keyPerformanceMetricImpacts = _keyPerformanceMetricImpacts;
    });

    this.assessmentsSub = this.assessmentIdbService.assessments.subscribe(_assessments => {
      this.assessments = _assessments;
    });

    this.energyOpportunitiesSub = this.energyOpportunityIdbService.energyOpportunities.subscribe(_energyOpps => {
      this.energyOpportunities = _energyOpps;
    });

    this.nonEnergyBenefitsSub = this.nonEnergyBenefitsIdbService.nonEnergyBenefits.subscribe(_nebs => {
      this.nonEnergyBenefits = _nebs;
    })
  }

  ngOnDestroy() {
    this.keyPerformanceMetricImpactsSub.unsubscribe();
    this.assessmentsSub.unsubscribe();
    this.energyOpportunitiesSub.unsubscribe();
    this.nonEnergyBenefitsSub.unsubscribe();
  }

  toggleDisplayTable(){
    this.displayTable = !this.displayTable;
  }
}
