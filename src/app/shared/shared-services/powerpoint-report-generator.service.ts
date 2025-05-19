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
import { KeyPerformanceMetricReportItem } from '../reports/calculations/keyPerformanceIndicatorReport';
import * as _ from 'lodash';
import { NebReport } from '../reports/calculations/nebReport';
import { OrderMetricsTableFields, PerformanceMetricsTablePipe } from '../reports/performance-metrics-table/performance-metrics-table.pipe';
import { IdbAssessment } from 'src/app/models/assessment';

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

  orderByDir: 'asc' | 'desc' = 'desc';
  orderByField: OrderMetricsTableFields = 'costAdjustment';
  constructor(
    private localeService: LocaleService,
    private currencyPipe: CurrencyPipe,
    private datePipe: DatePipe,
    private performanceMetricsTablePipe: PerformanceMetricsTablePipe
  ) { }

  createPPT(assessmentReport: AssessmentReport, company: IdbCompany, facility: IdbFacility, inRollup: boolean, assessment: IdbAssessment) {
    this.currencySymbolPipe = new CurrencySymbolPipe(this.currencyPipe);
    this.currencySub = this.localeService.currencyCode.subscribe(currencyCode => {
      this.currencySymbol = this.currencySymbolPipe.transform(currencyCode)
      this.currencyUnicode = localeCurrency.find(option => {
        return option.currencyCode == currencyCode
      }).unicode;
    })

    this.assessmentName = assessment.name
    this.assessmentReport = assessmentReport;
    let pptx = new pptxgen();

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


    let titleSlide = pptx.addSlide({ masterName: "Title Slide" });
    this.addTitleSlide(titleSlide);
    let nebstaticSlide = pptx.addSlide({ masterName: "Title and Content" });
    this.addNebStaticSlide(nebstaticSlide);
    let nebContributionStaticSlide = pptx.addSlide({ masterName: "Title Only" });
    this.addNebContributionStaticSlide(nebContributionStaticSlide);
    let slide1 = pptx.addSlide({ masterName: "Title Only" });
    this.getAssessmentTableContents(company, facility, slide1);
    let slide2 = pptx.addSlide({ masterName: "Title Only" });
    this.getAssessmentSavingsChart(pptx, inRollup, slide2);
    let slide3 = pptx.addSlide({ masterName: "Title Only" });
    this.getPerformanceMetricsTable(slide3);
    let slide4 = pptx.addSlide({ masterName: "Title Only" });
    this.getPerformanceMetricsChart(pptx, slide4);
    let slide5 = pptx.addSlide({ masterName: "Title Only" });
    this.getPaybackTable(slide5);
    let slide6 = pptx.addSlide({ masterName: "Title Only" });
    this.getNebContributionsBarChart(pptx, slide6);
    let slide7 = pptx.addSlide({ masterName: "Title Only" });
    this.getAssessmentCostTable(slide7);
    let slide8 = pptx.addSlide({ masterName: "Title Only" });
    this.getAssessmentSavingsTable(slide8);

    pptx.writeFile({ fileName: 'Assessment_Report.pptx' });
  }

  addTitleSlide(titleSlide: pptxgen.Slide) {
    let pptTitle: string;
    pptTitle = "JUSTIFI Report\n" + this.assessmentName;
    titleSlide.addText(pptTitle, { placeholder: 'title' });
    titleSlide.addText(this.getCurrentDate(), { placeholder: 'body' });
  }

  addNebContributionStaticSlide(nebContributionStaticSlide: pptxgen.Slide) {
    nebContributionStaticSlide.addText('NEBs Contribute to Strategic Business Goals', { placeholder: 'title' });
    nebContributionStaticSlide.addImage({ path: "/assets/images/neb-business-goals.png", x: 1, y: 1.2, w: 8, h: 4 });
  }

  addNebStaticSlide(nebstaticSlide: pptxgen.Slide) {
    nebstaticSlide.addText('What are NEBs?', { placeholder: 'title' });
    nebstaticSlide.addText(
      "Non-energy benefits (NEBs) are the positive outcomes that result from energy efficiency efforts, beyond the direct savings in energy and demand.\nNEBs can be beneficial participants in energy efficiency program, the utility system, and society.\nAlso known commonly known as co-benefits, soft benefits, auxiliary benefits, ot non-energy impacts.",
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

    rows.push([
      { text: "Assessment Total Utility Savings", options: { colspan: 2 } },
      { text: this.formatCurrency(this.assessmentReport.assessment.costSavings), options: { colspan: 1, align: 'right' } },
    ]);

    if (this.assessmentReport.assessment.energyCostSavings && this.assessmentReport.assessment.energyCostSavings != this.assessmentReport.assessment.costSavings) {
      rows.push([
        { text: "Assessment Energy Savings", options: { colspan: 2 } },
        { text: this.formatCurrency(this.assessmentReport.assessment.energyCostSavings), options: { colspan: 1, align: 'right' } },
      ]);
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

    this.assessmentReport.assessmentNebReports.forEach(nebReport =>
      rows.push([
        { text: nebReport.nonEnergyBenefit.name, options: { colspan: 2 } },
        { text: this.formatCurrency(nebReport.totalFinancialImpact), options: { colspan: 1, align: 'right' } }
      ])
    );

    rows.push([
      { text: "Total Assessment Level Impact", options: { colspan: 2, bold: true, border: [{ pt: 1, color: 'CFCFCF' }, { pt: 1, color: 'CFCFCF' }, { pt: 2, color: '000000' }, { pt: 1, color: 'CFCFCF' }] } },
      { text: this.formatCurrency(this.assessmentReport.totalNonOpportunityCostSavings), options: { colspan: 1, align: 'right', bold: true, border: [{ pt: 1, color: 'CFCFCF' }, { pt: 1, color: 'CFCFCF' }, { pt: 2, color: '000000' }, { pt: 1, color: 'CFCFCF' }] } },
    ]);

    this.assessmentReport.energyOpportunityReports.forEach(energyOpportunityReport => {
      rows.push([
        { text: energyOpportunityReport.energyOpportunity.name, options: { colspan: 3, bold: true, bullet: { code: "25BA" }, color: '000000' } }
      ]);

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

      energyOpportunityReport.nebReports.forEach(nebReport => {
        rows.push([
          { text: nebReport.nonEnergyBenefit.name, options: { colspan: 2 } },
          { text: this.formatCurrency(nebReport.totalFinancialImpact), options: { colspan: 1, align: 'right' } },
        ]);
      });

      rows.push([
        { text: energyOpportunityReport.energyOpportunity.name + " Total Impact", options: { colspan: 2, bold: true, border: [{ pt: 1, color: 'CFCFCF' }, { pt: 1, color: 'CFCFCF' }, { pt: 2, color: '000000' }, { pt: 1, color: 'CFCFCF' }] } },
        { text: this.formatCurrency(energyOpportunityReport.totalFinancialImpact), options: { colspan: 1, align: 'right', bold: true, border: [{ pt: 1, color: 'CFCFCF' }, { pt: 1, color: 'CFCFCF' }, { pt: 2, color: '000000' }, { pt: 1, color: 'CFCFCF' }] } },
      ]);
    }
    );

    rows.push([
      { text: "Total Utility Savings", options: { colspan: 2, bold: true } },
      { text: this.formatCurrency(this.assessmentReport.totalNonNebCostSavings), options: { colspan: 1, align: 'right', bold: true } },
    ]);
    rows.push([
      { text: "Total Additional Operational Benefits", options: { colspan: 2, bold: true } },
      { text: this.formatCurrency(this.assessmentReport.totalNebFinancialImpact), options: { colspan: 1, align: 'right', bold: true } },
    ]);
    rows.push([
      { text: "Total Financial Impact W/ NEBs", options: { colspan: 2, bold: true } },
      { text: this.formatCurrency(this.assessmentReport.totalFinancialImpact), options: { colspan: 1, align: 'right', bold: true } },
    ]);
    slide.addText("NEB Financial Impact Details", { placeholder: 'title' });
    slide.addTable(rows, { x: 0.5, y: 1.3, margin: 0.05, border: { color: "CFCFCF" }, autoPage: true, autoPageSlideStartY: 1.3, autoPageRepeatHeader: true, fontSize: 10, fontFace: 'Arial' });
    slide.newAutoPagedSlides.forEach((slide) => slide.addText("NEB Financial Impact Details (cont.)", { placeholder: "title" }));
  }

  getAssessmentCostTable(slide: pptxgen.Slide) {
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
    // slide.addTable(rows, { x: 0.5, y: 1.5, margin: 0.05, border: { color: "CFCFCF" }, autoPage: true, fontSize: 10, fontFace: 'Arial' });
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
    labels.push('Total NEBs');
    values.push(this.assessmentReport.totalNebFinancialImpact);

    let arrDataValues = [
      {
        labels: labels,
        values: values
      }
    ];
    let title: string = this.assessmentReport.assessment.name + ' Non-energy Benefits';
    slide.addText("NEBs Financial Impacts", { placeholder: 'title' });
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

  getPaybackTable(slide: pptxgen.Slide) {
    let rows = [];
    rows.push([
      { options: { colspan: 2 } },
      { text: "Implementation Cost (" + this.currencyUnicode + ")", options: { colspan: 1, bold: true, align: 'right' } },
      { text: "Cost Savings (" + this.currencyUnicode + "/yr)", options: { colspan: 1, bold: true, align: 'right' } },
      { text: "Financial Impact With NEBs (" + this.currencyUnicode + "/yr)", options: { colspan: 1, bold: true, align: 'right' } },
      { text: "Simple Payback (yrs)", options: { colspan: 1, bold: true, align: 'right' } },
      { text: "Simple Payback With NEBs (yrs)", options: { colspan: 1, bold: true, align: 'right' } }
    ]);

    rows.push([
      { text: this.assessmentReport.assessment.name, options: { colspan: 2 } },
      { text: this.formatCurrency(this.assessmentReport.assessment.implementationCost), options: { colspan: 1, align: 'right' } },
      { text: this.formatCurrency(this.assessmentReport.assessment.costSavings), options: { colspan: 1, align: 'right' } },
      { text: this.formatCurrency(this.assessmentReport.totalNonOpportunityCostSavings), options: { colspan: 1, align: 'right' } },
      { text: this.formatNumber(this.assessmentReport.nonOpportunityPaybackWithoutNebs), options: { colspan: 1, align: 'right' } },
      { text: this.formatNumber(this.assessmentReport.nonOpportunityPaybackWithNebs), options: { colspan: 1, align: 'right' } }
    ]);

    this.assessmentReport.energyOpportunityReports.forEach(energyOpportunityReport =>
      rows.push([
        { text: energyOpportunityReport.energyOpportunity.name, options: { colspan: 2 } },
        { text: this.formatCurrency(energyOpportunityReport.energyOpportunity.implementationCost), options: { colspan: 1, align: 'right' } },
        { text: this.formatCurrency(energyOpportunityReport.totalNonNebCostSavings), options: { colspan: 1, align: 'right' } },
        { text: this.formatCurrency(energyOpportunityReport.totalFinancialImpact), options: { colspan: 1, align: 'right' } },
        { text: this.formatNumber(energyOpportunityReport.paybackWithoutNebs), options: { colspan: 1, align: 'right' } },
        { text: this.formatNumber(energyOpportunityReport.paybackWithNebs), options: { colspan: 1, align: 'right' } }
      ])
    );

    rows.push([
      { text: "Assessment Total", options: { colspan: 2, bold: true } },
      { text: this.formatCurrency(this.assessmentReport.totalImplementationCost), options: { colspan: 1, bold: true, align: 'right' } },
      { text: this.formatCurrency(this.assessmentReport.totalNonNebCostSavings), options: { colspan: 1, bold: true, align: 'right' } },
      { text: this.formatCurrency(this.assessmentReport.totalFinancialImpact), options: { colspan: 1, bold: true, align: 'right' } },
      { text: this.formatNumber(this.assessmentReport.totalPaybackWithoutNebs), options: { colspan: 1, bold: true, align: 'right' } },
      { text: this.formatNumber(this.assessmentReport.totalPaybackWithNebs), options: { colspan: 1, bold: true, align: 'right' } }
    ]);
    slide.addText("Project Overview", { placeholder: 'title' });
    slide.addTable(rows, { x: 0.5, y: 1.3, margin: 0.05, border: { color: "CFCFCF" }, autoPage: true, autoPageSlideStartY: 1.3, autoPageRepeatHeader: true, fontSize: 10, fontFace: 'Arial' });
    slide.newAutoPagedSlides.forEach((slide) => slide.addText("Project Overview (cont.)", { placeholder: "title" }));
    //slide.addTable(rows, { x: 0.5, y: 1.5, margin: 0.05, border: { color: "CFCFCF" }, autoPage: true, fontSize: 10, fontFace: 'Arial' });
  }

  getPerformanceMetricsChart(pptx: any, slide: pptxgen.Slide) {
    let kpmReportItems: Array<KeyPerformanceMetricReportItem> = this.assessmentReport.keyPerformanceIndicatorReport.kpmReportItems.filter(kpmReportItem => {
      return kpmReportItem.keyPerformanceMetric.isQuantitative && kpmReportItem.keyPerformanceMetric.baselineCost
    });
    kpmReportItems = _.orderBy(kpmReportItems, (reportItem: KeyPerformanceMetricReportItem) => {
      return reportItem.keyPerformanceMetric.baselineCost;
    }, 'desc');

    let labels = kpmReportItems.map(reportItem => reportItem.keyPerformanceMetric.label);

    let arrDataValues = [
      {
        name: "Current (" + this.currencyUnicode + "/yr)",
        labels: labels,
        values: kpmReportItems.map(reportItem => reportItem.keyPerformanceMetric.baselineCost),
        color: ['e67e22']
      },
      {
        name: "Potential (" + this.currencyUnicode + "/yr)",
        labels: labels,
        values: kpmReportItems.map(reportItem => reportItem.performanceMetricImpact.modifiedCost),
        color: ['e67e22']
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
      dataLabelPosition: 'bestFit',
      valAxisLabelFormatCode: '$[>0]0,"K";$0',
      chartColors: ['#e67e22', '196f3d'],
      dataLabelColor: '000000',
      fontFace: "Arial",
      catAxisLabelColor: '#000000',
      valAxisLabelColor: '#000000',
      dataLabelFontSize: 10,
      catAxisLabelFontSize: 10,
      valAxisLabelFontSize: 10,
      valGridLine: { style: "none" }
    };
    return barChartOptions;
  }

  getPerformanceMetricsTable(slide: pptxgen.Slide) {
    let rows = [];
    rows.push([
      { options: { colspan: 2 } },
      { text: "Current (" + this.currencyUnicode + "/yr)", options: { colspan: 1, bold: true, align: "right" } },
      { text: "Financial Impact (" + this.currencyUnicode + "/yr)", options: { colspan: 1, bold: true, align: "right" } },
      { text: "Potential (" + this.currencyUnicode + "/yr)", options: { colspan: 1, bold: true, align: "right" } },
      { text: "Change (%)", options: { colspan: 1, bold: true } },
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
    //slide.addTable(rows, { x: 0.5, y: 1.5, margin: 0.05, border: { color: "CFCFCF" }, autoPage: true, fontSize: 10, fontFace: 'Arial' });
  }

  getAssessmentSavingsChart(pptx: any, inRollup: boolean, slide: pptxgen.Slide) {
    let arrDataValues = [
      {
        labels: ["Utility Cost Savings", "Non-Energy Benefits"],
        values: [this.assessmentReport.totalNonNebCostSavings, this.assessmentReport.totalNebFinancialImpact]
      }
    ]
    let title: string = 'Annual Savings' + " " + this.currencyUnicode + this.assessmentReport.totalFinancialImpact.toLocaleString() + ' (' + this.currencyUnicode + '/yr)';
    if (inRollup) {
      title = this.assessmentReport.assessment.name + ' Annual Savings<br>' + this.currencyUnicode + this.assessmentReport.totalFinancialImpact.toLocaleString() + ' (' + this.currencyUnicode + '/yr)';
    }
    slide.addText("Annual Savings with NEBs", { placeholder: 'title' });
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
    // rows.push([
    //   { text: "Assessment Details", options: { colspan: 2, bold: true } }
    // ]);
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

  setReports(kpmRevenueReports: KeyPerformanceMetricReportItem[], kpmCostSavingsReports: KeyPerformanceMetricReportItem[], qualitativeReports: KeyPerformanceMetricReportItem[], totalCostSavings: number, totalRevenue: number) {
    this.kpmRevenueReports = kpmRevenueReports;
    this.kpmCostSavingsReports = kpmCostSavingsReports;
    this.qualitativeReports = qualitativeReports;
    this.totalCostSavings = totalCostSavings;
    this.totalRevenue = totalRevenue;
  }

  setOrder(orderByDir: any, orderByField: any) {
    this.orderByDir = orderByDir;
    this.orderByField = orderByField;
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
      return this.currencyUnicode + " " + value.toLocaleString();
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
}
