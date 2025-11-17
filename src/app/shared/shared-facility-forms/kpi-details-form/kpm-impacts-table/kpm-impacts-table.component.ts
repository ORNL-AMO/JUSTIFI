import { Component, Input } from '@angular/core';
import { faChevronDown, faChevronRight, faDollar, faFileLines, faScrewdriverWrench, faWeightHanging, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';
import { AssessmentIdbService } from 'src/app/indexed-db/assessment-idb.service';
import { EnergyOpportunityIdbService } from 'src/app/indexed-db/energy-opportunity-idb.service';
import { FacilityIdbService } from 'src/app/indexed-db/facility-idb.service';
import { KeyPerformanceIndicatorsIdbService } from 'src/app/indexed-db/key-performance-indicators-idb.service';
import { KeyPerformanceMetricImpactsIdbService } from 'src/app/indexed-db/key-performance-metric-impacts-idb.service';
import { NonEnergyBenefitsIdbService } from 'src/app/indexed-db/non-energy-benefits-idb.service';
import { IdbAssessment } from 'src/app/models/assessment';
import { IdbEnergyOpportunity } from 'src/app/models/energyOpportunity';
import { IdbKeyPerformanceMetricImpact } from 'src/app/models/keyPerformanceMetricImpact';
import { IdbNonEnergyBenefit } from 'src/app/models/nonEnergyBenefit';
import { KeyPerformanceMetric } from 'src/app/shared/constants/keyPerformanceMetrics';
import { LocaleService } from 'src/app/shared/shared-services/locale.service';

@Component({
  selector: 'app-kpm-impacts-table',
  templateUrl: './kpm-impacts-table.component.html',
  styleUrl: './kpm-impacts-table.component.css',
  standalone: false
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

  currencyCode: string;
  currencySub: Subscription;

  facilitySub: Subscription;
  keyPerformanceMetric: KeyPerformanceMetric;
  constructor(
    private keyPerformanceMetricImpactIdbService: KeyPerformanceMetricImpactsIdbService,
    private assessmentIdbService: AssessmentIdbService,
    private energyOpportunityIdbService: EnergyOpportunityIdbService,
    private nonEnergyBenefitsIdbService: NonEnergyBenefitsIdbService,
    private localeService: LocaleService,
    private facilityIdbService: FacilityIdbService,
    private keyPerformanceIndicatorIdbService: KeyPerformanceIndicatorsIdbService
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
    });

    this.currencySub = this.localeService.currencyCode.subscribe(code => {
      this.currencyCode = code;
    });

    this.facilitySub = this.facilityIdbService.selectedFacility.subscribe(facility => {
      if (facility && facility.isExample) {
        this.displayTable = false;
      }
      this.keyPerformanceMetric = this.keyPerformanceIndicatorIdbService.getKeyPerformanceMetric( facility.guid, this.kpmGuid)
    });
  }

  ngOnDestroy() {
    this.keyPerformanceMetricImpactsSub.unsubscribe();
    this.assessmentsSub.unsubscribe();
    this.energyOpportunitiesSub.unsubscribe();
    this.nonEnergyBenefitsSub.unsubscribe();
    this.currencySub.unsubscribe();
  }

  toggleDisplayTable() {
    this.displayTable = !this.displayTable;
  }
}
