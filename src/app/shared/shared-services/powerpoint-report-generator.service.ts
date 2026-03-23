import { Injectable } from '@angular/core';
import pptxgen from 'pptxgenjs';
import { AssessmentReport } from '../reports/calculations/assessmentReport';
import { IdbCompany } from 'src/app/models/company';
import { IdbFacility } from 'src/app/models/facility';
import { localeCurrency } from '../constants/localeCurrency';
import { LocaleService } from './locale.service';
import { Subscription } from 'rxjs';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { CurrencySymbolPipe } from '../helper-pipes/currency-symbol.pipe';
import { KeyPerformanceMetricReportItem, KeyPerformanceIndicatorReport, KeyPerformanceIndicatorReportItem, AdditionalKeyPerformanceIndicatorReportItem } from '../reports/calculations/keyPerformanceIndicatorReport';
import * as _ from 'lodash';
import { NebReport } from '../reports/calculations/nebReport';
import { OrderMetricsTableFields, PerformanceMetricsTablePipe } from '../reports/performance-metrics-table/performance-metrics-table.pipe';
import { IdbAssessment } from 'src/app/models/assessment';
import { ExecutiveSummaryReport } from '../reports/calculations/executiveSummaryReport';
import { TopReportsItem } from '../reports/executive-summary-report/executive-summary-project-summary/executive-summary-project-summary.component';
import { AdditionalEnergyOpportunityReport } from '../reports/calculations/energyOpportunityReport';
import { KeyPerformanceIndicatorOption } from '../constants/keyPerformanceIndicatorOptions';
import { IdbOnSiteVisit } from 'src/app/models/onSiteVisit';
import { OnSiteVisitReport } from '../reports/calculations/visitReport';

@Injectable({
  providedIn: 'root'
})
export class PowerpointReportGeneratorService {

  assessmentReport: AssessmentReport;
  currencyUnicode: string;
  currencySub: Subscription;
  currencySymbolPipe: CurrencySymbolPipe;
  currencySymbol: string;
  assessmentName: string;
  kpmRevenueReports: Array<KeyPerformanceMetricReportItem>;
  totalRevenue: number;
  kpmCostSavingsReports: Array<KeyPerformanceMetricReportItem>;
  totalCostSavings: number;
  qualitativeReports: Array<KeyPerformanceMetricReportItem>;
  keyPerformanceIndicatorReport: KeyPerformanceIndicatorReport;
  topReports: Array<TopReportsItem>;
  additionalReports: AdditionalEnergyOpportunityReport;
  executiveSummaryReport: ExecutiveSummaryReport;
  numberOfProjects: number;
  reducedKpiReportCostItems: Array<KeyPerformanceIndicatorReportItem>;
  reducedKpiReportRevenueItems: Array<KeyPerformanceIndicatorReportItem>;
  additionalKpiReportCostItem: AdditionalKeyPerformanceIndicatorReportItem = {
    baselineCost: 0,
    financialImpact: 0,
    modifiedCost: 0,
    percentSavings: 0
  };
  additionalKpiReportRevenueItem: AdditionalKeyPerformanceIndicatorReportItem = {
    baselineCost: 0,
    financialImpact: 0,
    modifiedCost: 0,
    percentSavings: 0
  };
  topKpis: Array<KeyPerformanceIndicatorOption>;
  onSiteVisitReport: OnSiteVisitReport;
  onSiteVisit: IdbOnSiteVisit;
  company: IdbCompany;
  facility: IdbFacility;

  orderByDir: 'asc' | 'desc' = 'desc';
  orderByField: OrderMetricsTableFields = 'costAdjustment';
  inRollup: boolean;
  constructor(
    private localeService: LocaleService,
    private currencyPipe: CurrencyPipe,
    private datePipe: DatePipe,
    private performanceMetricsTablePipe: PerformanceMetricsTablePipe
  ) {
    this.currencySymbolPipe = new CurrencySymbolPipe(this.currencyPipe);
    this.currencySub = this.localeService.currencyCode.subscribe(currencyCode => {
      this.currencySymbol = this.currencySymbolPipe.transform(currencyCode)
      this.currencyUnicode = localeCurrency.find(option => {
        return option.currencyCode == currencyCode
      }).unicode;
    })
  }

  // slide masters
  defineSlideMasters(pptx: any) {
    pptx.defineSlideMaster({
      title: "Title Slide",
      objects: [
        { placeholder: { options: { name: 'title', type: 'title', x: 0.5, y: 1.5, w: 9, h: 1.5, align: 'center', bold: true, color: '000000', fontSize: 32, fontFace: 'Arial (Headings)' }, text: 'Click to add title' } },
        { placeholder: { options: { name: 'body', type: 'body', x: 0.5, y: 3.07, w: 9, h: 1, align: 'center', color: '000000', fontSize: 18, fontFace: 'Arial (Body)' }, text: 'Click to add subtitle' } }
      ],
      margin: 0.0
    });

    pptx.defineSlideMaster({
      title: "Title Only",
      objects: [
        { placeholder: { options: { name: 'title', type: 'title', x: 0.5, y: 0.2, w: 9, h: 1, align: 'left', bold: true, color: '000000', fontSize: 24, fontFace: 'Arial (Headings)', valign: 'middle' }, text: 'Click to add title' } }
      ],
      margin: 0.0
    });

    pptx.defineSlideMaster({
      title: "Title and Content",
      objects: [
        { placeholder: { options: { name: 'title', type: 'title', x: 0.5, y: 0.2, w: 9, h: 1, align: 'left', bold: true, color: '000000', fontSize: 24, fontFace: 'Arial (Headings)', valign: 'middle' }, text: 'Click to add title' } },
        { placeholder: { options: { name: 'body', type: 'body', x: 0.5, y: 1.2, w: 9, h: 4, align: 'left', color: '000000', fontSize: 16, fontFace: 'Arial (Body)', valign: 'top', bullet: true }, text: 'Click to add text' } }
      ],
      margin: 0.0
    });

    pptx.defineSlideMaster({
      title: "SubTitle Slide",
      objects: [
        { placeholder: { options: { name: 'title', type: 'title', x: 0, y: 2, w: 10, h: 1, align: 'center', bold: true, color: '000000', fontSize: 24, fontFace: 'Arial (Headings)', valign: 'middle' }, text: 'Click to add title' } }
      ]
    });
  }

  // executive summary report ppt
  createExecutiveSummaryPPT(executiveSummaryReport: ExecutiveSummaryReport) {
    this.executiveSummaryReport = executiveSummaryReport;
    let pptx = new pptxgen();
    this.defineSlideMasters(pptx);

    let titleSlide = pptx.addSlide({ masterName: "Title Slide" });
    this.addExecSummaryTitleSlide(titleSlide);
    let slide1 = pptx.addSlide({ masterName: "Title Only" });
    if (executiveSummaryReport.totalRebates)
      this.getProjectSummaryWithRebates(slide1);
    else
      this.getProjectSummary(slide1);
    if (executiveSummaryReport.keyPerformanceIndicatorReport) {
      let slide2 = pptx.addSlide({ masterName: "Title Only" });
      this.getAnnualKPIs(slide2);
    }
    pptx.writeFile({ fileName: 'Executive_Summary_Report.pptx' });
  }

  addExecSummaryTitleSlide(slide: pptxgen.Slide) {
    let pptTitle: string;
    pptTitle = "JUSTIFI Report\nExecutive Summary";
    slide.addText(pptTitle, { placeholder: 'title' });
    slide.addText(this.getCurrentDate(), { placeholder: 'body' });
  }

  getAnnualKPIs(slide: pptxgen.Slide) {
    let rows = [];
    rows.push([
      { options: { colspan: 1 } },
      { text: "Potential Changes (" + this.currencyUnicode + "/yr)", options: { colspan: 1, bold: true, align: 'center' } },
      { text: "% Change", options: { colspan: 1, bold: true, align: 'center' } }
    ]);

    rows.push([
      { text: "Provided Costs", options: { colspan: 1, bold: true, align: 'left' } },
      { text: this.formatCurrency(this.executiveSummaryReport.totalCostSavings), options: { colspan: 1, bold: true, align: 'right' } },
      { options: { colspan: 1 } }
    ]);

    this.reducedKpiReportCostItems.forEach(item =>
      rows.push([
        { text: item.keyPerformanceIndicator.htmlLabel, options: { colspan: 1 } },
        { text: this.formatCurrency(item.financialImpact), options: { colspan: 1, align: 'right' } },
        { text: this.formatPercentage(item.percentSavings), options: { colspan: 1, align: 'right' } }
      ])
    );

    if (this.additionalKpiReportCostItem.financialImpact > 0) {
      rows.push([
        { text: ' Additional KPI(s)', options: { colspan: 1 } },
        { text: this.formatCurrency(this.additionalKpiReportCostItem.financialImpact), options: { colspan: 1, align: 'right' } },
        { text: this.formatPercentage(0), options: { colspan: 1, align: 'right' } }
      ])
    };

    rows.push([
      { text: "Provided Revenues", options: { colspan: 1, bold: true, align: 'left' } },
      { text: this.formatCurrency(this.executiveSummaryReport.totalRevenues), options: { colspan: 1, bold: true, align: 'right' } },
      { options: { colspan: 1 } }
    ]);

    this.reducedKpiReportRevenueItems.forEach(item =>
      rows.push([
        { text: item.keyPerformanceIndicator.htmlLabel, options: { colspan: 1 } },
        { text: this.formatCurrency(item.financialImpact), options: { colspan: 1, align: 'right' } },
        { text: this.formatPercentage(item.percentSavings), options: { colspan: 1, align: 'right' } }
      ])
    );

    if (this.additionalKpiReportRevenueItem.financialImpact > 0) {
      rows.push([
        { text: ' Additional KPI(s)', options: { colspan: 1 } },
        { text: this.formatCurrency(this.additionalKpiReportRevenueItem.financialImpact), options: { colspan: 1, align: 'right' } },
        { text: this.formatPercentage(0), options: { colspan: 1, align: 'right' } }
      ])
    };

    let kpiText;
    if (this.executiveSummaryReport.totalRevenues > 0)
      kpiText = "These projects that will result in " + this.formatCurrency(this.executiveSummaryReport.totalCostSavings) + " cost savings and " + this.formatCurrency(this.executiveSummaryReport.totalRevenues) + " additional revenues per year that support our goals:";
    else
      kpiText = "These projects that will result in " + this.formatCurrency(this.executiveSummaryReport.totalCostSavings) + " cost savings per year that support our goals:";

    this.topKpis.map(item => {
      kpiText = kpiText + '\n\u2022 ' + item.htmlLabel;
    });
    slide.addText("Annual KPI Impacts", { placeholder: 'title' });
    slide.addText(kpiText, { x: 0.5, y: 1.3, w: 9, h: 0.8, align: 'center', fill: { color: '#d4edda' }, line: { color: '#006400', width: 1 }, fontSize: 10, fontFace: 'Arial' });
    slide.addTable(rows, { x: 0.5, y: 2.2, margin: 0.05, border: { color: "CFCFCF" }, autoPage: true, autoPageSlideStartY: 1.3, autoPageRepeatHeader: true, fontSize: 10, fontFace: 'Arial' });
    slide.newAutoPagedSlides.forEach((slide) => slide.addText("Annual KPI Impacts (cont.)", { placeholder: "title" }));

  }

  getProjectSummaryWithRebates(slide: pptxgen.Slide) {
    let rows = [];
    rows.push([
      { options: { colspan: 2 } },
      { text: "Utility Cost Savings", options: { colspan: 3, bold: true, align: 'center' } },
      { text: "With Operational Impacts", options: { colspan: 3, bold: true, align: 'center' } }
    ]);

    rows.push([
      { options: { colspan: 2 } },
      { text: "Implementation Cost (" + this.currencyUnicode + ")", options: { colspan: 1, bold: true, align: 'center' } },
      { text: "Financial Impact (" + this.currencyUnicode + "/yr)", options: { colspan: 1, bold: true, align: 'center' } },
      { text: "Simple Payback (yrs)", options: { colspan: 1, bold: true, align: 'center' } },
      { text: "Implementation Cost (" + this.currencyUnicode + ")", options: { colspan: 1, bold: true, align: 'center' } },
      { text: "Financial Impact (" + this.currencyUnicode + "/yr)", options: { colspan: 1, bold: true, align: 'center' } },
      { text: "Simple Payback (yrs)", options: { colspan: 1, bold: true, align: 'center' } }
    ]);

    this.topReports.forEach(reportItem =>
      rows.push([
        { text: reportItem.report.name, options: { colspan: 2 } },
        { text: this.formatCurrency(reportItem.report.totalImplementationCost), options: { colspan: 1, align: 'right' } },
        { text: this.formatCurrency(reportItem.report.totalNonNebCostSavings), options: { colspan: 1, align: 'right' } },
        { text: this.formatNumber(reportItem.report.totalPaybackWithoutNebs), options: { colspan: 1, align: 'right' } },
        { text: this.formatCurrency(reportItem.report.finalImplementationCost), options: { colspan: 1, align: 'right' } },
        { text: this.formatCurrency(reportItem.report.totalFinancialImpact), options: { colspan: 1, align: 'right' } },
        { text: this.formatNumber(reportItem.report.totalPaybackWithNebs), options: { colspan: 1, align: 'right' } }
      ])
    );

    if (this.additionalReports.totalFinancialImpact) {
      rows.push([
        { text: this.additionalReports.name, options: { colspan: 2 } },
        { text: this.formatCurrency(this.additionalReports.implementationCost), options: { colspan: 1, align: 'right' } },
        { text: this.formatCurrency(this.additionalReports.totalNonNebCostSavings), options: { colspan: 1, align: 'right' } },
        { text: this.formatNumber(this.additionalReports.totalPaybackWithoutNebs), options: { colspan: 1, align: 'right' } },
        { text: this.formatCurrency(this.additionalReports.finalImplementationCost), options: { colspan: 1, align: 'right' } },
        { text: this.formatCurrency(this.additionalReports.totalFinancialImpact), options: { colspan: 1, align: 'right' } },
        { text: this.formatNumber(this.additionalReports.totalPaybackWithNebs), options: { colspan: 1, align: 'right' } }
      ]);
    }

    rows.push([
      { text: "Total", options: { colspan: 2, bold: true } },
      { text: this.formatCurrency(this.executiveSummaryReport.totalImplementationCost), options: { colspan: 1, bold: true, align: 'right' } },
      { text: this.formatCurrency(this.executiveSummaryReport.totalNonNebCostSavings), options: { colspan: 1, bold: true, align: 'right' } },
      { text: this.formatNumber(this.executiveSummaryReport.totalPaybackWithoutNebs), options: { colspan: 1, bold: true, align: 'right' } },
      { text: this.formatCurrency(this.executiveSummaryReport.finalImplementationCost), options: { colspan: 1, bold: true, align: 'right' } },
      { text: this.formatCurrency(this.executiveSummaryReport.totalFinancialImpact), options: { colspan: 1, bold: true, align: 'right' } },
      { text: this.formatNumber(this.executiveSummaryReport.totalPaybackWithNebs), options: { colspan: 1, bold: true, align: 'right' } }
    ]);

    slide.addText("Project Summary", { placeholder: 'title' });
    slide.addText([
      { text: "On the " },
      { text: this.datePipe.transform(this.executiveSummaryReport.visitDate, 'M/dd/yyyy'), options: { bold: true } },
      { text: " visit, we found " },
      { text: this.numberOfProjects.toString(), options: { bold: true } },
      { text: " projects that will result in a " },
      { text: this.formatCurrency(this.executiveSummaryReport.totalFinancialImpact), options: { bold: true } },
      { text: " annual financial impact." }],
      { x: 0.5, y: 1.3, w: 9, h: 0.4, align: 'center', fill: { color: '#d4edda' }, line: { color: '#006400', width: 1 }, fontSize: 10, fontFace: 'Arial' });
    slide.addTable(rows, { x: 0.5, y: 1.9, margin: 0.05, border: { color: "CFCFCF" }, autoPage: true, autoPageSlideStartY: 1.3, autoPageRepeatHeader: true, fontSize: 10, fontFace: 'Arial' });
    slide.newAutoPagedSlides.forEach((slide) => slide.addText("Project Summary (cont.)", { placeholder: "title" }));
  }

  getProjectSummary(slide: pptxgen.Slide) {
    let rows = [];
    rows.push([
      { options: { colspan: 3 } },
      { text: "Utility Cost Savings", options: { colspan: 2, bold: true, align: 'center' } },
      { text: "With Operational Impacts", options: { colspan: 2, bold: true, align: 'center' } }
    ]);

    rows.push([
      { options: { colspan: 2 } },
      { text: "Implementation Cost (" + this.currencyUnicode + ")", options: { colspan: 1, bold: true, align: 'center' } },
      { text: "Financial Impact (" + this.currencyUnicode + "/yr)", options: { colspan: 1, bold: true, align: 'center' } },
      { text: "Simple Payback (yrs)", options: { colspan: 1, bold: true, align: 'center' } },
      { text: "Financial Impact (" + this.currencyUnicode + "/yr)", options: { colspan: 1, bold: true, align: 'center' } },
      { text: "Simple Payback (yrs)", options: { colspan: 1, bold: true, align: 'center' } }
    ]);

    this.topReports.forEach(reportItem =>
      rows.push([
        { text: reportItem.report.name, options: { colspan: 2 } },
        { text: this.formatCurrency(reportItem.report.totalImplementationCost), options: { colspan: 1, align: 'right' } },
        { text: this.formatCurrency(reportItem.report.totalNonNebCostSavings), options: { colspan: 1, align: 'right' } },
        { text: this.formatNumber(reportItem.report.totalPaybackWithoutNebs), options: { colspan: 1, align: 'right' } },
        { text: this.formatCurrency(reportItem.report.totalFinancialImpact), options: { colspan: 1, align: 'right' } },
        { text: this.formatNumber(reportItem.report.totalPaybackWithNebs), options: { colspan: 1, align: 'right' } }
      ])
    );

    if (this.additionalReports.totalFinancialImpact) {
      rows.push([
        { text: this.additionalReports.name, options: { colspan: 2 } },
        { text: this.formatCurrency(this.additionalReports.implementationCost), options: { colspan: 1, align: 'right' } },
        { text: this.formatCurrency(this.additionalReports.totalNonNebCostSavings), options: { colspan: 1, align: 'right' } },
        { text: this.formatNumber(this.additionalReports.totalPaybackWithoutNebs), options: { colspan: 1, align: 'right' } },
        { text: this.formatCurrency(this.additionalReports.totalFinancialImpact), options: { colspan: 1, align: 'right' } },
        { text: this.formatNumber(this.additionalReports.totalPaybackWithNebs), options: { colspan: 1, align: 'right' } }
      ]);
    }

    rows.push([
      { text: "Total", options: { colspan: 2, bold: true } },
      { text: this.formatCurrency(this.executiveSummaryReport.totalImplementationCost), options: { colspan: 1, bold: true, align: 'right' } },
      { text: this.formatCurrency(this.executiveSummaryReport.totalNonNebCostSavings), options: { colspan: 1, bold: true, align: 'right' } },
      { text: this.formatNumber(this.executiveSummaryReport.totalPaybackWithoutNebs), options: { colspan: 1, bold: true, align: 'right' } },
      { text: this.formatCurrency(this.executiveSummaryReport.totalFinancialImpact), options: { colspan: 1, bold: true, align: 'right' } },
      { text: this.formatNumber(this.executiveSummaryReport.totalPaybackWithNebs), options: { colspan: 1, bold: true, align: 'right' } }
    ]);

    slide.addText("Project Summary", { placeholder: 'title' });
    slide.addText([
      { text: "On the " },
      { text: this.datePipe.transform(this.executiveSummaryReport.visitDate, 'M/dd/yyyy'), options: { bold: true } },
      { text: " visit, we found " },
      { text: this.numberOfProjects.toString(), options: { bold: true } },
      { text: " projects that will result in a " },
      { text: this.formatCurrency(this.executiveSummaryReport.totalFinancialImpact), options: { bold: true } },
      { text: " annual financial impact." }],
      { x: 0.5, y: 1.3, w: 9, h: 0.4, align: 'center', fill: { color: '#d4edda' }, line: { color: '#006400', width: 1 }, fontSize: 10, fontFace: 'Arial' });
    slide.addTable(rows, { x: 0.5, y: 1.9, margin: 0.05, border: { color: "CFCFCF" }, autoPage: true, autoPageSlideStartY: 1.3, autoPageRepeatHeader: true, fontSize: 10, fontFace: 'Arial' });
    slide.newAutoPagedSlides.forEach((slide) => slide.addText("Project Summary (cont.)", { placeholder: "title" }));
  }

  setExecutiveSummaryReports(topReports: Array<TopReportsItem>, additionalReports: AdditionalEnergyOpportunityReport, numberOfProjects: number) {
    this.topReports = topReports;
    this.additionalReports = additionalReports;
    this.numberOfProjects = numberOfProjects;
  }

  setExecutiveSummaryKpiItems(reducedKpiReportCostItems: Array<KeyPerformanceIndicatorReportItem>, additionalKpiReportCostItem: AdditionalKeyPerformanceIndicatorReportItem, reducedKpiReportRevenueItems: Array<KeyPerformanceIndicatorReportItem>, additionalKpiReportRevenueItem: AdditionalKeyPerformanceIndicatorReportItem, topKpis: Array<KeyPerformanceIndicatorOption>) {
    this.reducedKpiReportCostItems = reducedKpiReportCostItems;
    this.additionalKpiReportCostItem = additionalKpiReportCostItem;
    this.reducedKpiReportRevenueItems = reducedKpiReportRevenueItems;
    this.additionalKpiReportRevenueItem = additionalKpiReportRevenueItem;
    this.topKpis = topKpis;
  }

  // assessment report ppt
  createAssessmentPPT(assessmentReport: AssessmentReport, company: IdbCompany, facility: IdbFacility, inRollup: boolean, assessment: IdbAssessment) {
    this.assessmentName = assessment.name
    this.assessmentReport = assessmentReport;
    this.company = company;
    this.facility = facility;
    this.inRollup = inRollup;
    let pptx = new pptxgen();

    this.defineSlideMasters(pptx);
    let titleSlide = pptx.addSlide({ masterName: "Title Slide" });
    this.addTitleSlide(titleSlide);
    let nebstaticSlide = pptx.addSlide({ masterName: "Title and Content" });
    this.addNebStaticSlide(nebstaticSlide);
    let nebContributionStaticSlide = pptx.addSlide({ masterName: "Title Only" });
    this.addNebContributionStaticSlide(nebContributionStaticSlide);

    this.getContents(pptx);

    pptx.writeFile({ fileName: 'Assessment_Report.pptx' });
  }

  getContents(pptx: any) {
    let slide1 = pptx.addSlide({ masterName: "Title Only" });
    this.getAssessmentTableContents(this.company, this.facility, slide1);
    let slide2 = pptx.addSlide({ masterName: "Title Only" });
    this.getAssessmentSavingsChart(pptx, this.inRollup, slide2);
    let slide3 = pptx.addSlide({ masterName: "Title Only" });
    this.getPerformanceMetricsTable(slide3, false);
    let slide4 = pptx.addSlide({ masterName: "Title Only" });
    this.getPerformanceMetricsChart(pptx, slide4, this.inRollup);
    if (this.assessmentReport.assessment.utilitySavingsByAssessment) {
      let slide5 = pptx.addSlide({ masterName: "Title Only" });
      this.getUtilitySavingsPaybackTable(slide5);
    }
    else {
      if (this.assessmentReport.totalRebates) {
        let slide5 = pptx.addSlide({ masterName: "Title Only" });
        this.getEEMSavingsPaybackTable(slide5);
      }
      let slide6 = pptx.addSlide({ masterName: "Title Only" });
      this.getAnnualImpactTable(slide6);
      if (this.assessmentReport.totalRebates) {
        let slide7 = pptx.addSlide({ masterName: "Title Only" });
        this.getProjectPaybackTableWithRebates(slide7);
      }
      else {
        let slide7 = pptx.addSlide({ masterName: "Title Only" });
        this.getProjectPaybackTable(slide7);
      }
    }
    let slide8 = pptx.addSlide({ masterName: "Title Only" });
    this.getNebContributionsBarChart(pptx, slide8);
    let slide9 = pptx.addSlide({ masterName: "Title Only" });
    this.getAssessmentCostTable(slide9);
    let slide10 = pptx.addSlide({ masterName: "Title Only" });
    this.getAssessmentSavingsTable(slide10);
  }

  getUtilitySavingsPaybackTable(slide: pptxgen.Slide) {
    let rows = [];
    rows.push([
      { options: { colspan: 1 } },
      { text: "Without Operational Impacts", options: { colspan: 1, bold: true, align: 'center' } },
      { text: "With Operational Impacts", options: { colspan: 1, bold: true, align: 'center' } }
    ]);

    if (this.assessmentReport.totalRebates) {
      rows.push([
        { text: "Implementation Cost (" + this.currencyUnicode + ")", options: { colspan: 1, align: 'left' } },
        { text: this.formatCurrency(this.assessmentReport.assessment.implementationCost), options: { colspan: 1, align: 'right' } },
        { text: this.formatCurrency(this.assessmentReport.assessment.implementationCost), options: { colspan: 1, align: 'right' } }
      ]);

      rows.push([
        { text: "One-time Incentives (" + this.currencyUnicode + ")", options: { colspan: 1, align: 'left' } },
        { text: this.formatCurrency(0), options: { colspan: 1, align: 'right' } },
        { text: this.formatCurrency(this.assessmentReport.totalRebates), options: { colspan: 1, align: 'right' } }
      ]);

      rows.push([
        { text: "Final Implementation Cost (" + this.currencyUnicode + ")", options: { colspan: 1, bold: true, align: 'left' } },
        { text: this.formatCurrency(this.assessmentReport.assessment.implementationCost), options: { colspan: 1, bold: true, align: 'right' } },
        { text: this.formatCurrency(this.assessmentReport.finalImplementationCost), options: { colspan: 1, bold: true, align: 'right' } }
      ]);
    }
    else {
      rows.push([
        { text: "Implementation Cost (" + this.currencyUnicode + ")", options: { colspan: 1, bold: true, align: 'left' } },
        { text: this.formatCurrency(this.assessmentReport.assessment.implementationCost), options: { colspan: 1, bold: true, align: 'right' } },
        { text: this.formatCurrency(this.assessmentReport.finalImplementationCost), options: { colspan: 1, bold: true, align: 'right' } }
      ]);
    }

    rows.push([
      { text: "Energy Cost Savings (" + this.currencyUnicode + ")", options: { colspan: 1, align: 'left' } },
      { text: this.formatCurrency(this.assessmentReport.assessment.costSavings), options: { colspan: 1, align: 'right' } },
      { text: this.formatCurrency(this.assessmentReport.assessment.costSavings), options: { colspan: 1, align: 'right' } }
    ]);

    rows.push([
      { text: "Operational Cost Savings (" + this.currencyUnicode + "/yr)", options: { colspan: 1, align: 'left' } },
      { text: this.formatCurrency(0), options: { colspan: 1, align: 'right' } },
      { text: this.formatCurrency(this.assessmentReport.totalNebFinancialImpact), options: { colspan: 1, align: 'right' } }
    ]);

    rows.push([
      { text: "Total Financial Impact (" + this.currencyUnicode + "/yr)", options: { colspan: 1, bold: true, align: 'left' } },
      { text: this.formatCurrency(this.assessmentReport.totalNonNebCostSavings), options: { colspan: 1, bold: true, align: 'right' } },
      { text: this.formatCurrency(this.assessmentReport.totalFinancialImpact), options: { colspan: 1, bold: true, align: 'right' } }
    ]);

    rows.push([
      { text: "Simple Payback (yrs)", options: { colspan: 1, bold: true, align: 'left' } },
      { text: this.formatNumber(this.assessmentReport.totalPaybackWithoutNebs), options: { colspan: 1, bold: true, align: 'right' } },
      { text: this.formatNumber(this.assessmentReport.totalPaybackWithNebs), options: { colspan: 1, bold: true, align: 'right' } }
    ]);

    slide.addText("Payback Period Comparison", { placeholder: 'title' });
    slide.addTable(rows, { x: 0.5, y: 1.3, margin: 0.05, border: { color: "CFCFCF" }, autoPage: true, autoPageSlideStartY: 1.3, autoPageRepeatHeader: true, fontSize: 10, fontFace: 'Arial' });
    slide.newAutoPagedSlides.forEach((slide) => slide.addText("Payback Period Comparison (cont.)", { placeholder: "title" }));
  }

  getEEMSavingsPaybackTable(slide: pptxgen.Slide) {
    let rows = [];
    rows.push([
      { options: { colspan: 1 } },
      { text: "Energy Cost Savings", options: { colspan: 1, bold: true, align: 'center' } },
      { text: "With Operational Impacts", options: { colspan: 2, bold: true, align: 'center' } }
    ]);

    rows.push([
      { options: { colspan: 1 } },
      { text: "Implementation Cost (" + this.currencyUnicode + ")", options: { colspan: 1, bold: true, align: 'center' } },
      { text: "Incentives (" + this.currencyUnicode + ")", options: { colspan: 1, bold: true, align: 'center' } },
      { text: "Final Implementation Cost (" + this.currencyUnicode + ")", options: { colspan: 1, bold: true, align: 'center' } }
    ]);

    this.assessmentReport.energyOpportunityReports.forEach(energyOpportunityReport =>
      rows.push([
        { text: energyOpportunityReport.energyOpportunity.name, options: { colspan: 1, align: 'left' } },
        { text: this.formatCurrency(energyOpportunityReport.energyOpportunity.implementationCost), options: { colspan: 1, align: 'right' } },
        { text: this.formatCurrency(energyOpportunityReport.totalRebates), options: { colspan: 1, align: 'right' } },
        { text: this.formatCurrency(energyOpportunityReport.finalImplementationCost), options: { colspan: 1, align: 'right' } }
      ])
    );

    if (this.assessmentReport.totalNonOpportunityRebates) {
      rows.push([
        { text: "Additional One-time Incentives", options: { colspan: 1, align: 'left' } },
        { text: this.formatCurrency(0), options: { colspan: 1, align: 'right' } },
        { text: this.formatCurrency(this.assessmentReport.totalNonOpportunityRebates), options: { colspan: 1, align: 'right' } },
        { text: this.formatCurrency(0), options: { colspan: 1, align: 'right' } }
      ]);
    }

    rows.push([
      { text: "Assessment Total", options: { colspan: 1, bold: true, align: 'left' } },
      { text: this.formatCurrency(this.assessmentReport.totalImplementationCost), options: { colspan: 1, bold: true, align: 'right' } },
      { text: this.formatCurrency(this.assessmentReport.totalRebates), options: { colspan: 1, bold: true, align: 'right' } },
      { text: this.formatCurrency(this.assessmentReport.finalImplementationCost), options: { colspan: 1, bold: true, align: 'right' } }
    ]);

    slide.addText("Impact on Implementation Costs", { placeholder: 'title' });
    slide.addTable(rows, { x: 0.5, y: 1.3, margin: 0.05, border: { color: "CFCFCF" }, autoPage: true, autoPageSlideStartY: 1.3, autoPageRepeatHeader: true, fontSize: 10, fontFace: 'Arial' });
    slide.newAutoPagedSlides.forEach((slide) => slide.addText("Impact on Implementation Costs (cont.)", { placeholder: "title" }));
  }

  addTitleSlide(titleSlide: pptxgen.Slide) {
    let pptTitle: string;
    pptTitle = "JUSTIFI Report\n" + this.assessmentName;
    titleSlide.addText(pptTitle, { placeholder: 'title' });
    titleSlide.addText(this.getCurrentDate(), { placeholder: 'body' });
  }

  addNebContributionStaticSlide(nebContributionStaticSlide: pptxgen.Slide) {
    nebContributionStaticSlide.addText('Operational Improvements Contribute to Strategic Business Goals', { placeholder: 'title' });
    nebContributionStaticSlide.addImage({ path: "/assets/images/multiple-benefits-business-goals.png", x: 1, y: 1.2, w: 8, h: 4 });
  }

  addNebStaticSlide(nebstaticSlide: pptxgen.Slide) {
    nebstaticSlide.addText('What are Multiple Benefits?', { placeholder: 'title' });
    nebstaticSlide.addText(
      "Multiple Benefits are the positive outcomes that result from energy efficiency efforts, beyond the direct savings in energy and demand.\nThey can be beneficial participants in energy efficiency program, the utility system, and society.\nAlso commonly known as multiple benefits (MBs), operational benefits, co-benefits, soft benefits, auxiliary benefits, or non-energy impacts.",
      { placeholder: 'body' }
    );
    nebstaticSlide.addImage({ path: "/assets/images/neb-static-slide.png", x: 0.5, y: 3.2, w: 8, h: 2 });
  }

  getAssessmentSavingsTable(slide: pptxgen.Slide) {
    let rows = [];
    rows.push([
      { options: { colspan: 2, border: [{ pt: 1, color: 'CFCFCF' }, { pt: 1, color: 'CFCFCF' }, { pt: 2, color: '000000' }, { pt: 1, color: 'CFCFCF' }] } },
      { text: "Financial Impact (" + this.currencyUnicode + "/yr)", options: { colspan: 1, bold: true, align: 'right', border: [{ pt: 1, color: 'CFCFCF' }, { pt: 1, color: 'CFCFCF' }, { pt: 2, color: '000000' }, { pt: 1, color: 'CFCFCF' }] } }
    ]);

    rows.push([
      { text: this.assessmentReport.assessment.name, options: { colspan: 3, bold: true } }
    ]);

    let title: string;
    if (this.assessmentReport.assessment.utilitySavingsByAssessment) {
      title = this.assessmentReport.utilityCategory === 'energy' ? 'Total Assessment Energy Cost' : 'Total Assessment Utility Cost';
      rows.push([
        { text: title, options: { colspan: 2 } },
        { text: this.formatCurrency(this.assessmentReport.assessment.costSavings), options: { colspan: 1, align: 'right' } },
      ]);

      if (this.assessmentReport.assessment.energyCostSavings && this.assessmentReport.assessment.energyCostSavings != this.assessmentReport.assessment.costSavings) {
        rows.push([
          { text: "Assessment Energy Savings", options: { colspan: 2 } },
          { text: this.formatCurrency(this.assessmentReport.assessment.energyCostSavings), options: { colspan: 1, align: 'right' } },
        ]);
      }
    }

    if (this.assessmentReport.assessment.waterCostSavings && this.assessmentReport.assessment.waterCostSavings != this.assessmentReport.assessment.costSavings) {
      rows.push([
        { text: "Assessment Water Savings", options: { colspan: 2 } },
        { text: this.formatCurrency(this.assessmentReport.assessment.waterCostSavings), options: { colspan: 1, align: 'right' } },
      ]);
    }

    if (this.assessmentReport.assessmentNebReports.length > 0) {
      rows.push([
        { text: "Additional Operational Benefits", options: { colspan: 3 } }
      ]);
    }

    this.assessmentReport.assessmentNebReports.forEach(nebReport => {
      if (nebReport.nonEnergyBenefit.costImpactType != 'oneTime') {
        rows.push([
          { text: nebReport.nonEnergyBenefit.name, options: { colspan: 2 } },
          { text: this.formatCurrency(nebReport.totalFinancialImpact), options: { colspan: 1, align: 'right' } }
        ]);
      }
    });

    rows.push([
      { text: "Total Assessment Level Impact", options: { colspan: 2, bold: true, border: [{ pt: 1, color: 'CFCFCF' }, { pt: 1, color: 'CFCFCF' }, { pt: 2, color: '000000' }, { pt: 1, color: 'CFCFCF' }] } },
      { text: this.formatCurrency(this.assessmentReport.totalNonOpportunityCostSavings), options: { colspan: 1, align: 'right', bold: true, border: [{ pt: 1, color: 'CFCFCF' }, { pt: 1, color: 'CFCFCF' }, { pt: 2, color: '000000' }, { pt: 1, color: 'CFCFCF' }] } },
    ]);

    this.assessmentReport.energyOpportunityReports.forEach(energyOpportunityReport => {
      rows.push([
        { text: energyOpportunityReport.energyOpportunity.name, options: { colspan: 3, bold: true, bullet: { code: "25BA" }, color: '000000' } }
      ]);

      if (!this.assessmentReport.assessment.utilitySavingsByAssessment) {
        if (energyOpportunityReport.energyOpportunity.utilityCategory == 'energy') {
          rows.push([
            { text: energyOpportunityReport.energyOpportunity.name + " Energy Savings", options: { colspan: 2 } },
            { text: this.formatCurrency(energyOpportunityReport.energyOpportunity.costSavings), options: { colspan: 1, align: 'right' } },
          ]);
        }
        else {
          rows.push([
            { text: energyOpportunityReport.energyOpportunity.name + " Water Savings", options: { colspan: 2 } },
            { text: this.formatCurrency(energyOpportunityReport.energyOpportunity.costSavings), options: { colspan: 1, align: 'right' } },
          ]);
        }
      }

      energyOpportunityReport.nebReports.forEach(nebReport => {
        if (nebReport.nonEnergyBenefit.costImpactType != 'oneTime') {
          rows.push([
            { text: nebReport.nonEnergyBenefit.name, options: { colspan: 2 } },
            { text: this.formatCurrency(nebReport.totalFinancialImpact), options: { colspan: 1, align: 'right' } },
          ]);
        }
      });

      rows.push([
        { text: energyOpportunityReport.energyOpportunity.name + " Total Impact", options: { colspan: 2, bold: true, border: [{ pt: 1, color: 'CFCFCF' }, { pt: 1, color: 'CFCFCF' }, { pt: 2, color: '000000' }, { pt: 1, color: 'CFCFCF' }] } },
        { text: this.formatCurrency(energyOpportunityReport.totalFinancialImpact), options: { colspan: 1, align: 'right', bold: true, border: [{ pt: 1, color: 'CFCFCF' }, { pt: 1, color: 'CFCFCF' }, { pt: 2, color: '000000' }, { pt: 1, color: 'CFCFCF' }] } },
      ]);
    });

    let category: string;
    category = this.assessmentReport.assessment.utilityCategory === 'energy' ? 'Total Energy Savings' : 'Total Utility Savings'
    rows.push([
      { text: category, options: { colspan: 2, bold: true } },
      { text: this.formatCurrency(this.assessmentReport.totalNonNebCostSavings), options: { colspan: 1, align: 'right', bold: true } },
    ]);

    rows.push([
      { text: "Total Additional Operational Benefits", options: { colspan: 2, bold: true } },
      { text: this.formatCurrency(this.assessmentReport.totalNebFinancialImpact), options: { colspan: 1, align: 'right', bold: true } },
    ]);

    rows.push([
      { text: "Total Financial Impact", options: { colspan: 2, bold: true } },
      { text: this.formatCurrency(this.assessmentReport.totalFinancialImpact), options: { colspan: 1, align: 'right', bold: true } },
    ]);

    slide.addText("Annual Financial Impact Details", { placeholder: 'title' });
    slide.addTable(rows, { x: 0.5, y: 1.3, margin: 0.05, border: { color: "CFCFCF" }, autoPage: true, autoPageSlideStartY: 1.3, autoPageRepeatHeader: true, fontSize: 10, fontFace: 'Arial' });
    slide.newAutoPagedSlides.forEach((slide) => slide.addText("Annual Financial Impact Details (cont.)", { placeholder: "title" }));
  }

  getAssessmentCostTable(slide: pptxgen.Slide) {
    if (this.assessmentReport) {
      let rows = [];
      rows.push([
        { options: { colspan: 3 } },
        { text: "Cost (" + this.currencyUnicode + "/yr)", options: { colspan: 1, bold: true, align: 'right' } }
      ]);

      rows.push([
        { text: "Assessment Baseline", options: { colspan: 4, bold: true } }
      ]);

      rows.push([
        { text: "Energy Related Uses", options: { colspan: 3 } },
        { text: this.formatCurrency(this.assessmentReport.assessment.energyCost), options: { colspan: 1, align: 'right' } },
      ]);

      rows.push([
        { text: "Total Assessment Utility Cost", options: { colspan: 3, bold: true } },
        { text: this.formatCurrency(this.assessmentReport.assessment.cost), options: { colspan: 1, align: 'right', bold: true } },
      ]);
      slide.addText("Total Energy Costs", { placeholder: 'title' });
      slide.addTable(rows, { x: 0.5, y: 1.3, margin: 0.05, border: { color: "CFCFCF" }, autoPage: true, autoPageSlideStartY: 1.3, autoPageRepeatHeader: true, fontSize: 10, fontFace: 'Arial' });
      slide.newAutoPagedSlides.forEach((slide) => slide.addText("Total Energy Costs (cont.)", { placeholder: "title" }));
    }
  }

  getNebContributionsBarChart(pptx: any, slide: pptxgen.Slide) {
    let labels = [];
    let values = [];
    let allNebReports: Array<NebReport> = this.assessmentReport.allNebReports.map(report => {
      return report;
    })
    allNebReports = _.orderBy(allNebReports, (nebReport: NebReport) => {
      return nebReport.totalFinancialImpact;
    }, 'asc');
    let nebNames: Array<string> = allNebReports.map(report => {
      return report.nonEnergyBenefit.name;
    });
    nebNames.forEach((nebName, index) => {
      let matchingNebReport: Array<NebReport> = this.assessmentReport.allNebReports.filter(nebReport => {
        return nebReport.nonEnergyBenefit.name == nebName;
      });
      if (matchingNebReport.length > 0) {
        let totalSavings: number = _.sumBy(matchingNebReport, (matchingNebReport: NebReport) => {
          return matchingNebReport.totalFinancialImpact
        })
        values.push(totalSavings);
      } else {
        values.push(0)
      }
      labels.push(nebName);
    });
    labels.push('Total Operational Cost Savings');
    values.push(this.assessmentReport.totalNebFinancialImpact);

    let arrDataValues = [
      {
        labels: labels,
        values: values
      }
    ];
    let title: string = this.assessmentReport.assessment.name + '\nOperational Cost Savings';
    slide.addText("Operational Financial Impacts", { placeholder: 'title' });
    slide.addChart(pptx.charts.BAR, arrDataValues, this.getNebContributionsBarChartProperties(title));
  }

  getNebContributionsBarChartProperties(title: string) {
    let barChartOptions: pptxgen.IChartOpts = {
      x: 0.5,
      y: 1.5,
      w: '80%',
      h: '50%',
      showValue: true,
      barDir: 'bar',
      showTitle: true,
      title: title,
      titleFontFace: "Arial",
      titleBold: true,
      titleFontSize: 12,
      showLegend: false,
      dataLabelFormatCode: '$[>0]0,"K";$0',
      dataLabelPosition: 'bestFit',
      valAxisLabelFormatCode: '$[>0]0,"K";$0',
      chartColors: ['#085646'],
      dataLabelColor: '000000',
      fontFace: "Arial",
      catAxisLabelColor: '#000000',
      valAxisLabelColor: '#000000',
      dataLabelFontSize: 10,
      catAxisLabelFontSize: 10,
      valAxisLabelFontSize: 10,
      dataLabelFontFace: "Arial",
      valGridLine: { style: "none" },
      barGapWidthPct: 25,
    };
    return barChartOptions;
  }
  getProjectPaybackTableWithRebates(slide: pptxgen.Slide) {
    let rows = [];
    rows.push([
      { options: { colspan: 2 } },
      { text: "Energy Cost Savings", options: { colspan: 3, bold: true, align: 'center' } },
      { text: "With Operational Impacts", options: { colspan: 3, bold: true, align: 'center' } }
    ]);

    rows.push([
      { options: { colspan: 2 } },
      { text: "Implementation Cost (" + this.currencyUnicode + ")", options: { colspan: 1, bold: true, align: 'center' } },
      { text: "Financial Impact (" + this.currencyUnicode + "/yr)", options: { colspan: 1, bold: true, align: 'center' } },
      { text: "Simple Payback (yrs)", options: { colspan: 1, bold: true, align: 'center' } },
      { text: "Implementation Cost (" + this.currencyUnicode + ")", options: { colspan: 1, bold: true, align: 'center' } },
      { text: "Financial Impact (" + this.currencyUnicode + "/yr)", options: { colspan: 1, bold: true, align: 'center' } },
      { text: "Simple Payback (yrs)", options: { colspan: 1, bold: true, align: 'center' } }
    ]);

    this.assessmentReport.energyOpportunityReports.forEach(energyOpportunityReport =>
      rows.push([
        { text: energyOpportunityReport.energyOpportunity.name, options: { colspan: 2 } },
        { text: this.formatCurrency(energyOpportunityReport.energyOpportunity.implementationCost), options: { colspan: 1, align: 'right' } },
        { text: this.formatCurrency(energyOpportunityReport.totalNonNebCostSavings), options: { colspan: 1, align: 'right' } },
        { text: this.formatNumber(energyOpportunityReport.totalPaybackWithoutNebs), options: { colspan: 1, align: 'right' } },
        { text: this.formatCurrency(energyOpportunityReport.finalImplementationCost), options: { colspan: 1, align: 'right' } },
        { text: this.formatCurrency(energyOpportunityReport.totalFinancialImpact), options: { colspan: 1, align: 'right' } },
        { text: this.formatNumber(energyOpportunityReport.totalPaybackWithNebs), options: { colspan: 1, align: 'right' } }
      ])
    );

    let rebate: number;
    if (this.assessmentReport.totalNonOpportunityRebates)
      rebate = this.assessmentReport.totalNonOpportunityRebates;
    else
      rebate = 0
    if (this.assessmentReport.totalAssessmentNebFinancialImpact || this.assessmentReport.totalNonOpportunityRebates) {
      rows.push([
        { text: "Additional Benefits/Incentives", options: { colspan: 2 } },
        { text: this.formatCurrency(0), options: { colspan: 1, align: 'right' } },
        { text: this.formatCurrency(0), options: { colspan: 1, align: 'right' } },
        { text: this.formatNumber(0), options: { colspan: 1, align: 'right' } },
        { text: this.formatCurrency(rebate), options: { colspan: 1, align: 'right' } },
        { text: this.formatCurrency(this.assessmentReport.totalAssessmentNebFinancialImpact), options: { colspan: 1, align: 'right' } },
        { text: this.formatNumber(0), options: { colspan: 1, align: 'right' } }
      ]);
    }

    rows.push([
      { text: "Assessment Total", options: { colspan: 2, bold: true } },
      { text: this.formatCurrency(this.assessmentReport.totalImplementationCost), options: { colspan: 1, bold: true, align: 'right' } },
      { text: this.formatCurrency(this.assessmentReport.totalNonNebCostSavings), options: { colspan: 1, bold: true, align: 'right' } },
      { text: this.formatNumber(this.assessmentReport.totalPaybackWithoutNebs), options: { colspan: 1, bold: true, align: 'right' } },
      { text: this.formatCurrency(this.assessmentReport.finalImplementationCost), options: { colspan: 1, bold: true, align: 'right' } },
      { text: this.formatCurrency(this.assessmentReport.totalFinancialImpact), options: { colspan: 1, bold: true, align: 'right' } },
      { text: this.formatNumber(this.assessmentReport.totalPaybackWithNebs), options: { colspan: 1, bold: true, align: 'right' } }
    ]);

    slide.addText("Impact on Project Payback", { placeholder: 'title' });
    slide.addTable(rows, { x: 0.5, y: 1.3, margin: 0.05, border: { color: "CFCFCF" }, autoPage: true, autoPageSlideStartY: 1.3, autoPageRepeatHeader: true, fontSize: 10, fontFace: 'Arial' });
    slide.newAutoPagedSlides.forEach((slide) => slide.addText("Impact on Project Payback (cont.)", { placeholder: "title" }));
    //slide.addTable(rows, { x: 0.5, y: 1.5, margin: 0.05, border: { color: "CFCFCF" }, autoPage: true, fontSize: 10, fontFace: 'Arial' });
  }

  getProjectPaybackTable(slide: pptxgen.Slide) {
    let rows = [];
    rows.push([
      { options: { colspan: 3 } },
      { text: "Energy Cost Savings", options: { colspan: 2, bold: true, align: 'center' } },
      { text: "With Operational Impacts", options: { colspan: 2, bold: true, align: 'center' } }
    ]);

    rows.push([
      { options: { colspan: 2 } },
      { text: "Implementation Cost (" + this.currencyUnicode + ")", options: { colspan: 1, bold: true, align: 'center' } },
      { text: "Financial Impact (" + this.currencyUnicode + "/yr)", options: { colspan: 1, bold: true, align: 'center' } },
      { text: "Simple Payback (yrs)", options: { colspan: 1, bold: true, align: 'center' } },
      { text: "Financial Impact (" + this.currencyUnicode + "/yr)", options: { colspan: 1, bold: true, align: 'center' } },
      { text: "Simple Payback (yrs)", options: { colspan: 1, bold: true, align: 'center' } }
    ]);

    this.assessmentReport.energyOpportunityReports.forEach(energyOpportunityReport =>
      rows.push([
        { text: energyOpportunityReport.energyOpportunity.name, options: { colspan: 2 } },
        { text: this.formatCurrency(energyOpportunityReport.energyOpportunity.implementationCost), options: { colspan: 1, align: 'right' } },
        { text: this.formatCurrency(energyOpportunityReport.totalNonNebCostSavings), options: { colspan: 1, align: 'right' } },
        { text: this.formatNumber(energyOpportunityReport.totalPaybackWithoutNebs), options: { colspan: 1, align: 'right' } },
        { text: this.formatCurrency(energyOpportunityReport.totalFinancialImpact), options: { colspan: 1, align: 'right' } },
        { text: this.formatNumber(energyOpportunityReport.totalPaybackWithNebs), options: { colspan: 1, align: 'right' } }
      ])
    );

    if (this.assessmentReport.totalAssessmentNebFinancialImpact || this.assessmentReport.totalNonOpportunityRebates) {
      rows.push([
        { text: "Additional Benefits/Incentives", options: { colspan: 2 } },
        { text: this.formatCurrency(0), options: { colspan: 1, align: 'right' } },
        { text: this.formatCurrency(0), options: { colspan: 1, align: 'right' } },
        { text: this.formatNumber(0), options: { colspan: 1, align: 'right' } },
        { text: this.formatCurrency(this.assessmentReport.totalAssessmentNebFinancialImpact), options: { colspan: 1, align: 'right' } },
        { text: this.formatNumber(0), options: { colspan: 1, align: 'right' } }
      ]);
    }


    rows.push([
      { text: "Assessment Total", options: { colspan: 2, bold: true } },
      { text: this.formatCurrency(this.assessmentReport.totalImplementationCost), options: { colspan: 1, bold: true, align: 'right' } },
      { text: this.formatCurrency(this.assessmentReport.totalNonNebCostSavings), options: { colspan: 1, bold: true, align: 'right' } },
      { text: this.formatNumber(this.assessmentReport.totalPaybackWithoutNebs), options: { colspan: 1, bold: true, align: 'right' } },
      { text: this.formatCurrency(this.assessmentReport.totalFinancialImpact), options: { colspan: 1, bold: true, align: 'right' } },
      { text: this.formatNumber(this.assessmentReport.totalPaybackWithNebs), options: { colspan: 1, bold: true, align: 'right' } }
    ]);

    slide.addText("Impact on Project Payback", { placeholder: 'title' });
    slide.addTable(rows, { x: 0.5, y: 1.3, margin: 0.05, border: { color: "CFCFCF" }, autoPage: true, autoPageSlideStartY: 1.3, autoPageRepeatHeader: true, fontSize: 10, fontFace: 'Arial' });
    slide.newAutoPagedSlides.forEach((slide) => slide.addText("Impact on Project Payback (cont.)", { placeholder: "title" }));
  }

  getAnnualImpactTable(slide: pptxgen.Slide) {
    let rows = [];
    rows.push([
      { options: { colspan: 2 } },
      { text: "Without Operational Impacts", options: { colspan: 2, bold: true, align: 'center' } },
      { text: "With Operational Impacts", options: { colspan: 4, bold: true, align: 'center' } }
    ]);

    rows.push([
      { options: { colspan: 2 } },
      { text: "Energy Cost Savings (" + this.currencyUnicode + "/yr)", options: { colspan: 2, bold: true, align: 'center' } },
      { text: "Operational Cost Savings (" + this.currencyUnicode + "/yr)", options: { colspan: 2, bold: true, align: 'center' } },
      { text: "Total Financial Impact (" + this.currencyUnicode + "/yr)", options: { colspan: 2, bold: true, align: 'center' } }
    ]);

    this.assessmentReport.energyOpportunityReports.forEach(energyOpportunityReport =>
      rows.push([
        { text: energyOpportunityReport.energyOpportunity.name, options: { colspan: 2 } },
        { text: this.formatCurrency(energyOpportunityReport.totalNonNebCostSavings), options: { colspan: 2, align: 'right' } },
        { text: this.formatCurrency(energyOpportunityReport.totalNebFinancialImpact), options: { colspan: 2, align: 'right' } },
        { text: this.formatCurrency(energyOpportunityReport.totalFinancialImpact), options: { colspan: 2, align: 'right' } }
      ])
    );

    if (this.assessmentReport.totalAssessmentNebFinancialImpact) {
      rows.push([
        { text: "Additional Operational Impacts", options: { colspan: 2 } },
        { text: this.formatCurrency(0), options: { colspan: 2, align: 'right' } },
        { text: this.formatCurrency(this.assessmentReport.totalAssessmentNebFinancialImpact), options: { colspan: 2, align: 'right' } },
        { text: this.formatCurrency(this.assessmentReport.totalAssessmentNebFinancialImpact), options: { colspan: 2, align: 'right' } }
      ]);
    }

    rows.push([
      { text: "Assessment Total", options: { colspan: 2, bold: true } },
      { text: this.formatCurrency(this.assessmentReport.totalNonNebCostSavings), options: { colspan: 2, bold: true, align: 'right' } },
      { text: this.formatCurrency(this.assessmentReport.totalNebFinancialImpact), options: { colspan: 2, bold: true, align: 'right' } },
      { text: this.formatCurrency(this.assessmentReport.totalFinancialImpact), options: { colspan: 2, bold: true, align: 'right' } }
    ]);

    slide.addText("Impact on Annual Costs", { placeholder: 'title' });
    slide.addTable(rows, { x: 0.5, y: 1.3, margin: 0.05, border: { color: "CFCFCF" }, autoPage: true, autoPageSlideStartY: 1.3, autoPageRepeatHeader: true, fontSize: 10, fontFace: 'Arial' });
    slide.newAutoPagedSlides.forEach((slide) => slide.addText("Impact on Annual Costs (cont.)", { placeholder: "title" }));
  }

  getPerformanceMetricsChart(pptx: any, slide: pptxgen.Slide, isSite: boolean) {
    let kpmReportItems: Array<KeyPerformanceMetricReportItem>;
    if (isSite) {
      kpmReportItems = this.onSiteVisitReport.keyPerformanceIndicatorReport.kpmReportItems.filter(kpmReportItem => {
        return kpmReportItem.keyPerformanceMetric.isQuantitative && kpmReportItem.keyPerformanceMetric.baselineCost
      });
    }
    else {
      kpmReportItems = this.assessmentReport.keyPerformanceIndicatorReport.kpmReportItems.filter(kpmReportItem => {
        return kpmReportItem.keyPerformanceMetric.isQuantitative && kpmReportItem.keyPerformanceMetric.baselineCost
      });
    }

    kpmReportItems = _.orderBy(kpmReportItems, (reportItem: KeyPerformanceMetricReportItem) => {
      return reportItem.keyPerformanceMetric.baselineCost;
    }, 'desc');

    let labels = kpmReportItems.map(reportItem => reportItem.keyPerformanceMetric.label);

    let arrDataValues = [
      {
        name: "Current (" + this.currencyUnicode + "/yr)",
        labels: labels,
        values: kpmReportItems.map(reportItem => reportItem.keyPerformanceMetric.baselineCost),
        color: ['4d5656']
      },
      {
        name: "Potential (" + this.currencyUnicode + "/yr)",
        labels: labels,
        values: kpmReportItems.map(reportItem => reportItem.performanceMetricImpact.modifiedCost),
        color: ['196f3d']
      }
    ]
    let title: string = 'Key Perfomance Metric Financial Impacts';
    slide.addText("Impact on KPMs", { placeholder: 'title' });
    slide.addChart(pptx.charts.BAR, arrDataValues, this.getPerformanceMetricsBarChartProperties(title));
  }

  getPerformanceMetricsBarChartProperties(title: string) {
    let barChartOptions: pptxgen.IChartOpts = {
      x: 0.5,
      y: 1.5,
      w: '80%',
      h: '50%',
      showValue: true,
      barDir: 'col',
      showTitle: true,
      title: title,
      titleFontFace: "Arial",
      titleBold: true,
      titleFontSize: 12,
      showLegend: true,
      legendFontFace: 'Arial',
      legendFontSize: 10,
      legendPos: 't',
      dataLabelFormatCode: '$[>0]0,"K";0',
      showLabel: true,
      dataLabelPosition: 'outEnd',
      valAxisLabelFormatCode: '$[>0]0,"K";$0',
      chartColors: ['#4d5656', '#196f3d'],
      dataLabelColor: '000000',
      fontFace: "Arial",
      catAxisLabelColor: '#000000',
      valAxisLabelColor: '#000000',
      dataLabelFontSize: 8,
      catAxisLabelFontSize: 10,
      valAxisLabelFontSize: 10,
      valGridLine: { style: "none" }
    };
    return barChartOptions;
  }

  getPerformanceMetricsTable(slide: pptxgen.Slide, isSite: boolean) {
    if (isSite)
      this.keyPerformanceIndicatorReport = this.onSiteVisitReport.keyPerformanceIndicatorReport;
    else
      this.keyPerformanceIndicatorReport = this.assessmentReport.keyPerformanceIndicatorReport;
    this.setPerformanceIndicators();

    if (this.keyPerformanceIndicatorReport) {
      let rows = [];
      rows.push([
        { options: { colspan: 2 } },
        { text: "Current (" + this.currencyUnicode + "/yr)", options: { colspan: 1, bold: true, align: "center" } },
        { text: "Financial Impact (" + this.currencyUnicode + "/yr)", options: { colspan: 1, bold: true, align: "center" } },
        { text: "Potential (" + this.currencyUnicode + "/yr)", options: { colspan: 1, bold: true, align: "center" } },
        { text: "Change (%)", options: { colspan: 1, bold: true, align: "center" } },
      ]);

      if (this.kpmCostSavingsReports.length > 0) {
        rows.push([
          { text: "Provided Costs", options: { colspan: 2, bold: true, align: "left" } },
          { options: { colspan: 1 } },
          { text: this.formatCurrency(this.totalCostSavings), options: { colspan: 1, bold: true, align: "right" } },
          { options: { colspan: 1 } },
          { options: { colspan: 1 } }
        ]);

        let kpmSavingsSortedItems: Array<KeyPerformanceMetricReportItem>;
        kpmSavingsSortedItems = this.performanceMetricsTablePipe.transform(this.kpmCostSavingsReports, this.orderByField, this.orderByDir);

        kpmSavingsSortedItems.forEach(kpiReportItem =>
          rows.push([
            { text: kpiReportItem.keyPerformanceMetric.label, options: { colspan: 2, align: "left" } },
            { text: this.formatCurrency(kpiReportItem.keyPerformanceMetric.baselineCost), options: { colspan: 1, align: "right" } },
            { text: this.formatCurrency(kpiReportItem.performanceMetricImpact.costAdjustment), options: { colspan: 1, align: "right" } },
            { text: this.formatCurrency(kpiReportItem.performanceMetricImpact.modifiedCost), options: { colspan: 1, align: "right" } },
            { text: this.formatPercentage(kpiReportItem.performanceMetricImpact.percentSavings), options: { colspan: 1, align: "right" } }
          ])
        );
      }
      if (this.kpmRevenueReports.length > 0) {
        rows.push([
          { text: "Provided Revenues", options: { colspan: 2, bold: true, align: "left" } },
          { options: { colspan: 1 } },
          { text: this.formatCurrency(this.totalRevenue), options: { colspan: 1, bold: true, align: "right" } },
          { options: { colspan: 1 } },
          { options: { colspan: 1 } }
        ]);

        let kpmRevenueSortedItems: Array<KeyPerformanceMetricReportItem>;
        kpmRevenueSortedItems = this.performanceMetricsTablePipe.transform(this.kpmRevenueReports, this.orderByField, this.orderByDir);
        kpmRevenueSortedItems.forEach(kpmReportItem =>
          rows.push([
            { text: kpmReportItem.keyPerformanceMetric.label, options: { colspan: 2, align: "left" } },
            { text: this.formatCurrency(kpmReportItem.keyPerformanceMetric.baselineCost), options: { colspan: 1, align: "right" } },
            { text: this.formatCurrency(kpmReportItem.performanceMetricImpact.costAdjustment), options: { colspan: 1, align: "right" } },
            { text: this.formatCurrency(kpmReportItem.performanceMetricImpact.modifiedCost), options: { colspan: 1, align: "right" } },
            { text: this.formatPercentage(kpmReportItem.performanceMetricImpact.percentSavings), options: { colspan: 1, align: "right" } }
          ])
        );
      }

      if (this.qualitativeReports.length > 0) {
        rows.push([
          { text: "Qualitative Metrics Impacted", options: { colspan: 6, bold: true, align: "left" } }
        ]);

        let qualitativeReportSortedItems: Array<KeyPerformanceMetricReportItem>;
        qualitativeReportSortedItems = this.performanceMetricsTablePipe.transform(this.qualitativeReports, this.orderByField, this.orderByDir);
        qualitativeReportSortedItems.forEach(kpiReportItem =>
          rows.push([
            { text: kpiReportItem.keyPerformanceMetric.label, options: { colspan: 6, align: "left" } }
          ])
        );
      }

      slide.addText("Impact on KPMs", { placeholder: 'title' });
      slide.addTable(rows, { x: 0.5, y: 1.3, margin: 0.05, border: { color: "CFCFCF" }, autoPage: true, autoPageSlideStartY: 1.3, autoPageRepeatHeader: true, fontSize: 10, fontFace: 'Arial' });
      slide.newAutoPagedSlides.forEach((slide) => slide.addText("Impact on KPMs (cont.)", { placeholder: "title" }));
    }
  }

  getAssessmentSavingsChart(pptx: any, inRollup: boolean, slide: pptxgen.Slide) {
    let costSavingLabel: string = this.assessmentReport.utilityCategory === 'energy' ? 'Energy Cost Savings' : 'Utility Cost Savings';
    let arrDataValues = [
      {
        labels: [costSavingLabel, "Operational Cost Savings"],
        values: [this.assessmentReport.totalNonNebCostSavings, this.assessmentReport.totalNebFinancialImpact]
      }
    ]
    let title: string = 'Annual Savings' + " " + this.currencyUnicode + this.assessmentReport.totalFinancialImpact.toLocaleString() + ' (' + this.currencyUnicode + '/yr)';
    if (inRollup) {
      title = this.assessmentReport.assessment.name + ' Annual Savings ' + this.currencyUnicode + this.assessmentReport.totalFinancialImpact.toLocaleString() + ' (' + this.currencyUnicode + '/yr)';
    }
    slide.addText("Annual Savings with Operational Impacts", { placeholder: 'title' });
    slide.addChart(pptx.charts.BAR, arrDataValues, this.getSavingsBarChartProperties(title));
  }

  getSavingsBarChartProperties(title: string) {
    let barChartOptions: pptxgen.IChartOpts = {
      x: 0.5,
      y: 1.5,
      w: '80%',
      h: '50%',
      showValue: true,
      barDir: 'bar',
      showTitle: true,
      title: title,
      titleFontFace: "Arial",
      titleBold: true,
      titleFontSize: 12,
      dataLabelFormatCode: '$#,##0',
      dataLabelPosition: 'bestFit',
      valAxisLabelFormatCode: '$[>0]0,"K";$0',
      chartColors: ['2e86c1', '085646'],
      dataLabelColor: '000000',
      fontFace: "Arial",
      catAxisLabelColor: '#000000',
      valAxisLabelColor: '#000000',
      dataLabelFontSize: 10,
      catAxisLabelFontSize: 10,
      valAxisLabelFontSize: 10,
      valGridLine: { style: "none" },
      barGapWidthPct: 60
    };
    return barChartOptions;
  }

  getAssessmentTableContents(company: IdbCompany, facility: IdbFacility, slide: pptxgen.Slide) {
    let rows = [];
    rows.push([
      { text: "Company", options: { colspan: 1 } },
      { text: company.generalInformation.name, options: { colspan: 1 } }
    ]);
    rows.push([
      { text: "Facility", options: { colspan: 1 } },
      { text: facility.generalInformation.name, options: { colspan: 1 } }
    ]);
    rows.push([
      { text: "Visit Date", options: { colspan: 1 } },
      { text: this.datePipe.transform(this.assessmentReport.assessment.visitDate, 'mediumDate'), options: { colspan: 1 } }
    ]);
    rows.push([
      { text: "Assessment Type", options: { colspan: 1 } },
      { text: this.assessmentReport.assessment.assessmentType, options: { colspan: 1 } }
    ]);
    let utility: string = '';
    this.assessmentReport.assessment.utilityEnergyUses.map(utilityType => {
      if (utilityType.include) {
        utility = utility + utilityType.utilityType + '\n';
      }
    })
    rows.push([
      { text: "Utility Types", options: { colspan: 1 } },
      { text: utility, options: { colspan: 1 } }
    ]);
    slide.addText("Assessment Details", { placeholder: 'title' });
    slide.addTable(rows, { x: 0.5, y: 1.5, margin: 0.05, border: { color: "CFCFCF" }, autoPage: true, fontSize: 10, fontFace: 'Arial' });
  }

  setOrder(orderByDir: any, orderByField: any) {
    this.orderByDir = orderByDir;
    this.orderByField = orderByField;
  }

  // rollup report PPT
  createRollupPPT(onSiteVisit: IdbOnSiteVisit) {
    let pptx = new pptxgen();
    this.onSiteVisit = onSiteVisit;
    this.defineSlideMasters(pptx);

    let titleSlide = pptx.addSlide({ masterName: "Title Slide" });
    this.addRollupTitleSlide(titleSlide);
    let subTitleSlide = pptx.addSlide({ masterName: "SubTitle Slide" });
    this.addSubTitleSlide(subTitleSlide, 'On Site Visit Report');
    let slide1 = pptx.addSlide({ masterName: "Title Only" });
    this.addSiteDetailsTable(slide1);
    let slide2 = pptx.addSlide({ masterName: "Title Only" });
    this.addSiteVisitSavingsChart(pptx, slide2);
    if (this.onSiteVisitReport.keyPerformanceIndicatorReport.kpiReportItems.length > 0) {
      let slide3 = pptx.addSlide({ masterName: "Title Only" });
      this.getPerformanceMetricsTable(slide3, true);
      let slide4 = pptx.addSlide({ masterName: "Title Only" });
      this.getPerformanceMetricsChart(pptx, slide4, true);
    }
    if (this.onSiteVisitReport.totalRebates) {
      let slide5 = pptx.addSlide({ masterName: "Title Only" });
      this.getSitePaybackWithRebates(slide5);
    }
    else {
      let slide5 = pptx.addSlide({ masterName: "Title Only" });
      this.getSitePaybackTable(slide5);
    }
    this.onSiteVisitReport.assessmentReports.forEach(report => {
      let slide = pptx.addSlide({ masterName: "Title Only" });
      this.assessmentReport = report;
      this.getNebContributionsBarChart(pptx, slide);
    });
    this.onSiteVisitReport.assessmentReports.forEach(report => {
      this.assessmentReport = report;
      this.assessmentName = report.assessment.name;
      let slide = pptx.addSlide({ masterName: "SubTitle Slide" });
      this.addSubTitleSlide(slide, this.assessmentName);
      this.getContents(pptx);
    });
    pptx.writeFile({ fileName: 'Rollup_Report.pptx' });
  }

  getSitePaybackWithRebates(slide: pptxgen.Slide) {
    let rows = [];
    rows.push([
      { options: { colspan: 2 } },
      { text: "Energy Cost Savings", options: { colspan: 3, bold: true, align: 'center' } },
      { text: "With Operational Cost Savings", options: { colspan: 3, bold: true, align: 'center' } }
    ]);

    rows.push([
      { options: { colspan: 2 } },
      { text: "Implementation Cost (" + this.currencyUnicode + ")", options: { colspan: 1, bold: true, align: 'center' } },
      { text: "Financial Impact (" + this.currencyUnicode + "/yr)", options: { colspan: 1, bold: true, align: 'center' } },
      { text: "Simple Payback (yrs)", options: { colspan: 1, bold: true, align: 'center' } },
      { text: "Implementation Cost (" + this.currencyUnicode + ")", options: { colspan: 1, bold: true, align: 'center' } },
      { text: "Financial Impact (" + this.currencyUnicode + "/yr)", options: { colspan: 1, bold: true, align: 'center' } },
      { text: "Simple Payback (yrs)", options: { colspan: 1, bold: true, align: 'center' } }
    ]);

    this.onSiteVisitReport.assessmentReports.forEach(report =>
      rows.push([
        { text: report.name, options: { colspan: 2 } },
        { text: this.formatCurrency(report.totalImplementationCost), options: { colspan: 1, align: 'right' } },
        { text: this.formatCurrency(report.totalNonNebCostSavings), options: { colspan: 1, align: 'right' } },
        { text: this.formatNumber(report.totalPaybackWithoutNebs), options: { colspan: 1, align: 'right' } },
        { text: this.formatCurrency(report.finalImplementationCost), options: { colspan: 1, align: 'right' } },
        { text: this.formatCurrency(report.totalFinancialImpact), options: { colspan: 1, align: 'right' } },
        { text: this.formatNumber(report.totalPaybackWithNebs), options: { colspan: 1, align: 'right' } }
      ])
    );

    rows.push([
      { text: "Total", options: { colspan: 2, bold: true } },
      { text: this.formatCurrency(this.onSiteVisitReport.totalImplementationCost), options: { colspan: 1, bold: true, align: 'right' } },
      { text: this.formatCurrency(this.onSiteVisitReport.totalNonNebCostSavings), options: { colspan: 1, bold: true, align: 'right' } },
      { text: this.formatNumber(this.onSiteVisitReport.totalPaybackWithoutNebs), options: { colspan: 1, bold: true, align: 'right' } },
      { text: this.formatCurrency(this.onSiteVisitReport.finalImplementationCost), options: { colspan: 1, bold: true, align: 'right' } },
      { text: this.formatCurrency(this.onSiteVisitReport.totalFinancialImpact), options: { colspan: 1, bold: true, align: 'right' } },
      { text: this.formatNumber(this.onSiteVisitReport.totalPaybackWithNebs), options: { colspan: 1, bold: true, align: 'right' } }
    ]);

    slide.addText("Impact on Project Payback", { placeholder: 'title' });
    slide.addTable(rows, { x: 0.5, y: 1.3, margin: 0.05, border: { color: "CFCFCF" }, autoPage: true, autoPageSlideStartY: 1.3, autoPageRepeatHeader: true, fontSize: 10, fontFace: 'Arial' });
    slide.newAutoPagedSlides.forEach((slide) => slide.addText("Impact on Project Payback (cont.)", { placeholder: "title" }));
  }

  getSitePaybackTable(slide: pptxgen.Slide) {
    let rows = [];
    rows.push([
      { options: { colspan: 3 } },
      { text: "Energy Cost Savings", options: { colspan: 2, bold: true, align: 'center' } },
      { text: "With Operational Cost Savings", options: { colspan: 2, bold: true, align: 'center' } }
    ]);

    rows.push([
      { options: { colspan: 2 } },
      { text: "Implementation Cost (" + this.currencyUnicode + ")", options: { colspan: 1, bold: true, align: 'center' } },
      { text: "Financial Impact (" + this.currencyUnicode + "/yr)", options: { colspan: 1, bold: true, align: 'center' } },
      { text: "Simple Payback (yrs)", options: { colspan: 1, bold: true, align: 'center' } },
      { text: "Financial Impact (" + this.currencyUnicode + "/yr)", options: { colspan: 1, bold: true, align: 'center' } },
      { text: "Simple Payback (yrs)", options: { colspan: 1, bold: true, align: 'center' } }
    ]);

    this.onSiteVisitReport.assessmentReports.forEach(report =>
      rows.push([
        { text: report.name, options: { colspan: 2 } },
        { text: this.formatCurrency(report.totalImplementationCost), options: { colspan: 1, align: 'right' } },
        { text: this.formatCurrency(report.totalNonNebCostSavings), options: { colspan: 1, align: 'right' } },
        { text: this.formatNumber(report.totalPaybackWithoutNebs), options: { colspan: 1, align: 'right' } },
        { text: this.formatCurrency(report.totalFinancialImpact), options: { colspan: 1, align: 'right' } },
        { text: this.formatNumber(report.totalPaybackWithNebs), options: { colspan: 1, align: 'right' } }
      ])
    );

    rows.push([
      { text: "Total", options: { colspan: 2, bold: true } },
      { text: this.formatCurrency(this.onSiteVisitReport.totalImplementationCost), options: { colspan: 1, bold: true, align: 'right' } },
      { text: this.formatCurrency(this.onSiteVisitReport.totalNonNebCostSavings), options: { colspan: 1, bold: true, align: 'right' } },
      { text: this.formatNumber(this.onSiteVisitReport.totalPaybackWithoutNebs), options: { colspan: 1, bold: true, align: 'right' } },
      { text: this.formatCurrency(this.onSiteVisitReport.totalFinancialImpact), options: { colspan: 1, bold: true, align: 'right' } },
      { text: this.formatNumber(this.onSiteVisitReport.totalPaybackWithNebs), options: { colspan: 1, bold: true, align: 'right' } }
    ]);

    slide.addText("Impact on Project Payback", { placeholder: 'title' });
    slide.addTable(rows, { x: 0.5, y: 1.3, margin: 0.05, border: { color: "CFCFCF" }, autoPage: true, autoPageSlideStartY: 1.3, autoPageRepeatHeader: true, fontSize: 10, fontFace: 'Arial' });
    slide.newAutoPagedSlides.forEach((slide) => slide.addText("Impact on Project Payback (cont.)", { placeholder: "title" }));
  }

  addSiteVisitSavingsChart(pptx: any, slide: pptxgen.Slide) {
    let costSavingLabel = this.onSiteVisitReport.utilityCategory === 'energy' ? 'Energy Cost Savings' : 'Utility Cost Savings';
    let arrDataValues = [
      {
        labels: [costSavingLabel, 'Operational Cost Savings'],
        values: [this.onSiteVisitReport.totalNonNebCostSavings, this.onSiteVisitReport.totalNebFinancialImpact]
      }
    ]
    let title: string = 'Total Annual Financial Impact\n' + this.currencyUnicode + this.onSiteVisitReport.totalFinancialImpact.toLocaleString() + ' (' + this.currencyUnicode + '/yr)';
    slide.addText("Annual Savings with Operational Impacts", { placeholder: 'title' });
    slide.addChart(pptx.charts.BAR, arrDataValues, this.getSavingsBarChartProperties(title));

    if (this.onSiteVisitReport.assessmentReports.length > 1) {
      this.onSiteVisitReport.assessmentReports.forEach(report => {
        let slide = pptx.addSlide({ masterName: "Title Only" });
        this.assessmentReport = report;
        this.getAssessmentSavingsChart(pptx, true, slide);
      });
    }
  }

  addSiteDetailsTable(slide: pptxgen.Slide) {
    let rows = [];
    rows.push([
      { text: "Company", options: { colspan: 1 } },
      { text: this.company.generalInformation.name, options: { colspan: 1 } }
    ]);
    rows.push([
      { text: "Facility", options: { colspan: 1 } },
      { text: this.facility.generalInformation.name, options: { colspan: 1 } }
    ]);
    rows.push([
      { text: "Visit Date", options: { colspan: 1 } },
      { text: this.datePipe.transform(this.onSiteVisit.visitDate, 'mediumDate'), options: { colspan: 1 } }
    ]);
    let assessments: string = '';
    this.onSiteVisitReport.assessmentReports.map(report => {
      assessments = assessments + report.assessment.name + '\n';
    });
    rows.push([
      { text: "Assessments", options: { colspan: 1 } },
      { text: assessments, options: { colspan: 1 } }
    ]);
    slide.addText("On Site Details", { placeholder: 'title' });
    slide.addTable(rows, { x: 0.5, y: 1.5, margin: 0.05, border: { color: "CFCFCF" }, autoPage: true, fontSize: 10, fontFace: 'Arial' });
  }

  setVisitType(onSiteVisitReport: OnSiteVisitReport, company: IdbCompany, facility: IdbFacility) {
    this.onSiteVisitReport = onSiteVisitReport;
    this.company = company;
    this.facility = facility;
  }

  addRollupTitleSlide(slide: pptxgen.Slide) {
    let pptTitle: string;
    pptTitle = "JUSTIFI Report\nRollup Report";
    slide.addText(pptTitle, { placeholder: 'title' });
    slide.addText(this.getCurrentDate(), { placeholder: 'body' });
  }

  addSubTitleSlide(slide: pptxgen.Slide, title: string) {
    slide.addText(title, { placeholder: 'title' });
  }

  formatPercentage(value: number): string {
    if (value == null || value == 0 || Number.isNaN(value))
      return '\u2014';
    return Number.isInteger(value) ? value + "%" : value.toFixed(2) + "%";
  }

  formatCurrency(value: number): string {
    if (value == null || value == 0 || Number.isNaN(value))
      return '\u2014';
    else if (value < 0)
      return '-' + this.currencyUnicode + Math.abs(value).toLocaleString();
    else
      return this.currencyUnicode + value.toLocaleString();
  }

  formatNumber(value: number): string {
    if (value == 0 || Number.isNaN(value) || value == null)
      return '\u2014';
    return Number.isInteger(value) ? value.toString() : value.toFixed(2);
  }

  getCurrentDate(): string {
    const date: Date = new Date();
    let formattedDate: string = this.datePipe.transform(date, 'mediumDate');
    return formattedDate;
  }

  setPerformanceIndicators() {
    this.kpmRevenueReports = new Array();
    this.kpmCostSavingsReports = new Array();
    this.qualitativeReports = new Array();
    if (this.keyPerformanceIndicatorReport) {
      this.keyPerformanceIndicatorReport.kpmReportItems.forEach(reportItem => {
        if (reportItem.keyPerformanceMetric.isQuantitative) {
          if (reportItem.keyPerformanceMetric.goalToIncrease) {
            this.kpmRevenueReports.push(reportItem);
          } else {
            this.kpmCostSavingsReports.push(reportItem);
          }
        } else {
          this.qualitativeReports.push(reportItem);
        }
      });
      this.totalCostSavings = _.sumBy(this.kpmCostSavingsReports, (reportItem: KeyPerformanceMetricReportItem) => {
        return reportItem.performanceMetricImpact.costAdjustment
      });
      this.totalRevenue = _.sumBy(this.kpmRevenueReports, (reportItem: KeyPerformanceMetricReportItem) => {
        return reportItem.performanceMetricImpact.costAdjustment
      });
    }
  }
}
