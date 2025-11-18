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
import { Subscription } from 'rxjs';
import { SharedDataService } from '../../shared-services/shared-data.service';
import { IdbReport } from 'src/app/models/report';
import { IdbKeyPerformanceIndicator } from 'src/app/models/keyPerformanceIndicator';
import { DataEvaluationExcelWriterService } from '../../shared-services/data-evaluation-excel-writer.service';

@Component({
    selector: 'app-on-site-visit-report',
    templateUrl: './on-site-visit-report.component.html',
    styleUrl: './on-site-visit-report.component.css',
    standalone: false
})
export class OnSiteVisitReportComponent {
  @Input({required: true})
  onSiteVisit: IdbOnSiteVisit;
  @Input()
  report: IdbReport;

  onSiteVisitReport: OnSiteVisitReport;
  exportReportToExcelSub: Subscription;

  print: boolean;
  printSub: Subscription;
  constructor(private assessmentIdbService: AssessmentIdbService,
    private energyOpportunityIdbService: EnergyOpportunityIdbService,
    private nonEnergyBenefitIdbService: NonEnergyBenefitsIdbService,
    private keyPerformanceIndicatorIdbService: KeyPerformanceIndicatorsIdbService,
    private keyPerformanceMetricImpactsIdbService: KeyPerformanceMetricImpactsIdbService,
    private sharedDataService: SharedDataService,
    private dataEvaluationExcelWriterService: DataEvaluationExcelWriterService
  ) {

  }

  ngOnInit() {
    let allAssessments: Array<IdbAssessment> = this.assessmentIdbService.assessments.getValue();
    let allEnergyOpportunities: Array<IdbEnergyOpportunity> = this.energyOpportunityIdbService.energyOpportunities.getValue();
    let allNonEnergyBenefits: Array<IdbNonEnergyBenefit> = this.nonEnergyBenefitIdbService.nonEnergyBenefits.getValue();
    let facilityPerformanceMetrics: Array<KeyPerformanceMetric> = this.keyPerformanceIndicatorIdbService.getFacilityKeyPerformanceMetrics(this.onSiteVisit.facilityId);
    let facilityPerformanceIndicators: Array<IdbKeyPerformanceIndicator> = this.keyPerformanceIndicatorIdbService.getByFacilityGuid(this.onSiteVisit.facilityId);
    let keyPerformanceMetricImpacts: Array<IdbKeyPerformanceMetricImpact> = this.keyPerformanceMetricImpactsIdbService.keyPerformanceMetricImpacts.getValue();
    this.onSiteVisitReport = getOnSiteVisitReport(this.onSiteVisit.assessmentIds, allAssessments, allEnergyOpportunities, allNonEnergyBenefits, facilityPerformanceMetrics, facilityPerformanceIndicators, keyPerformanceMetricImpacts, this.report);
    this.printSub = this.sharedDataService.print.subscribe(_print => {
      this.print = _print;
    });

    this.exportReportToExcelSub = this.sharedDataService.exportReportToExcel.subscribe(reportType => {
      if (reportType === 'on_site_visit') {
        this.dataEvaluationExcelWriterService.setSiteVisitReport(this.onSiteVisitReport);
      }
    });
  }

  ngOnDestroy() {
    this.printSub.unsubscribe();
    this.exportReportToExcelSub.unsubscribe();
  }

}
