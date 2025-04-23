import { Component, Input } from '@angular/core';
import { AssessmentReport } from '../../calculations/assessmentReport';
import { ExecutiveSummaryReport } from '../../calculations/executiveSummaryReport';
import { AdditionalEnergyOpportunityReport, EnergyOpportunityReport } from '../../calculations/energyOpportunityReport';
import { LocaleService } from 'src/app/shared/shared-services/locale.service';
import { Subscription } from 'rxjs';
import * as _ from 'lodash';
import { NebReport } from '../../calculations/nebReport';
import { IdbEnergyOpportunity } from 'src/app/models/energyOpportunity';
import { KeyPerformanceIndicatorOption, KeyPerformanceIndicatorValue } from 'src/app/shared/constants/keyPerformanceIndicatorOptions';

@Component({
  selector: 'app-executive-summary-project-summary',
  standalone: false,
  
  templateUrl: './executive-summary-project-summary.component.html',
  styleUrl: './executive-summary-project-summary.component.css'
})
export class ExecutiveSummaryProjectSummaryComponent {
  @Input({ required: true })
  executiveSummaryReport: ExecutiveSummaryReport;

  allEEMReports: Array<EnergyOpportunityReport>;
  reducedEEMReports: Array<EnergyOpportunityReport>;
  additionalEEMReport: AdditionalEnergyOpportunityReport = {
    name: 'Additional Projects/NEBs',
    implementationCost: 0,
    totalEnergyCostSavings: 0,
    totalWaterCostSavings: 0,
    totalNonNebCostSavings: 0,
    totalNebFinancialImpact: 0,
    totalFinancialImpact: 0,
  };
  topKpis: Array<KeyPerformanceIndicatorOption>;

  currencyCode: string;
  currencySub: Subscription;

  constructor(
    private localeService: LocaleService,
  ) { }

  ngOnInit() {
    // flatten all EEM reports
    this.allEEMReports = this.executiveSummaryReport.assessmentReports.flatMap(
      (assessmentReport: AssessmentReport) => {
        return assessmentReport.energyOpportunityReports;
      }
    );
    // aggregate EEM reports by cost savings
    this.reducedEEMReports = this.orderReduceEEMReportsByCostSavings(this.allEEMReports, 4);
    // filter top 3 KPIs
    const kpiReportItems = this.executiveSummaryReport.keyPerformanceIndicatorReport.kpiReportItems;
    kpiReportItems.sort((a, b) => {
      return b.percentSavings - a.percentSavings;
    });
    this.topKpis = kpiReportItems.slice(0, 3).map(item => item.keyPerformanceIndicator);
    // get currency code and symbol
    this.currencySub = this.localeService.currencyCode.subscribe(
      code => {this.currencyCode = code}
    );
  }

  ngOnDestroy() {
    this.currencySub.unsubscribe();
  }

  orderReduceEEMReportsByCostSavings(allEEMReports: Array<EnergyOpportunityReport>, limit: number): Array<EnergyOpportunityReport> {
    allEEMReports.sort((a, b) => {
      return b.totalFinancialImpact - a.totalFinancialImpact;
    });
    if (allEEMReports.length > limit) {
      const topReports = allEEMReports.slice(0, limit - 1);
      const otherReports = allEEMReports.slice(limit - 1);
      // collapse other reports into one report
      let totalEnergyCostSavings: number = otherReports.reduce((sum, report) => sum + report.totalEnergyCostSavings, 0);
      let totalWaterCostSavings: number = otherReports.reduce((sum, report) => sum + report.totalWaterCostSavings, 0);
      let totalNebFinancialImpact: number = otherReports.reduce((sum, report) => sum + report.totalNebFinancialImpact, 0);
      let totalNonNebCostSavings: number = otherReports.reduce((sum, report) => sum + report.totalNonNebCostSavings, 0);
      let totalFinancialImpact: number = otherReports.reduce((sum, report) => sum + report.totalFinancialImpact, 0);
      let totalImplementationCost: number = otherReports.reduce((sum, report) => sum + report.energyOpportunity.implementationCost, 0);
      let paybackWithNebs: number = (totalImplementationCost / totalFinancialImpact);
      if (paybackWithNebs == Infinity) {
          paybackWithNebs = 0;
      }
      let paybackWithoutNebs: number = (totalImplementationCost / totalNonNebCostSavings);
      if (paybackWithoutNebs == Infinity) {
          paybackWithoutNebs = 0;
      }
      this.additionalEEMReport = {
        ...this.additionalEEMReport,
        implementationCost: totalImplementationCost,
        totalEnergyCostSavings: totalEnergyCostSavings,
        totalWaterCostSavings: totalWaterCostSavings,
        totalNonNebCostSavings: totalNonNebCostSavings,
        totalNebFinancialImpact: totalNebFinancialImpact + this.executiveSummaryReport.totalAssessmentNebFinancialImpact,
        totalFinancialImpact: totalFinancialImpact + this.executiveSummaryReport.totalAssessmentNebFinancialImpact,
      }
      return [...topReports];
    } else {
      this.additionalEEMReport = {
        ...this.additionalEEMReport,
        implementationCost: 0,
        totalEnergyCostSavings: 0,
        totalWaterCostSavings: 0,
        totalNonNebCostSavings: 0,
        totalNebFinancialImpact: this.executiveSummaryReport.totalAssessmentNebFinancialImpact,
        totalFinancialImpact: this.executiveSummaryReport.totalAssessmentNebFinancialImpact,
      };
      return allEEMReports;
    }
  }
}
