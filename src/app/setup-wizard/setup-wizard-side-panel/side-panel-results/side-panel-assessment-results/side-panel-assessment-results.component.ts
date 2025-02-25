import { Component, Input, SimpleChanges } from '@angular/core';
import { faFileLines, faScrewdriverWrench, faWeightHanging, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';
import { AssessmentIdbService } from 'src/app/indexed-db/assessment-idb.service';
import { CompanyIdbService } from 'src/app/indexed-db/company-idb.service';
import { EnergyOpportunityIdbService } from 'src/app/indexed-db/energy-opportunity-idb.service';
import { KeyPerformanceIndicatorsIdbService } from 'src/app/indexed-db/key-performance-indicators-idb.service';
import { KeyPerformanceMetricImpactsIdbService } from 'src/app/indexed-db/key-performance-metric-impacts-idb.service';
import { NonEnergyBenefitsIdbService } from 'src/app/indexed-db/non-energy-benefits-idb.service';
import { IdbAssessment } from 'src/app/models/assessment';
import { IdbCompany } from 'src/app/models/company';
import { IdbEnergyOpportunity } from 'src/app/models/energyOpportunity';
import { IdbKeyPerformanceMetricImpact } from 'src/app/models/keyPerformanceMetricImpact';
import { IdbNonEnergyBenefit } from 'src/app/models/nonEnergyBenefit';
import { KeyPerformanceMetric } from 'src/app/shared/constants/keyPerformanceMetrics';
import { AssessmentReport, getAssessmentReport } from 'src/app/shared/reports/calculations/assessmentReport';

@Component({
  selector: 'app-side-panel-assessment-results',
  standalone: false,

  templateUrl: './side-panel-assessment-results.component.html',
  styleUrl: './side-panel-assessment-results.component.css'
})
export class SidePanelAssessmentResultsComponent {
  @Input({ required: true })
  selectedAssessmentId: string;

  faScrewdriverWrench: IconDefinition = faScrewdriverWrench;
  faFileLines: IconDefinition = faFileLines;
  faWeightHanging: IconDefinition = faWeightHanging;

  assessmentReport: AssessmentReport;

  energyOpportunities: Array<IdbEnergyOpportunity>;
  energyOpportunitiesSub: Subscription;

  nonEnergyBenefits: Array<IdbNonEnergyBenefit>;
  nonEnergyBenefitsSub: Subscription;

  keyPerformanceMetrics: Array<KeyPerformanceMetric>;
  keyPerformanceMetricsSub: Subscription;

  keyPerformanceMetricImpacts: Array<IdbKeyPerformanceMetricImpact>;
  keyPerformanceMetricImpactsSub: Subscription;

  onInit: boolean = true;
  percentSavings: number;
  percentSavingsNebs: number;

  assessmentsSub: Subscription;
  assessments: Array<IdbAssessment>

  assessment: IdbAssessment;
  constructor(private energyOpportunityIdbService: EnergyOpportunityIdbService,
    private nonEnergyBenefitIdbService: NonEnergyBenefitsIdbService,
    private keyPerformanceIndicatorIdbService: KeyPerformanceIndicatorsIdbService,
    private keyPerformanceMetricImpactsIdbService: KeyPerformanceMetricImpactsIdbService,
    private assessmentIdbService: AssessmentIdbService,
    private companyIdbService: CompanyIdbService
  ) {

  }

  ngOnInit() {
    this.assessmentsSub = this.assessmentIdbService.assessments.subscribe(assessments => {
      this.setReportResults();
    })

    this.energyOpportunitiesSub = this.energyOpportunityIdbService.energyOpportunities.subscribe(opportunities => {
      this.energyOpportunities = opportunities;
      this.setReportResults();
    });
    this.nonEnergyBenefitsSub = this.nonEnergyBenefitIdbService.nonEnergyBenefits.subscribe(nebs => {
      this.nonEnergyBenefits = nebs;
      this.setReportResults();
    });
    this.keyPerformanceMetricsSub = this.keyPerformanceIndicatorIdbService.keyPerformanceIndicators.subscribe(() => {
      let company: IdbCompany = this.companyIdbService.selectedCompany.getValue();
      this.keyPerformanceMetrics = this.keyPerformanceIndicatorIdbService.getCompanyKeyPerformanceMetrics(company.guid);
      this.setReportResults();
    });
    this.keyPerformanceMetricImpactsSub = this.keyPerformanceMetricImpactsIdbService.keyPerformanceMetricImpacts.subscribe(impacts => {
      this.keyPerformanceMetricImpacts = impacts
      this.setReportResults();
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['selectedAssessmentId'] && !changes['selectedAssessmentId'].firstChange) {
      this.setReportResults();
    }
  }

  ngOnDestroy() {
    this.energyOpportunitiesSub.unsubscribe();
    this.nonEnergyBenefitsSub.unsubscribe();
    this.keyPerformanceMetricsSub.unsubscribe();
    this.keyPerformanceMetricImpactsSub.unsubscribe();
  }

  setReportResults() {
    if (this.energyOpportunities && this.nonEnergyBenefits && this.keyPerformanceMetrics && this.keyPerformanceMetricImpacts && this.selectedAssessmentId) {
      this.assessment = this.assessmentIdbService.getByGuid(this.selectedAssessmentId);
      this.assessmentReport = getAssessmentReport(this.assessment, this.energyOpportunities, this.nonEnergyBenefits, this.keyPerformanceMetrics, this.keyPerformanceMetricImpacts);
      this.percentSavings = (this.assessmentReport.totalEnergyCostSavings / this.assessmentReport.assessment.cost) * 100;
      this.percentSavingsNebs = (this.assessmentReport.totalCostSavings / this.assessmentReport.assessment.cost) * 100
    }
  }
}
