import { Component, Input } from '@angular/core';
import { IdbOnSiteVisit } from 'src/app/models/onSiteVisit';
import { getOnSiteVisitReport, OnSiteVisitReport } from '../calculations/visitReport';
import { IdbAssessment } from 'src/app/models/assessment';
import { IdbEnergyOpportunity } from 'src/app/models/energyOpportunity';
import { IdbNonEnergyBenefit } from 'src/app/models/nonEnergyBenefit';
import { KeyPerformanceMetric } from '../../constants/keyPerformanceMetrics';
import { IdbKeyPerformanceMetricImpact } from 'src/app/models/keyPerformanceMetricImpact';
import { AssessmentIdbService } from 'src/app/indexed-db/assessment-idb.service';
import { EnergyOpportunityIdbService } from 'src/app/indexed-db/energy-opportunity-idb.service';
import { NonEnergyBenefitsIdbService } from 'src/app/indexed-db/non-energy-benefits-idb.service';
import { KeyPerformanceIndicatorsIdbService } from 'src/app/indexed-db/key-performance-indicators-idb.service';
import { KeyPerformanceMetricImpactsIdbService } from 'src/app/indexed-db/key-performance-metric-impacts-idb.service';

@Component({
  selector: 'app-on-site-visit-report',
  templateUrl: './on-site-visit-report.component.html',
  styleUrl: './on-site-visit-report.component.css'
})
export class OnSiteVisitReportComponent {
  @Input()
  onSiteVisit: IdbOnSiteVisit;

  onSiteVisitReport: OnSiteVisitReport;

  constructor(private assessmentIdbService: AssessmentIdbService,
    private energyOpportunityIdbService: EnergyOpportunityIdbService,
    private nonEnergyBenefitIdbService: NonEnergyBenefitsIdbService,
    private keyPerformanceIndicatorIdbService: KeyPerformanceIndicatorsIdbService,
    private keyPerformanceMetricImpactsIdbService: KeyPerformanceMetricImpactsIdbService
  ) {

  }

  ngOnInit() {
    let allAssessments: Array<IdbAssessment> = this.assessmentIdbService.assessments.getValue();
    let allEnergyOpportunities: Array<IdbEnergyOpportunity> = this.energyOpportunityIdbService.energyOpportunities.getValue();
    let allNonEnergyBenefits: Array<IdbNonEnergyBenefit> = this.nonEnergyBenefitIdbService.nonEnergyBenefits.getValue();
    let companyPerformanceMetrics: Array<KeyPerformanceMetric> = this.keyPerformanceIndicatorIdbService.getCompanyKeyPerformanceMetrics(this.onSiteVisit.companyId);
    let keyPerformanceMetricImpacts: Array<IdbKeyPerformanceMetricImpact> = this.keyPerformanceMetricImpactsIdbService.keyPerformanceMetricImpacts.getValue();
    this.onSiteVisitReport = getOnSiteVisitReport(this.onSiteVisit.assessmentIds, allAssessments, allEnergyOpportunities, allNonEnergyBenefits, companyPerformanceMetrics, keyPerformanceMetricImpacts);
  }
}
