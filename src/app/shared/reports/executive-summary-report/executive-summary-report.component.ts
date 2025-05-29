import { Component, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { AssessmentIdbService } from 'src/app/indexed-db/assessment-idb.service';
import { EnergyOpportunityIdbService } from 'src/app/indexed-db/energy-opportunity-idb.service';
import { KeyPerformanceIndicatorsIdbService } from 'src/app/indexed-db/key-performance-indicators-idb.service';
import { KeyPerformanceMetricImpactsIdbService } from 'src/app/indexed-db/key-performance-metric-impacts-idb.service';
import { NonEnergyBenefitsIdbService } from 'src/app/indexed-db/non-energy-benefits-idb.service';
import { IdbOnSiteVisit } from 'src/app/models/onSiteVisit';
import { IdbReport } from 'src/app/models/report';
import { SharedDataService } from '../../shared-services/shared-data.service';
import { ExecutiveSummaryReport, getExecutiveSummaryReport } from '../calculations/executiveSummaryReport';
import { IdbAssessment } from 'src/app/models/assessment';
import { IdbEnergyOpportunity } from 'src/app/models/energyOpportunity';
import { IdbNonEnergyBenefit } from 'src/app/models/nonEnergyBenefit';
import { KeyPerformanceMetric } from '../../constants/keyPerformanceMetrics';
import { IdbKeyPerformanceMetricImpact } from 'src/app/models/keyPerformanceMetricImpact';
import { IdbKeyPerformanceIndicator } from 'src/app/models/keyPerformanceIndicator';

@Component({
  selector: 'app-executive-summary-report',
  standalone: false,

  templateUrl: './executive-summary-report.component.html',
  styleUrl: './executive-summary-report.component.css'
})
export class ExecutiveSummaryReportComponent {
  @Input({ required: true })
  onSiteVisit: IdbOnSiteVisit;
  @Input()
  report: IdbReport;

  executiveSummaryReport: ExecutiveSummaryReport;

  print: boolean;
  printSub: Subscription;
  constructor(private assessmentIdbService: AssessmentIdbService,
    private energyOpportunityIdbService: EnergyOpportunityIdbService,
    private nonEnergyBenefitIdbService: NonEnergyBenefitsIdbService,
    private keyPerformanceIndicatorIdbService: KeyPerformanceIndicatorsIdbService,
    private keyPerformanceMetricImpactsIdbService: KeyPerformanceMetricImpactsIdbService,
    private sharedDataService: SharedDataService
  ) {

  }

  ngOnInit() {
    let allAssessments: Array<IdbAssessment> = this.assessmentIdbService.assessments.getValue();
    let allEnergyOpportunities: Array<IdbEnergyOpportunity> = this.energyOpportunityIdbService.energyOpportunities.getValue();
    let allNonEnergyBenefits: Array<IdbNonEnergyBenefit> = this.nonEnergyBenefitIdbService.nonEnergyBenefits.getValue();
    let facilityPerformanceMetrics: Array<KeyPerformanceMetric> = this.keyPerformanceIndicatorIdbService.getFacilityKeyPerformanceMetrics(this.onSiteVisit?.facilityId);
    let facilityPerformanceIndicators: Array<IdbKeyPerformanceIndicator> = this.keyPerformanceIndicatorIdbService.getByFacilityGuid(this.onSiteVisit?.facilityId);
    let keyPerformanceMetricImpacts: Array<IdbKeyPerformanceMetricImpact> = this.keyPerformanceMetricImpactsIdbService.keyPerformanceMetricImpacts.getValue();
    this.executiveSummaryReport = getExecutiveSummaryReport(this.onSiteVisit.visitDate, this.onSiteVisit.assessmentIds, allAssessments, allEnergyOpportunities, allNonEnergyBenefits, facilityPerformanceMetrics, facilityPerformanceIndicators, keyPerformanceMetricImpacts, this.report);
    this.printSub = this.sharedDataService.print.subscribe(_print => {
      this.print = _print;
    })
  }

  ngOnDestroy() {
    this.printSub.unsubscribe();
  }
}
