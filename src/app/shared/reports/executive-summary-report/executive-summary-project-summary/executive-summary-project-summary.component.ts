import { Component, Input } from '@angular/core';
import { AssessmentReport } from '../../calculations/assessmentReport';
import { ExecutiveSummaryReport } from '../../calculations/executiveSummaryReport';
import { AdditionalEnergyOpportunityReport, EnergyOpportunityReport } from '../../calculations/energyOpportunityReport';
import { LocaleService } from 'src/app/shared/shared-services/locale.service';
import { Subscription } from 'rxjs';
import * as _ from 'lodash';
import { faBullseye, faMoneyBillWave, faSort, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { KeyPerformanceIndicatorReportItem } from '../../calculations/keyPerformanceIndicatorReport';
import { PowerpointReportGeneratorService } from 'src/app/shared/shared-services/powerpoint-report-generator.service';

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
  faSort: IconDefinition = faSort;

  topKpis: Array<KeyPerformanceIndicatorReportItem>;
  limit: number = 3; // limit top KPIs to show
  orderByField: 'totalImplementationCost' | 'totalNonNebCostSavings' | 'totalPaybackWithoutNebs' | 'finalImplementationCost' | 'totalFinancialImpact' | 'totalPaybackWithNebs' = 'totalFinancialImpact';
  orderByDir: 'asc' | 'desc' = 'desc';

  currencyCode: string;
  currencySub: Subscription;
  topReports: Array<TopReportsItem>;
  additionalReports: AdditionalEnergyOpportunityReport;
  numberOfProjects: number = 0;
  limitOptions: Array<number> = [];

  constructor(
    private localeService: LocaleService,
    private powerpointReportGeneratorService: PowerpointReportGeneratorService
  ) { }

  ngOnInit() {
    this.setTopReports();
    this.setTopKpis();
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
    this.numberOfProjects = 0;
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
    allReportItems = _.orderBy(allReportItems, (item: TopReportsItem) => {
      return item.report[this.orderByField]
    }, this.orderByDir)
    this.topReports = [];
    this.limitOptions = [];
    for(let i = 0; i < this.numberOfProjects; i++){
      this.limitOptions.push(i + 1);}


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
      name: 'Additional Projects/Impacts',
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
    this.powerpointReportGeneratorService.setExecutiveSummaryReports(this.topReports, this.additionalReports, this.numberOfProjects);
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
    this.topKpis = kpiReportItems.slice(0, 3);
  }

  setOrderByField(orderByField: 'totalImplementationCost' | 'totalNonNebCostSavings' | 'totalPaybackWithoutNebs' | 'finalImplementationCost' | 'totalFinancialImpact' | 'totalPaybackWithNebs') {
    if (orderByField == this.orderByField) {
      this.orderByDir = this.orderByDir == 'asc' ? 'desc' : 'asc';
    } else {
      this.orderByField = orderByField;
    }
    this.setTopReports();
  }
}


export interface TopReportsItem {
  report: EnergyOpportunityReport | AssessmentReport,
  assessmentId: string,
  opportunityId?: string,
  type: 'EEM' | 'Assessment'
}