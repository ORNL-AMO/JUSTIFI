import { Component, Input } from '@angular/core';
import { AssessmentReport } from '../../calculations/assessmentReport';
import { ExecutiveSummaryReport } from '../../calculations/executiveSummaryReport';
import { AdditionalEnergyOpportunityReport, EnergyOpportunityReport } from '../../calculations/energyOpportunityReport';
import { LocaleService } from 'src/app/shared/shared-services/locale.service';
import { Subscription } from 'rxjs';
import * as _ from 'lodash';
import { KeyPerformanceIndicatorOption, } from 'src/app/shared/constants/keyPerformanceIndicatorOptions';
import { faBullseye, faMoneyBillWave, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { KeyPerformanceIndicatorReportItem } from '../../calculations/keyPerformanceIndicatorReport';

@Component({
  selector: 'app-executive-summary-project-summary',
  standalone: false,

  templateUrl: './executive-summary-project-summary.component.html',
  styleUrl: './executive-summary-project-summary.component.css'
})
export class ExecutiveSummaryProjectSummaryComponent {
  @Input({ required: true })
  executiveSummaryReport: ExecutiveSummaryReport;

  faMoneyBillWave: IconDefinition = faMoneyBillWave;
  faBullseye: IconDefinition = faBullseye;

  allReports: Array<EnergyOpportunityReport | AssessmentReport>;
  reducedReports: Array<EnergyOpportunityReport | AssessmentReport>;
  additionalResultsReport: AdditionalEnergyOpportunityReport = {
    name: 'Additional Projects/NEBs',
    implementationCost: 0,
    totalEnergyCostSavings: 0,
    totalWaterCostSavings: 0,
    totalNonNebCostSavings: 0,
    totalNebFinancialImpact: 0,
    totalFinancialImpact: 0,
    totalPaybackWithoutNebs: 0,
    totalPaybackWithNebs: 0,
    finalImplementationCost: 0
  };
  topKpis: Array<KeyPerformanceIndicatorReportItem>;
  limit: number = 3; // limit top KPIs to show
  orderByField: 'UtilitySavings' | 'PaybackNoNeb' | 'FinancialImpact' | 'PaybackWNeb' = 'FinancialImpact';
  orderByDir: 'asc' | 'desc' = 'desc';

  currencyCode: string;
  currencySub: Subscription;


  topReports: Array<TopReportsItem>;
  additionalReports: AdditionalEnergyOpportunityReport;
  numberOfProjects: number = 0;
  constructor(
    private localeService: LocaleService,
  ) { }

  ngOnInit() {
    this.setTopReports();
    this.setTopKpis()
    // Set EEM Reports
    // this.setEEMReports();
    // get currency code and symbol
    this.currencySub = this.localeService.currencyCode.subscribe(
      code => { this.currencyCode = code }
    );


  }

  ngOnDestroy() {
    this.currencySub.unsubscribe();
  }

  setTopReports() {
    let allReportItems: Array<TopReportsItem> = [];


    this.executiveSummaryReport.assessmentReports.forEach(assessmentReport => {
      if (assessmentReport.energyOpportunityReports.length) {
        this.numberOfProjects += assessmentReport.energyOpportunityReports.length;
      } else {
        this.numberOfProjects += 1;
      }
      if (assessmentReport.assessment.utilitySavingsByAssessment) {
        allReportItems.push({
          assessmentId: assessmentReport.assessment.guid,
          report: assessmentReport,
          type: 'Assessment'
        });
      } else {
        assessmentReport.energyOpportunityReports.forEach(energyOpportunityReport => {
          allReportItems.push({
            assessmentId: assessmentReport.assessment.guid,
            report: energyOpportunityReport,
            opportunityId: energyOpportunityReport.energyOpportunity.guid,
            type: 'EEM'
          });
        });
      }
    });
    allReportItems.sort((a, b) => {
      if (this.orderByField == 'UtilitySavings') {
        return this.orderByDir == 'asc' ? a.report.totalNonNebCostSavings - b.report.totalNonNebCostSavings : b.report.totalNonNebCostSavings - a.report.totalNonNebCostSavings;
      } else if (this.orderByField == 'PaybackNoNeb') {
        return this.orderByDir == 'asc' ? a.report.totalPaybackWithoutNebs - b.report.totalPaybackWithoutNebs : b.report.totalPaybackWithoutNebs - a.report.totalPaybackWithoutNebs;
      } else if (this.orderByField == 'FinancialImpact') {
        return this.orderByDir == 'asc' ? a.report.totalFinancialImpact - b.report.totalFinancialImpact : b.report.totalFinancialImpact - a.report.totalFinancialImpact;
      } else if (this.orderByField == 'PaybackWNeb') {
        return this.orderByDir == 'asc' ? a.report.totalPaybackWithNebs - b.report.totalPaybackWithNebs : b.report.totalPaybackWithNebs - a.report.totalPaybackWithNebs;
      }
      return 0;
    });
    this.topReports = [];
    for (let i = 0; i < this.limit; i++) {
      if (allReportItems[i]) {
        this.topReports.push(allReportItems[i])
      }
    }

    let totalEnergyCostSavings: number = 0;
    let totalWaterCostSavings: number = 0;
    let totalNebFinancialImpact: number = 0;
    let totalNonNebCostSavings: number = 0;
    let totalFinancialImpact: number = 0;
    let totalImplementationCost: number = 0;
    let totalFinalImplementationCost: number = 0;

    this.executiveSummaryReport.assessmentReports.forEach(assessmentReport => {
      totalEnergyCostSavings += assessmentReport.totalEnergyCostSavings;
      totalWaterCostSavings += assessmentReport.totalWaterCostSavings;
      totalNebFinancialImpact += assessmentReport.totalNebFinancialImpact;
      totalNonNebCostSavings += assessmentReport.totalNonNebCostSavings;
      totalFinancialImpact += assessmentReport.totalFinancialImpact;
      totalImplementationCost += assessmentReport.totalImplementationCost;
      totalFinalImplementationCost += assessmentReport.finalImplementationCost;

      let inTopReports: Array<TopReportsItem> = this.topReports.filter((report) => {
        return report.assessmentId == assessmentReport.assessment.guid
      });
      inTopReports.forEach((reportItem) => {
        totalEnergyCostSavings -= reportItem.report.totalEnergyCostSavings;
        totalWaterCostSavings -= reportItem.report.totalWaterCostSavings;
        totalNebFinancialImpact -= reportItem.report.totalNebFinancialImpact;
        totalNonNebCostSavings -= reportItem.report.totalNonNebCostSavings;
        totalFinancialImpact -= reportItem.report.totalFinancialImpact;
        totalImplementationCost -= reportItem.report.totalImplementationCost;
        totalFinalImplementationCost -= reportItem.report.finalImplementationCost;
      });
    })

    let paybackWithNebs: number = (totalFinalImplementationCost / totalFinancialImpact);
    if (paybackWithNebs == Infinity) {
      paybackWithNebs = 0;
    }
    let paybackWithoutNebs: number = (totalImplementationCost / totalNonNebCostSavings);
    if (paybackWithoutNebs == Infinity) {
      paybackWithoutNebs = 0;
    }
    this.additionalReports = {
      name: 'Additional Projects/NEBs',
      implementationCost: totalImplementationCost,
      totalEnergyCostSavings: totalEnergyCostSavings,
      totalWaterCostSavings: totalWaterCostSavings,
      totalNonNebCostSavings: totalNonNebCostSavings,
      totalNebFinancialImpact: totalNebFinancialImpact,
      totalFinancialImpact: totalFinancialImpact,
      finalImplementationCost: totalFinalImplementationCost,
      totalPaybackWithNebs: paybackWithNebs,
      totalPaybackWithoutNebs: paybackWithoutNebs
    }


  }

  setTopKpis() {
    // filter top 3 KPIs
    let kpiReportItems = this.executiveSummaryReport.keyPerformanceIndicatorReport.kpiReportItems;
    kpiReportItems.sort((a, b) => {
      return b.percentSavings - a.percentSavings;
    });
    kpiReportItems = _.uniqBy(kpiReportItems, (item: KeyPerformanceIndicatorReportItem) => {
      return item.keyPerformanceIndicator.optionValue
    });
    this.topKpis = kpiReportItems.slice(0, this.limit);
  }


  // setEEMReports() {
  //   // flatten all EEM reports
  //   this.allReports = [];
  //   this.executiveSummaryReport.assessmentReports.forEach((assessmentReport: AssessmentReport) => {
  //     if (assessmentReport.assessment.utilitySavingsByAssessment) {
  //       this.allReports.push(assessmentReport);
  //     } else {
  //       assessmentReport.energyOpportunityReports.forEach((energyOpportunityReport: EnergyOpportunityReport) => {
  //         this.allReports.push(energyOpportunityReport);
  //       });
  //     }
  //   });

  //   // sort and aggregate reports
  //   this.sortReports(this.allReports, this.orderByField, this.orderByDir);
  //   this.reducedReports = this.orderReduceReportsByCostSavings(this.allReports, this.limit);
  //   // filter top 3 KPIs
  //   let kpiReportItems = this.executiveSummaryReport.keyPerformanceIndicatorReport.kpiReportItems;
  //   kpiReportItems.sort((a, b) => {
  //     return b.percentSavings - a.percentSavings;
  //   });
  //   kpiReportItems = _.uniqBy(kpiReportItems, (item: KeyPerformanceIndicatorReportItem) => {
  //     return item.keyPerformanceIndicator.optionValue
  //   });
  //   this.topKpis = kpiReportItems.slice(0, this.limit - 1).map(item => item.keyPerformanceIndicator);
  // }

  // setOrderByField(orderByField: 'UtilitySavings' | 'PaybackNoNeb' | 'FinancialImpact' | 'PaybackWNeb') {
  //   this.orderByField = orderByField;
  //   if (orderByField == 'UtilitySavings') {
  //     this.orderByDir = 'desc';
  //   } else if (orderByField == 'PaybackNoNeb') {
  //     this.orderByDir = 'asc';
  //   } else if (orderByField == 'FinancialImpact') {
  //     this.orderByDir = 'desc';
  //   } else if (orderByField == 'PaybackWNeb') {
  //     this.orderByDir = 'asc';
  //   } else {
  //     this.orderByDir = 'desc';
  //   }
  //   this.sortReports(this.reducedReports, orderByField, this.orderByDir);
  //   this.reducedReports = this.orderReduceReportsByCostSavings(this.allReports, this.limit);
  // }
  // sortReports(allReports: Array<EnergyOpportunityReport | AssessmentReport>,
  //   orderByField: 'UtilitySavings' | 'PaybackNoNeb' | 'FinancialImpact' | 'PaybackWNeb',
  //   orderByDir: 'asc' | 'desc') {
  //   console.log(allReports.length)
  //   allReports.sort((a, b) => {
  //     if (orderByField == 'UtilitySavings') {
  //       return orderByDir == 'asc' ? a.totalNonNebCostSavings - b.totalNonNebCostSavings : b.totalNonNebCostSavings - a.totalNonNebCostSavings;
  //     } else if (orderByField == 'PaybackNoNeb') {
  //       return orderByDir == 'asc' ? a.totalPaybackWithoutNebs - b.totalPaybackWithoutNebs : b.totalPaybackWithoutNebs - a.totalPaybackWithoutNebs;
  //     } else if (orderByField == 'FinancialImpact') {
  //       return orderByDir == 'asc' ? a.totalFinancialImpact - b.totalFinancialImpact : b.totalFinancialImpact - a.totalFinancialImpact;
  //     } else if (orderByField == 'PaybackWNeb') {
  //       return orderByDir == 'asc' ? a.totalPaybackWithNebs - b.totalPaybackWithNebs : b.totalPaybackWithNebs - a.totalPaybackWithNebs;
  //     }
  //     return 0;
  //   });
  //   console.log(allReports.length);
  // }

  // orderReduceReportsByCostSavings(allReports: Array<EnergyOpportunityReport | AssessmentReport>, limit: number): Array<EnergyOpportunityReport | AssessmentReport> {
  //   if (allReports.length > limit) {
  //     console.log(allReports);
  //     const topReports = allReports.slice(0, limit - 1);
  //     console.log(topReports)
  //     const otherReports = allReports.slice(limit - 1);
  //     console.log(otherReports);
  //     // collapse other reports into one report
  //     let totalEnergyCostSavings: number = otherReports.reduce((sum, report) => sum + report.totalEnergyCostSavings, 0);
  //     let totalWaterCostSavings: number = otherReports.reduce((sum, report) => sum + report.totalWaterCostSavings, 0);
  //     let totalNebFinancialImpact: number = otherReports.reduce((sum, report) => sum + report.totalNebFinancialImpact, 0);
  //     let totalNonNebCostSavings: number = otherReports.reduce((sum, report) => sum + report.totalNonNebCostSavings, 0);
  //     let totalFinancialImpact: number = otherReports.reduce((sum, report) => sum + report.totalFinancialImpact, 0);
  //     let totalImplementationCost: number = otherReports.reduce((sum, report) => sum + report.totalImplementationCost, 0);
  //     let totalFinalImplementationCost: number = otherReports.reduce((sum, report) => sum + report.finalImplementationCost, 0);
  //     let paybackWithNebs: number = (totalImplementationCost / totalFinancialImpact);
  //     if (paybackWithNebs == Infinity) {
  //       paybackWithNebs = 0;
  //     }
  //     let paybackWithoutNebs: number = (totalFinalImplementationCost / totalNonNebCostSavings);
  //     if (paybackWithoutNebs == Infinity) {
  //       paybackWithoutNebs = 0;
  //     }
  //     this.additionalResultsReport = {
  //       ...this.additionalResultsReport,
  //       implementationCost: totalImplementationCost,
  //       totalEnergyCostSavings: totalEnergyCostSavings,
  //       totalWaterCostSavings: totalWaterCostSavings,
  //       totalNonNebCostSavings: totalNonNebCostSavings,
  //       totalNebFinancialImpact: totalNebFinancialImpact,
  //       totalFinancialImpact: totalFinancialImpact,
  //       finalImplementationCost: totalFinalImplementationCost,
  //       totalPaybackWithNebs: paybackWithNebs,
  //       totalPaybackWithoutNebs: paybackWithoutNebs
  //     }
  //     return [...topReports];
  //   } else {
  //     this.additionalResultsReport = {
  //       ...this.additionalResultsReport,
  //       implementationCost: 0,
  //       totalEnergyCostSavings: 0,
  //       totalWaterCostSavings: 0,
  //       totalNonNebCostSavings: 0,
  //       totalNebFinancialImpact: this.executiveSummaryReport.totalAssessmentNebFinancialImpact,
  //       totalFinancialImpact: this.executiveSummaryReport.totalAssessmentNebFinancialImpact,
  //     };
  //     return allReports;
  //   }
  // }
}


export interface TopReportsItem {
  report: EnergyOpportunityReport | AssessmentReport,
  assessmentId: string,
  opportunityId?: string,
  type: 'EEM' | 'Assessment'
}