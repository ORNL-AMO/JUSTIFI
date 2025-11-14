import { CurrencyPipe, formatDate } from '@angular/common';
import { Injectable } from '@angular/core';
import * as ExcelJS from 'exceljs';
import { CompanyIdbService } from 'src/app/indexed-db/company-idb.service';
import { FacilityIdbService } from 'src/app/indexed-db/facility-idb.service';
import { IdbAssessment } from 'src/app/models/assessment';
import { IdbCompany } from 'src/app/models/company';
import { IdbFacility } from 'src/app/models/facility';
import { AssessmentReport, getAssessmentReport } from '../reports/calculations/assessmentReport';
import { CurrencySymbolPipe } from '../helper-pipes/currency-symbol.pipe';
import { LocaleService } from './locale.service';
import { Subscription } from 'rxjs';
import { KeyPerformanceMetricReportItem } from '../reports/calculations/keyPerformanceIndicatorReport';
import * as _ from 'lodash';
import { KpmImpactsReportItem } from '../reports/performance-metrics-impacts-table/performance-metrics-impacts-table.component';
import { IdbOnSiteVisit } from 'src/app/models/onSiteVisit';
import { getOnSiteVisitReport, OnSiteVisitReport } from '../reports/calculations/visitReport';
import { IdbReport } from 'src/app/models/report';
import { SharedDataService } from './shared-data.service';
import { IdbEnergyOpportunity } from 'src/app/models/energyOpportunity';
import { IdbKeyPerformanceIndicator } from 'src/app/models/keyPerformanceIndicator';
import { IdbKeyPerformanceMetricImpact } from 'src/app/models/keyPerformanceMetricImpact';
import { IdbNonEnergyBenefit } from 'src/app/models/nonEnergyBenefit';
import { KeyPerformanceMetric } from '../constants/keyPerformanceMetrics';
import { EnergyOpportunityIdbService } from 'src/app/indexed-db/energy-opportunity-idb.service';
import { KeyPerformanceIndicatorsIdbService } from 'src/app/indexed-db/key-performance-indicators-idb.service';
import { KeyPerformanceMetricImpactsIdbService } from 'src/app/indexed-db/key-performance-metric-impacts-idb.service';
import { NonEnergyBenefitsIdbService } from 'src/app/indexed-db/non-energy-benefits-idb.service';
import JSZip from 'jszip';
import { AssessmentIdbService } from 'src/app/indexed-db/assessment-idb.service';

@Injectable({
  providedIn: 'root'
})
export class DataEvaluationExcelWriterService {

  currencySub: Subscription;
  currencySymbolPipe: CurrencySymbolPipe;
  currencySymbol: string;

  kpmRevenueReports: Array<KeyPerformanceMetricReportItem>;
  totalRevenue: number;
  kpmCostSavingsReports: Array<KeyPerformanceMetricReportItem>;
  totalCostSavings: number;
  qualitativeReports: Array<KeyPerformanceMetricReportItem>;
  kpmImpactsReports: Array<KpmImpactsReportItem>;
  onSiteVisitReport: OnSiteVisitReport;
  assessmentReport: AssessmentReport;
  reportToExport: string;
  workbookList: Array<{ workbook: ExcelJS.Workbook, filename: string }> = [];
  downloadAsZip: boolean = false;

  COLOR_DARK = 'FF34495e';
  COLOR_WITHOUT_NEBS_DARK = 'FF4d5656';
  COLOR_WITH_NEBS_DARK = 'FF085646';
  COLOR_LIGHT = 'FFaeb6bf';
  COLOR_WITHOUT_NEBS = 'FFbfc9ca';
  COLOR_WITH_NEBS = 'FFd1e7dd';

  constructor(
    private facilityIdbService: FacilityIdbService,
    private companyIdbService: CompanyIdbService,
    private localeService: LocaleService,
    private currencyPipe: CurrencyPipe,
    private sharedDataService: SharedDataService,
    private energyOpportunityIdbService: EnergyOpportunityIdbService,
    private nonEnergyBenefitIdbService: NonEnergyBenefitsIdbService,
    private keyPerformanceIndicatorIdbService: KeyPerformanceIndicatorsIdbService,
    private assessmentIdbService: AssessmentIdbService,
    private keyPerformanceMetricImpactsIdbService: KeyPerformanceMetricImpactsIdbService
  ) {
    this.currencySymbolPipe = new CurrencySymbolPipe(this.currencyPipe);
    this.currencySub = this.localeService.currencyCode.subscribe(currencyCode => {
      this.currencySymbol = this.currencySymbolPipe.transform(currencyCode);
    });
    this.sharedDataService.exportReportToExcel.subscribe(reportType => {
      this.reportToExport = reportType;
    });
  }

  setSiteVisitReport(onSiteVisitReport: OnSiteVisitReport) {
    this.onSiteVisitReport = onSiteVisitReport;
  }

  setAssessmentReport(assessmentReport: AssessmentReport) {
    this.assessmentReport = assessmentReport;
  }

  exportAssessmentDataToExcel(assessment: IdbAssessment) {
    let company: IdbCompany;
    let facility: IdbFacility;
    company = this.companyIdbService.getByGUID(assessment.companyId);
    facility = this.facilityIdbService.getByGUID(assessment.facilityId);
    this.setKPM(this.assessmentReport.keyPerformanceIndicatorReport);
    this.setKpmImpactReport(this.assessmentReport.keyPerformanceIndicatorReport);

    let assessmentWorkbook = new ExcelJS.Workbook();

    const worksheet: ExcelJS.Worksheet = assessmentWorkbook.addWorksheet('Assessment Details');
    this.setAssessmentDetailsWorksheet(worksheet, company, facility, assessment);

    if (this.assessmentReport.keyPerformanceIndicatorReport && this.assessmentReport.keyPerformanceIndicatorReport.kpiReportItems.length > 0) {
      const worksheet2: ExcelJS.Worksheet = assessmentWorkbook.addWorksheet('KPM Financial Impacts');
      this.setKpmFinancialImpactsWorksheet(worksheet2);

      const worksheet3: ExcelJS.Worksheet = assessmentWorkbook.addWorksheet('KPM Impacts');
      this.setKPMImpactsWorksheet(worksheet3);
    }

    if (this.assessmentReport.assessment.utilitySavingsByAssessment) {
      let worksheet4: ExcelJS.Worksheet = assessmentWorkbook.addWorksheet('Payback Period Comparison');
      this.setPaybackPeriodComparisonWorksheet(worksheet4, this.assessmentReport);
    }
    else {
      if (this.assessmentReport.totalRebates) {
        let worksheet5: ExcelJS.Worksheet = assessmentWorkbook.addWorksheet('Impact on Implementation Costs');
        this.setImplementationCostWorksheet(worksheet5, this.assessmentReport);
      }

      let worksheet6: ExcelJS.Worksheet = assessmentWorkbook.addWorksheet('Impact on Annual Costs');
      this.setImpactOnAnnualCostsWorksheet(worksheet6, this.assessmentReport);

      let worksheet7: ExcelJS.Worksheet = assessmentWorkbook.addWorksheet('Impact on Project Payback');
      this.setProjectPaybackWorksheet(worksheet7, this.assessmentReport);
    }

    let worksheet8: ExcelJS.Worksheet = assessmentWorkbook.addWorksheet('Current Annual Assessment Costs');
    this.setCurrentAnnualAssessmentCostsWorksheet(worksheet8, this.assessmentReport);

    let worksheet9: ExcelJS.Worksheet = assessmentWorkbook.addWorksheet('Annual Financial Impacts');
    this.setAnnualFinancialImpactsWorksheet(worksheet9, this.assessmentReport);

    if (this.reportToExport === 'assessment_report' || (this.reportToExport == 'custom_report' && !this.downloadAsZip)) {
      this.exportAssessment(assessmentWorkbook, assessment.name + '_' + formatDate(new Date(), 'MM-dd-yyyy', 'en-US'));
    }

    if (this.reportToExport === 'on_site_visit' || (this.reportToExport == 'custom_report' && this.downloadAsZip)) {
      this.workbookList.push({ workbook: assessmentWorkbook, filename: assessment.name + '_' + formatDate(new Date(), 'MM-dd-yyyy', 'en-US') + '.xlsx' });
    }
  }

  exportSiteVisitToExcel(onSiteVisit: IdbOnSiteVisit) {
    this.workbookList = [];
    let company: IdbCompany;
    let facility: IdbFacility;
    company = this.companyIdbService.getByGUID(onSiteVisit.companyId);
    facility = this.facilityIdbService.getByGUID(onSiteVisit.facilityId);
    this.setKPM(this.onSiteVisitReport?.keyPerformanceIndicatorReport);
    this.setKpmImpactReport(this.onSiteVisitReport?.keyPerformanceIndicatorReport);

    let siteWorkbook = new ExcelJS.Workbook();

    if (this.onSiteVisitReport) {
      const worksheet: ExcelJS.Worksheet = siteWorkbook.addWorksheet('On Site Details');
      this.setSiteVisitDetailsWorksheet(worksheet, company, facility, onSiteVisit);

      if (this.onSiteVisitReport.keyPerformanceIndicatorReport?.kpiReportItems.length > 0) {
        const worksheet2: ExcelJS.Worksheet = siteWorkbook.addWorksheet('KPM Financial Impacts');
        this.setKpmFinancialImpactsWorksheet(worksheet2);
      }

      if (this.onSiteVisitReport.keyPerformanceIndicatorReport) {
        const worksheet3: ExcelJS.Worksheet = siteWorkbook.addWorksheet('KPM Impacts');
        this.setKPMImpactsWorksheet(worksheet3);
      }

      const worksheet4: ExcelJS.Worksheet = siteWorkbook.addWorksheet('Impact on Project Payback');
      this.setSiteProjectPaybackWorksheet(worksheet4);

      if (this.reportToExport == 'on_site_visit' || (this.reportToExport == 'custom_report' && this.downloadAsZip)) {
        this.workbookList.push({ workbook: siteWorkbook, filename: 'Rollup_Report_' + formatDate(new Date(), 'MM-dd-yyyy', 'en-US') + '.xlsx' });
      }
      else {
        this.exportAssessment(siteWorkbook, 'Rollup_Report_' + formatDate(new Date(), 'MM-dd-yyyy', 'en-US'));
      }

      if (this.reportToExport === 'on_site_visit') {
        if (this.onSiteVisitReport.assessmentReports && this.onSiteVisitReport.assessmentReports.length > 0) {
          this.onSiteVisitReport.assessmentReports.forEach(assessmentReport => {
            this.assessmentReport = assessmentReport;
            this.exportAssessmentDataToExcel(assessmentReport.assessment);
          });
        }
        this.downloadExcelFilesAsZip(this.workbookList, 'Rollup_Report_' + formatDate(new Date(), 'MM-dd-yyyy', 'en-US'));
      }
    }
  }

  exportCustomReportToExcel(report: IdbReport, onSiteVisit: IdbOnSiteVisit, assessments: Array<IdbAssessment>) {
    this.workbookList = [];
    this.downloadAsZip = false;

    if (report.reportType == 'assessment') {
      if (report.assessmentReportOptions.includeRollupReport && report.assessmentReportOptions.includeIndividualAssessments)
        this.downloadAsZip = true;
      else if (report.assessmentOptions.filter(option => option.include).length > 1)
        this.downloadAsZip = true;
    }

    if (report.reportType == 'assessment') {
      if (report.assessmentReportOptions.includeRollupReport) {
        this.getSiteVisitReport(onSiteVisit, report);
        this.exportSiteVisitToExcel(onSiteVisit);
      }
      if (report.assessmentReportOptions.includeIndividualAssessments) {
        report.assessmentOptions.forEach(assessmentOption => {
          if (assessmentOption.include) {
            let assessment = assessments.find(a => { return a.guid == assessmentOption.assessmentId });
            if (assessment) {
              this.getAssessmentReport(assessment, report);
              this.exportAssessmentDataToExcel(assessment);
            }
          }
        });
      }

      if (this.downloadAsZip)
        this.downloadExcelFilesAsZip(this.workbookList, report.name + '_' + formatDate(new Date(), 'MM-dd-yyyy', 'en-US'));
    }
  }

  exportAssessment(workbook: ExcelJS.Workbook, workbookTitle: string) {
    workbook.xlsx.writeBuffer().then(excelData => {
      let blob: Blob = new Blob([excelData], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      let a = document.createElement("a");
      let url = window.URL.createObjectURL(blob);
      a.href = url;
      a.download = workbookTitle;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    });
  }

  async downloadExcelFilesAsZip(fileConfigs: Array<{ workbook: ExcelJS.Workbook, filename: string }>, zipTitle: string) {
    const zip = new JSZip();

    for (const config of fileConfigs) {
      const buffer = await config.workbook.xlsx.writeBuffer();
      zip.file(config.filename, buffer);
    }

    const zipBlob = await zip.generateAsync({ type: 'blob' });
    const a = document.createElement('a');
    const url = window.URL.createObjectURL(zipBlob);
    a.href = url;
    a.download = zipTitle + '.zip';
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  }

  setSiteProjectPaybackWorksheet(worksheet: ExcelJS.Worksheet) {
    let index = 2;

    this.setCellData(worksheet, 1, 1, '', true, this.COLOR_DARK);
    this.setCellData(worksheet, 2, 1, '', true, this.COLOR_DARK);
    if (this.onSiteVisitReport?.totalRebates) {
      this.setCellData(worksheet, 1, 2, 'Without NEBs', true, this.COLOR_WITHOUT_NEBS_DARK);
      this.setCellData(worksheet, 1, 3, '', true, this.COLOR_WITHOUT_NEBS_DARK);
      this.setCellData(worksheet, 1, 4, '', true, this.COLOR_WITHOUT_NEBS_DARK);
      worksheet.mergeCells(1, 2, 1, 4);
      this.setCellData(worksheet, 1, 5, 'With NEBs', true, this.COLOR_WITH_NEBS_DARK);
      this.setCellData(worksheet, 1, 6, '', true, this.COLOR_WITH_NEBS_DARK);
      this.setCellData(worksheet, 1, 7, '', true, this.COLOR_WITH_NEBS_DARK);
      worksheet.mergeCells(1, 5, 1, 7);

      this.setCellData(worksheet, 2, 2, 'Implementation Cost (' + this.currencySymbol + ')', true, this.COLOR_WITHOUT_NEBS_DARK);
      this.setCellData(worksheet, 2, 3, 'Financial Impact (' + this.currencySymbol + '/yr)', true, this.COLOR_WITHOUT_NEBS_DARK);
      this.setCellData(worksheet, 2, 4, 'Simple Payback (yrs)', true, this.COLOR_WITHOUT_NEBS_DARK);
      this.setCellData(worksheet, 2, 5, 'Implementation Cost (' + this.currencySymbol + ')', true, this.COLOR_WITH_NEBS_DARK);
      this.setCellData(worksheet, 2, 6, 'Financial Impact (' + this.currencySymbol + '/yr)', true, this.COLOR_WITH_NEBS_DARK);
      this.setCellData(worksheet, 2, 7, 'Simple Payback (yrs)', true, this.COLOR_WITH_NEBS_DARK);

      this.onSiteVisitReport.assessmentReports.forEach(assesmentReport => {
        index = index + 1;
        this.setCellData(worksheet, index, 1, this.decodeHtmlLabel(assesmentReport.assessment.name), false, this.COLOR_LIGHT);
        this.setCellData(worksheet, index, 2, assesmentReport.totalImplementationCost ? assesmentReport.totalImplementationCost : '\u2014', false, this.COLOR_WITHOUT_NEBS);
        worksheet.getCell(index, 2).numFmt = `"${this.currencySymbol}"#,##0.00`;
        this.setCellData(worksheet, index, 3, assesmentReport.totalNonNebCostSavings ? assesmentReport.totalNonNebCostSavings : '\u2014', false, this.COLOR_WITHOUT_NEBS);
        worksheet.getCell(index, 3).numFmt = `"${this.currencySymbol}"#,##0.00`;
        this.setCellData(worksheet, index, 4, assesmentReport.totalPaybackWithoutNebs ? assesmentReport.totalPaybackWithoutNebs : '\u2014', false, this.COLOR_WITHOUT_NEBS);
        worksheet.getCell(index, 4).numFmt = `0.00`;
        this.setCellData(worksheet, index, 5, assesmentReport.finalImplementationCost ? assesmentReport.finalImplementationCost : '\u2014', false, this.COLOR_WITH_NEBS);
        worksheet.getCell(index, 5).numFmt = `"${this.currencySymbol}"#,##0.00`;
        this.setCellData(worksheet, index, 6, assesmentReport.totalFinancialImpact ? assesmentReport.totalFinancialImpact : '\u2014', false, this.COLOR_WITH_NEBS);
        worksheet.getCell(index, 6).numFmt = `"${this.currencySymbol}"#,##0.00`;
        this.setCellData(worksheet, index, 7, assesmentReport.totalPaybackWithNebs ? assesmentReport.totalPaybackWithNebs : '\u2014', false, this.COLOR_WITH_NEBS);
        worksheet.getCell(index, 7).numFmt = `0.00`;
      });

      index = index + 1;
      this.setCellData(worksheet, index, 1, 'Total', true, this.COLOR_DARK);
      this.setCellData(worksheet, index, 2, this.onSiteVisitReport.totalImplementationCost ? this.onSiteVisitReport.totalImplementationCost : '\u2014', true, this.COLOR_WITHOUT_NEBS_DARK);
      worksheet.getCell(index, 2).numFmt = `"${this.currencySymbol}"#,##0.00`;
      this.setCellData(worksheet, index, 3, this.onSiteVisitReport.totalNonNebCostSavings ? this.onSiteVisitReport.totalNonNebCostSavings : '\u2014', true, this.COLOR_WITHOUT_NEBS_DARK);
      worksheet.getCell(index, 3).numFmt = `"${this.currencySymbol}"#,##0.00`;
      this.setCellData(worksheet, index, 4, this.onSiteVisitReport.totalPaybackWithoutNebs ? this.onSiteVisitReport.totalPaybackWithoutNebs : '\u2014', true, this.COLOR_WITHOUT_NEBS_DARK);
      worksheet.getCell(index, 4).numFmt = `0.00`;
      this.setCellData(worksheet, index, 5, this.onSiteVisitReport.finalImplementationCost ? this.onSiteVisitReport.finalImplementationCost : '\u2014', true, this.COLOR_WITH_NEBS_DARK);
      worksheet.getCell(index, 5).numFmt = `"${this.currencySymbol}"#,##0.00`;
      this.setCellData(worksheet, index, 6, this.onSiteVisitReport.totalFinancialImpact ? this.onSiteVisitReport.totalFinancialImpact : '\u2014', true, this.COLOR_WITH_NEBS_DARK);
      worksheet.getCell(index, 6).numFmt = `"${this.currencySymbol}"#,##0.00`;
      this.setCellData(worksheet, index, 7, this.onSiteVisitReport.totalPaybackWithNebs ? this.onSiteVisitReport.totalPaybackWithNebs : '\u2014', true, this.COLOR_WITH_NEBS_DARK);
      worksheet.getCell(index, 7).numFmt = `0.00`;

      worksheet.getColumn(7).width = 30;
    }
    else {
      this.setCellData(worksheet, 1, 2, '', true, this.COLOR_DARK);
      worksheet.mergeCells(1, 1, 1, 2);
      this.setCellData(worksheet, 1, 3, 'Without NEBs', true, this.COLOR_WITHOUT_NEBS_DARK);
      this.setCellData(worksheet, 1, 4, '', true, this.COLOR_WITHOUT_NEBS_DARK);
      worksheet.mergeCells(1, 3, 1, 4);
      this.setCellData(worksheet, 1, 5, 'With NEBs', true, this.COLOR_WITH_NEBS_DARK);
      this.setCellData(worksheet, 1, 6, '', true, this.COLOR_WITH_NEBS_DARK);
      worksheet.mergeCells(1, 5, 1, 6);

      this.setCellData(worksheet, 2, 2, 'Implementation Cost (' + this.currencySymbol + ')', true, this.COLOR_DARK);
      this.setCellData(worksheet, 2, 3, 'Financial Impact (' + this.currencySymbol + '/yr)', true, this.COLOR_WITHOUT_NEBS_DARK);
      this.setCellData(worksheet, 2, 4, 'Simple Payback (yrs)', true, this.COLOR_WITHOUT_NEBS_DARK);
      this.setCellData(worksheet, 2, 5, 'Financial Impact (' + this.currencySymbol + '/yr)', true, this.COLOR_WITH_NEBS_DARK);
      this.setCellData(worksheet, 2, 6, 'Simple Payback (yrs)', true, this.COLOR_WITH_NEBS_DARK);

      this.onSiteVisitReport.assessmentReports.forEach(assessmentReport => {
        index = index + 1;
        this.setCellData(worksheet, index, 1, this.decodeHtmlLabel(assessmentReport.assessment.name), false, this.COLOR_LIGHT);
        this.setCellData(worksheet, index, 2, assessmentReport.totalImplementationCost ? assessmentReport.totalImplementationCost : '\u2014', false, this.COLOR_LIGHT);
        worksheet.getCell(index, 2).numFmt = `"${this.currencySymbol}"#,##0.00`;
        this.setCellData(worksheet, index, 3, assessmentReport.totalNonNebCostSavings ? assessmentReport.totalNonNebCostSavings : '\u2014', false, this.COLOR_WITHOUT_NEBS);
        worksheet.getCell(index, 3).numFmt = `"${this.currencySymbol}"#,##0.00`;
        this.setCellData(worksheet, index, 4, assessmentReport.totalPaybackWithoutNebs ? assessmentReport.totalPaybackWithoutNebs : '\u2014', false, this.COLOR_WITHOUT_NEBS);
        worksheet.getCell(index, 4).numFmt = `0.00`;
        this.setCellData(worksheet, index, 5, assessmentReport.totalFinancialImpact ? assessmentReport.totalFinancialImpact : '\u2014', false, this.COLOR_WITH_NEBS);
        worksheet.getCell(index, 5).numFmt = `"${this.currencySymbol}"#,##0.00`;
        this.setCellData(worksheet, index, 6, assessmentReport.totalPaybackWithNebs ? assessmentReport.totalPaybackWithNebs : '\u2014', false, this.COLOR_WITH_NEBS);
        worksheet.getCell(index, 6).numFmt = `0.00`;
      });

      index = index + 1;
      this.setCellData(worksheet, index, 1, 'Total', true, this.COLOR_DARK);
      this.setCellData(worksheet, index, 2, this.onSiteVisitReport.totalImplementationCost ? this.onSiteVisitReport.totalImplementationCost : '\u2014', true, this.COLOR_DARK);
      worksheet.getCell(index, 2).numFmt = `"${this.currencySymbol}"#,##0.00`;
      this.setCellData(worksheet, index, 3, this.onSiteVisitReport.totalNonNebCostSavings ? this.onSiteVisitReport.totalNonNebCostSavings : '\u2014', true, this.COLOR_WITHOUT_NEBS_DARK);
      worksheet.getCell(index, 3).numFmt = `"${this.currencySymbol}"#,##0.00`;
      this.setCellData(worksheet, index, 4, this.onSiteVisitReport.totalPaybackWithoutNebs ? this.onSiteVisitReport.totalPaybackWithoutNebs : '\u2014', true, this.COLOR_WITHOUT_NEBS_DARK);
      worksheet.getCell(index, 4).numFmt = `0.00`;
      this.setCellData(worksheet, index, 5, this.onSiteVisitReport.totalFinancialImpact ? this.onSiteVisitReport.totalFinancialImpact : '\u2014', true, this.COLOR_WITH_NEBS_DARK);
      worksheet.getCell(index, 5).numFmt = `"${this.currencySymbol}"#,##0.00`;
      this.setCellData(worksheet, index, 6, this.onSiteVisitReport.totalPaybackWithNebs ? this.onSiteVisitReport.totalPaybackWithNebs : '\u2014', true, this.COLOR_WITH_NEBS_DARK);
      worksheet.getCell(index, 6).numFmt = `0.00`;
    }

    worksheet.getColumn(1).width = 50;
    worksheet.getColumn(2).width = 30;
    worksheet.getColumn(3).width = 30;
    worksheet.getColumn(4).width = 30;
    worksheet.getColumn(5).width = 30;
    worksheet.getColumn(6).width = 30;
  }

  setSiteVisitDetailsWorksheet(worksheet: ExcelJS.Worksheet, company: IdbCompany, facility: IdbFacility, onSiteVisit: IdbOnSiteVisit) {
    worksheet.getCell(1, 1).value = 'Company';
    worksheet.getCell(1, 2).value = company.generalInformation.name;
    worksheet.getCell(2, 1).value = 'Facility';
    worksheet.getCell(2, 2).value = facility.generalInformation.name;
    worksheet.getCell(3, 1).value = 'Visit Date';
    worksheet.getCell(3, 2).value = formatDate(onSiteVisit.visitDate, 'MMM dd, yyyy', 'en-US');
    worksheet.getCell(4, 1).value = 'Assessments';

    const assessments = this.onSiteVisitReport.assessmentReports
      .map(assessmentReport => assessmentReport.assessment.name);

    worksheet.getCell(4, 2).value = assessments.join('\n');

    for (let i = 1; i <= 4; i++) {
      for (let j = 1; j <= 2; j++) {
        worksheet.getCell(i, j).fill = {
          type: 'pattern',
          pattern: 'solid',
          fgColor: { argb: 'FFaeb6bf' }
        };

        worksheet.getCell(i, j).border = {
          top: { style: 'thin' },
          left: { style: 'thin' },
          bottom: { style: 'thin' },
          right: { style: 'thin' }
        };

        worksheet.getCell(i, j).alignment = {
          vertical: 'middle',
          wrapText: true
        };
      }
    }

    worksheet.getColumn(1).width = 40;
    worksheet.getColumn(2).width = 40;
  }

  setAssessmentDetailsWorksheet(worksheet: ExcelJS.Worksheet, company: IdbCompany, facility: IdbFacility, assessment: IdbAssessment) {
    worksheet.getCell(1, 1).value = 'Company';
    worksheet.getCell(1, 2).value = company.generalInformation.name;
    worksheet.getCell(2, 1).value = 'Facility';
    worksheet.getCell(2, 2).value = facility.generalInformation.name;
    worksheet.getCell(3, 1).value = 'Visit Date';
    worksheet.getCell(3, 2).value = formatDate(assessment.visitDate, 'MMM dd, yyyy', 'en-US');
    worksheet.getCell(4, 1).value = 'Assessment Type';
    worksheet.getCell(4, 2).value = assessment.assessmentType;
    worksheet.getCell(5, 1).value = 'Utility Types';

    const includedUtilityTypes = assessment.utilityEnergyUses
      .filter(utilityType => utilityType.include)
      .map(utilityType => utilityType.utilityType);

    worksheet.getCell(5, 2).value = includedUtilityTypes.join('\n');

    for (let i = 1; i <= 5; i++) {
      for (let j = 1; j <= 2; j++) {
        worksheet.getCell(i, j).fill = {
          type: 'pattern',
          pattern: 'solid',
          fgColor: { argb: 'FFaeb6bf' }
        };

        worksheet.getCell(i, j).border = {
          top: { style: 'thin' },
          left: { style: 'thin' },
          bottom: { style: 'thin' },
          right: { style: 'thin' }
        };

        worksheet.getCell(i, j).alignment = {
          vertical: 'middle',
          wrapText: true
        };
      }
    }

    worksheet.getColumn(1).width = 40;
    worksheet.getColumn(2).width = 40;
  }

  setKpmFinancialImpactsWorksheet(worksheet2: ExcelJS.Worksheet) {
    let indexRow = 1;
    this.setCellData(worksheet2, 1, 1, '', true, this.COLOR_DARK);
    this.setCellData(worksheet2, 1, 2, 'Current (' + this.currencySymbol + ')/yr', true, this.COLOR_WITHOUT_NEBS_DARK);
    this.setCellData(worksheet2, 1, 3, 'Financial Impact (' + this.currencySymbol + ')/yr', true, this.COLOR_WITH_NEBS_DARK);
    this.setCellData(worksheet2, 1, 4, 'Potential (' + this.currencySymbol + ')/yr', true, this.COLOR_WITH_NEBS_DARK);
    this.setCellData(worksheet2, 1, 5, 'Change (%)', true, this.COLOR_WITH_NEBS_DARK);

    if (this.kpmCostSavingsReports.length > 0) {
      indexRow = indexRow + 1;
      this.setCellData(worksheet2, indexRow, 1, 'Provided Costs', true, this.COLOR_DARK);
      this.setCellData(worksheet2, indexRow, 2, '', true, this.COLOR_WITHOUT_NEBS_DARK);
      this.setCellData(worksheet2, indexRow, 3, this.totalCostSavings ? this.totalCostSavings : '\u2014', true, this.COLOR_WITH_NEBS_DARK);
      worksheet2.getCell(indexRow, 3).numFmt = `"${this.currencySymbol}"#,##0.00`;
      this.setCellData(worksheet2, indexRow, 4, '', true, this.COLOR_WITH_NEBS_DARK);
      this.setCellData(worksheet2, indexRow, 5, '', true, this.COLOR_WITH_NEBS_DARK);

      this.kpmCostSavingsReports.forEach((reportItem) => {
        indexRow = indexRow + 1;
        this.setCellData(worksheet2, indexRow, 1, this.decodeHtmlLabel(reportItem.keyPerformanceMetric.htmlLabel), false, this.COLOR_LIGHT);
        this.setCellData(worksheet2, indexRow, 2, reportItem.keyPerformanceMetric.baselineCost ? reportItem.keyPerformanceMetric.baselineCost : '\u2014', false, this.COLOR_WITHOUT_NEBS);
        worksheet2.getCell(indexRow, 2).numFmt = `"${this.currencySymbol}"#,##0.00`;
        this.setCellData(worksheet2, indexRow, 3, reportItem.performanceMetricImpact.costAdjustment ? reportItem.performanceMetricImpact.costAdjustment : '\u2014', false, this.COLOR_WITH_NEBS);
        worksheet2.getCell(indexRow, 3).numFmt = `"${this.currencySymbol}"#,##0.00`;
        this.setCellData(worksheet2, indexRow, 4, reportItem.performanceMetricImpact.modifiedCost ? reportItem.performanceMetricImpact.modifiedCost : '\u2014', false, this.COLOR_WITH_NEBS);
        worksheet2.getCell(indexRow, 4).numFmt = `"${this.currencySymbol}"#,##0.00`;
        this.setCellData(worksheet2, indexRow, 5, reportItem.performanceMetricImpact.percentSavings ? reportItem.performanceMetricImpact.percentSavings / 100 : '\u2014', false, this.COLOR_WITH_NEBS);
        worksheet2.getCell(indexRow, 5).numFmt = '0.00%';
      });
    }

    if (this.kpmRevenueReports.length > 0) {
      indexRow = indexRow + 1;
      this.setCellData(worksheet2, indexRow, 1, 'Provided Revenues', true, this.COLOR_DARK);
      this.setCellData(worksheet2, indexRow, 2, '', true, this.COLOR_WITHOUT_NEBS_DARK);
      this.setCellData(worksheet2, indexRow, 3, this.totalRevenue ? this.totalRevenue : '\u2014', true, this.COLOR_WITH_NEBS_DARK);
      worksheet2.getCell(indexRow, 3).numFmt = `"${this.currencySymbol}"#,##0.00`;
      this.setCellData(worksheet2, indexRow, 4, '', true, this.COLOR_WITH_NEBS_DARK);
      this.setCellData(worksheet2, indexRow, 5, '', true, this.COLOR_WITH_NEBS_DARK);

      this.kpmRevenueReports.forEach((reportItem) => {
        indexRow = indexRow + 1;
        this.setCellData(worksheet2, indexRow, 1, this.decodeHtmlLabel(reportItem.keyPerformanceMetric.htmlLabel), false, this.COLOR_LIGHT);
        this.setCellData(worksheet2, indexRow, 2, reportItem.keyPerformanceMetric.baselineCost ? reportItem.keyPerformanceMetric.baselineCost : '\u2014', false, this.COLOR_WITHOUT_NEBS);
        worksheet2.getCell(indexRow, 2).numFmt = `"${this.currencySymbol}"#,##0.00`;
        this.setCellData(worksheet2, indexRow, 3, reportItem.performanceMetricImpact.costAdjustment ? reportItem.performanceMetricImpact.costAdjustment : '\u2014', false, this.COLOR_WITH_NEBS);
        worksheet2.getCell(indexRow, 3).numFmt = `"${this.currencySymbol}"#,##0.00`;
        this.setCellData(worksheet2, indexRow, 4, reportItem.performanceMetricImpact.modifiedCost ? reportItem.performanceMetricImpact.modifiedCost : '\u2014', false, this.COLOR_WITH_NEBS);
        worksheet2.getCell(indexRow, 4).numFmt = `"${this.currencySymbol}"#,##0.00`;
        this.setCellData(worksheet2, indexRow, 5, reportItem.performanceMetricImpact.percentSavings ? reportItem.performanceMetricImpact.percentSavings / 100 : '\u2014', false, this.COLOR_WITH_NEBS);
        worksheet2.getCell(indexRow, 5).numFmt = '0.00%';
      });
    }

    if (this.qualitativeReports.length > 0) {
      indexRow = indexRow + 1;
      worksheet2.mergeCells(indexRow, 1, indexRow, 5);
      worksheet2.getCell(indexRow, 1).value = 'Qualitative Metrics Impacted';
      worksheet2.getCell(indexRow, 1).font = {
        bold: true
      };
      this.qualitativeReports.forEach((reportItem) => {
        indexRow = indexRow + 1;
        worksheet2.mergeCells(indexRow, 1, indexRow, 5);
        worksheet2.getCell(indexRow, 1).value = this.decodeHtmlLabel(reportItem.keyPerformanceMetric.htmlLabel);
      });
    }

    worksheet2.getColumn(1).width = 50;
    [2, 3, 4, 5].forEach(colNum => {
      worksheet2.getColumn(colNum).width = 30;
    });
  }

  setKPMImpactsWorksheet(worksheet3: ExcelJS.Worksheet) {
    let index = 1;
    this.setCellData(worksheet3, 1, 1, 'Performance Metric', true, this.COLOR_DARK);
    this.setCellData(worksheet3, 1, 2, 'Current', true, this.COLOR_WITHOUT_NEBS_DARK);
    this.setCellData(worksheet3, 1, 3, 'Impact', true, this.COLOR_WITH_NEBS_DARK);
    this.setCellData(worksheet3, 1, 4, 'Potential', true, this.COLOR_WITH_NEBS_DARK);
    this.setCellData(worksheet3, 1, 5, 'Change (%)', true, this.COLOR_WITH_NEBS_DARK);

    this.kpmImpactsReports.forEach((reportItem) => {
      index = index + 1;
      this.setCellData(worksheet3, index, 1, this.decodeHtmlLabel(reportItem.label), false, this.COLOR_LIGHT);
      this.setCellData(worksheet3, index, 2, reportItem.current ? reportItem.current : '\u2014', false, this.COLOR_WITHOUT_NEBS);
      this.setCellData(worksheet3, index, 3, reportItem.impact ? reportItem.impact : '\u2014', false, this.COLOR_WITH_NEBS);
      this.setCellData(worksheet3, index, 4, reportItem.potential ? reportItem.potential : '\u2014', false, this.COLOR_WITH_NEBS);
      this.setCellData(worksheet3, index, 5, reportItem.percentChange ? reportItem.percentChange / 100 : '\u2014', false, this.COLOR_WITH_NEBS);
      worksheet3.getCell(index, 5).numFmt = '0.00%';

      if (reportItem.isCurrency) {
        worksheet3.getCell(index, 2).numFmt = `"${this.currencySymbol}"#,##0.00`;
        if (reportItem.goalToIncrease) {
          worksheet3.getCell(index, 3).numFmt = `+ "${this.currencySymbol}"#,##0.00`;
        }
        else {
          worksheet3.getCell(index, 3).numFmt = `- "${this.currencySymbol}"#,##0.00`;
        }
        worksheet3.getCell(index, 4).numFmt = `"${this.currencySymbol}"#,##0.00`;
      }
      else {
        worksheet3.getCell(index, 2).numFmt = `#,##0.00 "${reportItem.units}"`;
        if (reportItem.goalToIncrease) {
          worksheet3.getCell(index, 3).numFmt = `+ #,##0.00 "${reportItem.units}"`;
        }
        else {
          worksheet3.getCell(index, 3).numFmt = `- #,##0.00 "${reportItem.units}"`;
        }
        worksheet3.getCell(index, 4).numFmt = `#,##0.00 "${reportItem.units}"`;
      }
    });
    worksheet3.getColumn(1).width = 50;
    [2, 3, 4, 5].forEach(colNum => {
      worksheet3.getColumn(colNum).width = 30;
    });
  }

  setPaybackPeriodComparisonWorksheet(worksheet4: ExcelJS.Worksheet, assessmentReport: AssessmentReport) {
    let indexRow = 1;
    this.setCellData(worksheet4, 1, 1, '', true, this.COLOR_DARK);
    this.setCellData(worksheet4, 1, 2, 'Without NEBs', true, this.COLOR_WITHOUT_NEBS_DARK);
    this.setCellData(worksheet4, 1, 3, 'With NEBs', true, this.COLOR_WITH_NEBS_DARK);

    if (assessmentReport.totalRebates) {
      indexRow = indexRow + 1;
      this.setCellData(worksheet4, indexRow, 1, 'Implementation Cost (' + this.currencySymbol + ')', false, this.COLOR_LIGHT);
      this.setCellData(worksheet4, indexRow, 2, assessmentReport.assessment.implementationCost ? assessmentReport.assessment.implementationCost : '\u2014', false, this.COLOR_WITHOUT_NEBS);
      worksheet4.getCell(indexRow, 2).numFmt = `"${this.currencySymbol}"#,##0.00`;
      this.setCellData(worksheet4, indexRow, 3, assessmentReport.assessment.implementationCost ? assessmentReport.assessment.implementationCost : '\u2014', false, this.COLOR_WITH_NEBS);
      worksheet4.getCell(indexRow, 3).numFmt = `"${this.currencySymbol}"#,##0.00`;

      indexRow = indexRow + 1;
      this.setCellData(worksheet4, indexRow, 1, 'One-time Incentives (' + this.currencySymbol + ')', false, this.COLOR_LIGHT);
      this.setCellData(worksheet4, indexRow, 2, '\u2014', false, this.COLOR_WITHOUT_NEBS);
      worksheet4.getCell(indexRow, 2).numFmt = `"${this.currencySymbol}"#,##0.00`;
      this.setCellData(worksheet4, indexRow, 3, assessmentReport.totalRebates ? assessmentReport.totalRebates : '\u2014', false, this.COLOR_WITH_NEBS);
      worksheet4.getCell(indexRow, 3).numFmt = `("${this.currencySymbol}"#,##0.00)`;
    }

    indexRow = indexRow + 1;
    if (assessmentReport.totalRebates) {
      this.setCellData(worksheet4, indexRow, 1, 'Final Implementation Cost (' + this.currencySymbol + ')', true, this.COLOR_DARK);
    }
    else {
      this.setCellData(worksheet4, indexRow, 1, 'Implementation Cost (' + this.currencySymbol + ')', true, this.COLOR_DARK);
    }
    this.setCellData(worksheet4, indexRow, 2, assessmentReport.assessment.implementationCost ? assessmentReport.assessment.implementationCost : '\u2014', true, this.COLOR_WITHOUT_NEBS_DARK);
    worksheet4.getCell(indexRow, 2).numFmt = `"${this.currencySymbol}"#,##0.00`;
    this.setCellData(worksheet4, indexRow, 3, assessmentReport.finalImplementationCost ? assessmentReport.finalImplementationCost : '\u2014', true, this.COLOR_WITH_NEBS_DARK);
    worksheet4.getCell(indexRow, 3).numFmt = `"${this.currencySymbol}"#,##0.00`;

    indexRow = indexRow + 1;
    this.setCellData(worksheet4, indexRow, 1, 'Energy Cost Savings (' + this.currencySymbol + ')/yr', false, this.COLOR_LIGHT);
    this.setCellData(worksheet4, indexRow, 2, assessmentReport.assessment.costSavings ? assessmentReport.assessment.costSavings : '\u2014', false, this.COLOR_WITHOUT_NEBS);
    worksheet4.getCell(indexRow, 2).numFmt = `"${this.currencySymbol}"#,##0.00`;
    this.setCellData(worksheet4, indexRow, 3, assessmentReport.assessment.costSavings ? assessmentReport.assessment.costSavings : '\u2014', false, this.COLOR_WITH_NEBS);
    worksheet4.getCell(indexRow, 3).numFmt = `"${this.currencySymbol}"#,##0.00`;

    indexRow = indexRow + 1;
    this.setCellData(worksheet4, indexRow, 1, 'NEBs Financial Impact (' + this.currencySymbol + ')/yr', false, this.COLOR_LIGHT);
    this.setCellData(worksheet4, indexRow, 2, '\u2014', false, this.COLOR_WITHOUT_NEBS);
    this.setCellData(worksheet4, indexRow, 3, assessmentReport.totalNebFinancialImpact ? assessmentReport.totalNebFinancialImpact : '\u2014', false, this.COLOR_WITH_NEBS);
    worksheet4.getCell(indexRow, 3).numFmt = `"${this.currencySymbol}"#,##0.00`;

    indexRow = indexRow + 1;
    this.setCellData(worksheet4, indexRow, 1, 'Total Financial Impact (' + this.currencySymbol + ')/yr', true, this.COLOR_DARK);
    this.setCellData(worksheet4, indexRow, 2, assessmentReport.totalNonNebCostSavings ? assessmentReport.totalNonNebCostSavings : '\u2014', true, this.COLOR_WITHOUT_NEBS_DARK);
    worksheet4.getCell(indexRow, 2).numFmt = `"${this.currencySymbol}"#,##0.00`;
    this.setCellData(worksheet4, indexRow, 3, assessmentReport.totalFinancialImpact ? assessmentReport.totalFinancialImpact : '\u2014', true, this.COLOR_WITH_NEBS_DARK);
    worksheet4.getCell(indexRow, 3).numFmt = `"${this.currencySymbol}"#,##0.00`;

    indexRow = indexRow + 1;
    this.setCellData(worksheet4, indexRow, 1, 'Simple Payback (yrs)', true, this.COLOR_DARK);
    this.setCellData(worksheet4, indexRow, 2, assessmentReport.totalPaybackWithoutNebs ? assessmentReport.totalPaybackWithoutNebs : '\u2014', true, this.COLOR_WITHOUT_NEBS_DARK);
    worksheet4.getCell(indexRow, 2).numFmt = `0.00`;
    this.setCellData(worksheet4, indexRow, 3, assessmentReport.totalPaybackWithNebs ? assessmentReport.totalPaybackWithNebs : '\u2014', true, this.COLOR_WITH_NEBS_DARK);
    worksheet4.getCell(indexRow, 3).numFmt = `0.00`;

    worksheet4.getColumn(1).width = 50;
    [2, 3].forEach(colNum => {
      worksheet4.getColumn(colNum).width = 30;
    });
  }

  setImplementationCostWorksheet(worksheet5: ExcelJS.Worksheet, assessmentReport: AssessmentReport) {
    let indexRow = 2;
    this.setCellData(worksheet5, 1, 1, '', true, this.COLOR_DARK);
    this.setCellData(worksheet5, 2, 1, '', true, this.COLOR_DARK);
    this.setCellData(worksheet5, 1, 2, 'Without NEBs', true, this.COLOR_WITHOUT_NEBS_DARK);
    this.setCellData(worksheet5, 1, 3, 'With NEBs', true, this.COLOR_WITH_NEBS_DARK);
    this.setCellData(worksheet5, 1, 4, '', true, this.COLOR_WITH_NEBS_DARK);
    worksheet5.mergeCells(1, 3, 1, 4);

    this.setCellData(worksheet5, 2, 2, 'Implementation Cost (' + this.currencySymbol + ')', true, this.COLOR_WITHOUT_NEBS_DARK);
    this.setCellData(worksheet5, 2, 3, 'Incentives (' + this.currencySymbol + ')', true, this.COLOR_WITH_NEBS_DARK);
    this.setCellData(worksheet5, 2, 4, 'Final Implementation Cost (' + this.currencySymbol + ')', true, this.COLOR_WITH_NEBS_DARK);

    assessmentReport.energyOpportunityReports.forEach(opportunityReport => {
      indexRow = indexRow + 1;
      this.setCellData(worksheet5, indexRow, 1, this.decodeHtmlLabel(opportunityReport.energyOpportunity.name), false, this.COLOR_LIGHT);
      this.setCellData(worksheet5, indexRow, 2, opportunityReport.energyOpportunity.implementationCost ? opportunityReport.energyOpportunity.implementationCost : '\u2014', false, this.COLOR_WITHOUT_NEBS);
      worksheet5.getCell(indexRow, 2).numFmt = `"${this.currencySymbol}"#,##0.00`;
      this.setCellData(worksheet5, indexRow, 3, opportunityReport.totalRebates ? opportunityReport.totalRebates : '\u2014', false, this.COLOR_WITH_NEBS);
      worksheet5.getCell(indexRow, 3).numFmt = `("${this.currencySymbol}"#,##0.00)`;
      this.setCellData(worksheet5, indexRow, 4, opportunityReport.finalImplementationCost ? opportunityReport.finalImplementationCost : '\u2014', false, this.COLOR_WITH_NEBS);
      worksheet5.getCell(indexRow, 4).numFmt = `"${this.currencySymbol}"#,##0.00`;
    });

    if (assessmentReport.totalNonOpportunityRebates) {
      indexRow = indexRow + 1;
      this.setCellData(worksheet5, indexRow, 1, 'Additional One-time Incentives', false, this.COLOR_LIGHT);
      this.setCellData(worksheet5, indexRow, 2, '\u2014', false, this.COLOR_WITHOUT_NEBS);
      this.setCellData(worksheet5, indexRow, 3, assessmentReport.totalNonOpportunityRebates ? assessmentReport.totalNonOpportunityRebates : '\u2014', false, this.COLOR_WITH_NEBS);
      worksheet5.getCell(indexRow, 3).numFmt = `("${this.currencySymbol}"#,##0.00)`;
      this.setCellData(worksheet5, indexRow, 4, '\u2014', false, this.COLOR_WITH_NEBS);
    }

    indexRow = indexRow + 1;
    this.setCellData(worksheet5, indexRow, 1, 'Assessment Total', true, this.COLOR_DARK);
    this.setCellData(worksheet5, indexRow, 2, assessmentReport.totalImplementationCost ? assessmentReport.totalImplementationCost : '\u2014', true, this.COLOR_WITHOUT_NEBS_DARK);
    worksheet5.getCell(indexRow, 2).numFmt = `"${this.currencySymbol}"#,##0.00`;
    this.setCellData(worksheet5, indexRow, 3, assessmentReport.totalRebates ? assessmentReport.totalRebates : '\u2014', true, this.COLOR_WITH_NEBS_DARK);
    worksheet5.getCell(indexRow, 3).numFmt = `("${this.currencySymbol}"#,##0.00)`;
    this.setCellData(worksheet5, indexRow, 4, assessmentReport.finalImplementationCost ? assessmentReport.finalImplementationCost : '\u2014', true, this.COLOR_WITH_NEBS_DARK);
    worksheet5.getCell(indexRow, 4).numFmt = `"${this.currencySymbol}"#,##0.00`;

    worksheet5.getColumn(1).width = 50;
    [2, 3, 4].forEach(colNum => {
      worksheet5.getColumn(colNum).width = 30;
    });
  }

  setImpactOnAnnualCostsWorksheet(worksheet6: ExcelJS.Worksheet, assessmentReport: AssessmentReport) {
    let indexRow = 2;
    this.setCellData(worksheet6, 1, 1, '', true, this.COLOR_DARK);
    this.setCellData(worksheet6, 1, 2, 'Without NEBs', true, this.COLOR_WITHOUT_NEBS_DARK);
    this.setCellData(worksheet6, 1, 3, 'With NEBs', true, this.COLOR_WITH_NEBS_DARK);
    this.setCellData(worksheet6, 1, 4, '', true, this.COLOR_WITH_NEBS_DARK);
    worksheet6.mergeCells(1, 3, 1, 4);

    this.setCellData(worksheet6, 2, 1, '', true, this.COLOR_DARK);
    this.setCellData(worksheet6, 2, 2, 'Energy Cost Savings (' + this.currencySymbol + '/yr)', true, this.COLOR_WITHOUT_NEBS_DARK);
    this.setCellData(worksheet6, 2, 3, 'NEBs Financial Impact (' + this.currencySymbol + '/yr)', true, this.COLOR_WITH_NEBS_DARK);
    this.setCellData(worksheet6, 2, 4, 'Total Financial Impact (' + this.currencySymbol + '/yr)', true, this.COLOR_WITH_NEBS_DARK);

    assessmentReport.energyOpportunityReports.forEach(opportunityReport => {
      indexRow = indexRow + 1;
      this.setCellData(worksheet6, indexRow, 1, this.decodeHtmlLabel(opportunityReport.energyOpportunity.name), false, this.COLOR_LIGHT);
      this.setCellData(worksheet6, indexRow, 2, opportunityReport.totalNonNebCostSavings ? opportunityReport.totalNonNebCostSavings : '\u2014', false, this.COLOR_WITHOUT_NEBS);
      worksheet6.getCell(indexRow, 2).numFmt = `"${this.currencySymbol}"#,##0.00`;
      this.setCellData(worksheet6, indexRow, 3, opportunityReport.totalNebFinancialImpact ? opportunityReport.totalNebFinancialImpact : '\u2014', false, this.COLOR_WITH_NEBS);
      worksheet6.getCell(indexRow, 3).numFmt = `"${this.currencySymbol}"#,##0.00`;
      this.setCellData(worksheet6, indexRow, 4, opportunityReport.totalFinancialImpact ? opportunityReport.totalFinancialImpact : '\u2014', false, this.COLOR_WITH_NEBS);
      worksheet6.getCell(indexRow, 4).numFmt = `"${this.currencySymbol}"#,##0.00`;
    });

    if (assessmentReport.totalAssessmentNebFinancialImpact) {
      indexRow = indexRow + 1;
      this.setCellData(worksheet6, indexRow, 1, 'Additional NEBs', false, this.COLOR_LIGHT);
      this.setCellData(worksheet6, indexRow, 2, '\u2014', false, this.COLOR_WITHOUT_NEBS);
      this.setCellData(worksheet6, indexRow, 3, assessmentReport.totalAssessmentNebFinancialImpact ? assessmentReport.totalAssessmentNebFinancialImpact : '\u2014', false, this.COLOR_WITH_NEBS);
      worksheet6.getCell(indexRow, 3).numFmt = `"${this.currencySymbol}"#,##0.00`;
      this.setCellData(worksheet6, indexRow, 4, assessmentReport.totalAssessmentNebFinancialImpact ? assessmentReport.totalAssessmentNebFinancialImpact : '\u2014', false, this.COLOR_WITH_NEBS);
      worksheet6.getCell(indexRow, 4).numFmt = `"${this.currencySymbol}"#,##0.00`;
    }

    indexRow = indexRow + 1;
    this.setCellData(worksheet6, indexRow, 1, 'Assessment Total', true, this.COLOR_DARK);
    this.setCellData(worksheet6, indexRow, 2, assessmentReport.totalNonNebCostSavings ? assessmentReport.totalNonNebCostSavings : '\u2014', true, this.COLOR_WITHOUT_NEBS_DARK);
    worksheet6.getCell(indexRow, 2).numFmt = `"${this.currencySymbol}"#,##0.00`;
    this.setCellData(worksheet6, indexRow, 3, assessmentReport.totalNebFinancialImpact ? assessmentReport.totalNebFinancialImpact : '\u2014', true, this.COLOR_WITH_NEBS_DARK);
    worksheet6.getCell(indexRow, 3).numFmt = `"${this.currencySymbol}"#,##0.00`;
    this.setCellData(worksheet6, indexRow, 4, assessmentReport.totalFinancialImpact ? assessmentReport.totalFinancialImpact : '\u2014', true, this.COLOR_WITH_NEBS_DARK);
    worksheet6.getCell(indexRow, 4).numFmt = `"${this.currencySymbol}"#,##0.00`;

    worksheet6.getColumn(1).width = 50;
    [2, 3, 4].forEach(colNum => {
      worksheet6.getColumn(colNum).width = 30;
    });
  }

  setProjectPaybackWorksheet(worksheet7: ExcelJS.Worksheet, assessmentReport: AssessmentReport) {
    let index = 2;

    this.setCellData(worksheet7, 1, 1, '', true, this.COLOR_DARK);
    this.setCellData(worksheet7, 2, 1, '', true, this.COLOR_DARK);
    if (assessmentReport.totalRebates) {
      this.setCellData(worksheet7, 1, 2, 'Without NEBs', true, this.COLOR_WITHOUT_NEBS_DARK);
      this.setCellData(worksheet7, 1, 3, '', true, this.COLOR_WITHOUT_NEBS_DARK);
      this.setCellData(worksheet7, 1, 4, '', true, this.COLOR_WITHOUT_NEBS_DARK);
      worksheet7.mergeCells(1, 2, 1, 4);
      this.setCellData(worksheet7, 1, 5, 'With NEBs', true, this.COLOR_WITH_NEBS_DARK);
      this.setCellData(worksheet7, 1, 6, '', true, this.COLOR_WITH_NEBS_DARK);
      this.setCellData(worksheet7, 1, 7, '', true, this.COLOR_WITH_NEBS_DARK);
      worksheet7.mergeCells(1, 5, 1, 7);

      this.setCellData(worksheet7, 2, 2, 'Implementation Cost (' + this.currencySymbol + ')', true, this.COLOR_WITHOUT_NEBS_DARK);
      this.setCellData(worksheet7, 2, 3, 'Financial Impact (' + this.currencySymbol + '/yr)', true, this.COLOR_WITHOUT_NEBS_DARK);
      this.setCellData(worksheet7, 2, 4, 'Simple Payback (yrs)', true, this.COLOR_WITHOUT_NEBS_DARK);
      this.setCellData(worksheet7, 2, 5, 'Implementation Cost (' + this.currencySymbol + ')', true, this.COLOR_WITH_NEBS_DARK);
      this.setCellData(worksheet7, 2, 6, 'Financial Impact (' + this.currencySymbol + '/yr)', true, this.COLOR_WITH_NEBS_DARK);
      this.setCellData(worksheet7, 2, 7, 'Simple Payback (yrs)', true, this.COLOR_WITH_NEBS_DARK);

      assessmentReport.energyOpportunityReports.forEach(opportunityReport => {
        index = index + 1;
        this.setCellData(worksheet7, index, 1, this.decodeHtmlLabel(opportunityReport.energyOpportunity.name), false, this.COLOR_LIGHT);
        this.setCellData(worksheet7, index, 2, opportunityReport.energyOpportunity.implementationCost ? opportunityReport.energyOpportunity.implementationCost : '\u2014', false, this.COLOR_WITHOUT_NEBS);
        worksheet7.getCell(index, 2).numFmt = `"${this.currencySymbol}"#,##0.00`;
        this.setCellData(worksheet7, index, 3, opportunityReport.totalNonNebCostSavings ? opportunityReport.totalNonNebCostSavings : '\u2014', false, this.COLOR_WITHOUT_NEBS);
        worksheet7.getCell(index, 3).numFmt = `"${this.currencySymbol}"#,##0.00`;
        this.setCellData(worksheet7, index, 4, opportunityReport.totalPaybackWithoutNebs ? opportunityReport.totalPaybackWithoutNebs : '\u2014', false, this.COLOR_WITHOUT_NEBS);
        worksheet7.getCell(index, 4).numFmt = `0.00`;
        this.setCellData(worksheet7, index, 5, opportunityReport.finalImplementationCost ? opportunityReport.finalImplementationCost : '\u2014', false, this.COLOR_WITH_NEBS);
        worksheet7.getCell(index, 5).numFmt = `"${this.currencySymbol}"#,##0.00`;
        this.setCellData(worksheet7, index, 6, opportunityReport.totalFinancialImpact ? opportunityReport.totalFinancialImpact : '\u2014', false, this.COLOR_WITH_NEBS);
        worksheet7.getCell(index, 6).numFmt = `"${this.currencySymbol}"#,##0.00`;
        this.setCellData(worksheet7, index, 7, opportunityReport.totalPaybackWithNebs ? opportunityReport.totalPaybackWithNebs : '\u2014', false, this.COLOR_WITH_NEBS);
        worksheet7.getCell(index, 7).numFmt = `0.00`;
      });

      if (assessmentReport.totalAssessmentNebFinancialImpact || assessmentReport.totalNonOpportunityRebates) {
        index = index + 1;
        this.setCellData(worksheet7, index, 1, 'Additional NEBs/Incentives', false, this.COLOR_LIGHT);
        this.setCellData(worksheet7, index, 2, '\u2014', false, this.COLOR_WITHOUT_NEBS);
        this.setCellData(worksheet7, index, 3, '\u2014', false, this.COLOR_WITHOUT_NEBS);
        this.setCellData(worksheet7, index, 4, '\u2014', false, this.COLOR_WITHOUT_NEBS);
        if (assessmentReport.totalNonOpportunityRebates) {
          this.setCellData(worksheet7, index, 5, assessmentReport.totalNonOpportunityRebates ? assessmentReport.totalNonOpportunityRebates : '\u2014', false, this.COLOR_WITH_NEBS);
          worksheet7.getCell(index, 5).numFmt = `("${this.currencySymbol}"#,##0.00)`;
        }
        else {
          this.setCellData(worksheet7, index, 5, '\u2014', false, this.COLOR_WITH_NEBS);
        }
        this.setCellData(worksheet7, index, 6, assessmentReport.totalAssessmentNebFinancialImpact ? assessmentReport.totalAssessmentNebFinancialImpact : '\u2014', false, this.COLOR_WITH_NEBS);
        worksheet7.getCell(index, 6).numFmt = `"${this.currencySymbol}"#,##0.00`;
        this.setCellData(worksheet7, index, 7, '\u2014', false, this.COLOR_WITH_NEBS);
      }

      index = index + 1;
      this.setCellData(worksheet7, index, 1, 'Assessment Total', true, this.COLOR_DARK);
      this.setCellData(worksheet7, index, 2, assessmentReport.totalImplementationCost ? assessmentReport.totalImplementationCost : '\u2014', true, this.COLOR_WITHOUT_NEBS_DARK);
      worksheet7.getCell(index, 2).numFmt = `"${this.currencySymbol}"#,##0.00`;
      this.setCellData(worksheet7, index, 3, assessmentReport.totalNonNebCostSavings ? assessmentReport.totalNonNebCostSavings : '\u2014', true, this.COLOR_WITHOUT_NEBS_DARK);
      worksheet7.getCell(index, 3).numFmt = `"${this.currencySymbol}"#,##0.00`;
      this.setCellData(worksheet7, index, 4, assessmentReport.totalPaybackWithoutNebs ? assessmentReport.totalPaybackWithoutNebs : '\u2014', true, this.COLOR_WITHOUT_NEBS_DARK);
      worksheet7.getCell(index, 4).numFmt = `0.00`;
      this.setCellData(worksheet7, index, 5, assessmentReport.finalImplementationCost ? assessmentReport.finalImplementationCost : '\u2014', true, this.COLOR_WITH_NEBS_DARK);
      worksheet7.getCell(index, 5).numFmt = `"${this.currencySymbol}"#,##0.00`;
      this.setCellData(worksheet7, index, 6, assessmentReport.totalFinancialImpact ? assessmentReport.totalFinancialImpact : '\u2014', true, this.COLOR_WITH_NEBS_DARK);
      worksheet7.getCell(index, 6).numFmt = `"${this.currencySymbol}"#,##0.00`;
      this.setCellData(worksheet7, index, 7, assessmentReport.totalPaybackWithNebs ? assessmentReport.totalPaybackWithNebs : '\u2014', true, this.COLOR_WITH_NEBS_DARK);
      worksheet7.getCell(index, 7).numFmt = `0.00`;


      worksheet7.getColumn(7).width = 30;
    }
    else {
      this.setCellData(worksheet7, 1, 2, '', true, this.COLOR_DARK);
      worksheet7.mergeCells(1, 1, 1, 2);
      this.setCellData(worksheet7, 1, 3, 'Without NEBs', true, this.COLOR_WITHOUT_NEBS_DARK);
      this.setCellData(worksheet7, 1, 4, '', true, this.COLOR_WITHOUT_NEBS_DARK);
      worksheet7.mergeCells(1, 3, 1, 4);
      this.setCellData(worksheet7, 1, 5, 'With NEBs', true, this.COLOR_WITH_NEBS_DARK);
      this.setCellData(worksheet7, 1, 6, '', true, this.COLOR_WITH_NEBS_DARK);
      worksheet7.mergeCells(1, 5, 1, 6);

      this.setCellData(worksheet7, 2, 2, 'Implementation Cost (' + this.currencySymbol + ')', true, this.COLOR_DARK);
      this.setCellData(worksheet7, 2, 3, 'Financial Impact (' + this.currencySymbol + '/yr)', true, this.COLOR_WITHOUT_NEBS_DARK);
      this.setCellData(worksheet7, 2, 4, 'Simple Payback (yrs)', true, this.COLOR_WITHOUT_NEBS_DARK);
      this.setCellData(worksheet7, 2, 5, 'Financial Impact (' + this.currencySymbol + '/yr)', true, this.COLOR_WITH_NEBS_DARK);
      this.setCellData(worksheet7, 2, 6, 'Simple Payback (yrs)', true, this.COLOR_WITH_NEBS_DARK);

      assessmentReport.energyOpportunityReports.forEach(opportunityReport => {
        index = index + 1;
        this.setCellData(worksheet7, index, 1, this.decodeHtmlLabel(opportunityReport.energyOpportunity.name), false, this.COLOR_LIGHT);
        this.setCellData(worksheet7, index, 2, opportunityReport.energyOpportunity.implementationCost ? opportunityReport.energyOpportunity.implementationCost : '\u2014', false, this.COLOR_LIGHT);
        worksheet7.getCell(index, 2).numFmt = `"${this.currencySymbol}"#,##0.00`;
        this.setCellData(worksheet7, index, 3, opportunityReport.totalNonNebCostSavings ? opportunityReport.totalNonNebCostSavings : '\u2014', false, this.COLOR_WITHOUT_NEBS);
        worksheet7.getCell(index, 3).numFmt = `"${this.currencySymbol}"#,##0.00`;
        this.setCellData(worksheet7, index, 4, opportunityReport.totalPaybackWithoutNebs ? opportunityReport.totalPaybackWithoutNebs : '\u2014', false, this.COLOR_WITHOUT_NEBS);
        worksheet7.getCell(index, 4).numFmt = `0.00`;
        this.setCellData(worksheet7, index, 5, opportunityReport.totalFinancialImpact ? opportunityReport.totalFinancialImpact : '\u2014', false, this.COLOR_WITH_NEBS);
        worksheet7.getCell(index, 5).numFmt = `"${this.currencySymbol}"#,##0.00`;
        this.setCellData(worksheet7, index, 6, opportunityReport.totalPaybackWithNebs ? opportunityReport.totalPaybackWithNebs : '\u2014', false, this.COLOR_WITH_NEBS);
        worksheet7.getCell(index, 6).numFmt = `0.00`;
      });

      if (assessmentReport.totalAssessmentNebFinancialImpact || assessmentReport.totalNonOpportunityRebates) {
        index = index + 1;
        this.setCellData(worksheet7, index, 1, 'Additional NEBs/Incentives', false, this.COLOR_LIGHT);
        this.setCellData(worksheet7, index, 2, '\u2014', false, this.COLOR_LIGHT);
        this.setCellData(worksheet7, index, 3, '\u2014', false, this.COLOR_WITHOUT_NEBS);
        this.setCellData(worksheet7, index, 4, '\u2014', false, this.COLOR_WITHOUT_NEBS);
        this.setCellData(worksheet7, index, 5, assessmentReport.totalAssessmentNebFinancialImpact ? assessmentReport.totalAssessmentNebFinancialImpact : '\u2014', false, this.COLOR_WITH_NEBS);
        worksheet7.getCell(index, 5).numFmt = `"${this.currencySymbol}"#,##0.00`;
        this.setCellData(worksheet7, index, 6, '\u2014', false, this.COLOR_WITH_NEBS);
      }

      index = index + 1;
      this.setCellData(worksheet7, index, 1, 'Assessment Total', true, this.COLOR_DARK);
      this.setCellData(worksheet7, index, 2, assessmentReport.totalImplementationCost ? assessmentReport.totalImplementationCost : '\u2014', true, this.COLOR_DARK);
      worksheet7.getCell(index, 2).numFmt = `"${this.currencySymbol}"#,##0.00`;
      this.setCellData(worksheet7, index, 3, assessmentReport.totalNonNebCostSavings ? assessmentReport.totalNonNebCostSavings : '\u2014', true, this.COLOR_WITHOUT_NEBS_DARK);
      worksheet7.getCell(index, 3).numFmt = `"${this.currencySymbol}"#,##0.00`;
      this.setCellData(worksheet7, index, 4, assessmentReport.totalPaybackWithoutNebs ? assessmentReport.totalPaybackWithoutNebs : '\u2014', true, this.COLOR_WITHOUT_NEBS_DARK);
      worksheet7.getCell(index, 4).numFmt = `0.00`;
      this.setCellData(worksheet7, index, 5, assessmentReport.totalFinancialImpact ? assessmentReport.totalFinancialImpact : '\u2014', true, this.COLOR_WITH_NEBS_DARK);
      worksheet7.getCell(index, 5).numFmt = `"${this.currencySymbol}"#,##0.00`;
      this.setCellData(worksheet7, index, 6, assessmentReport.totalPaybackWithNebs ? assessmentReport.totalPaybackWithNebs : '\u2014', true, this.COLOR_WITH_NEBS_DARK);
      worksheet7.getCell(index, 6).numFmt = `0.00`;
    }

    worksheet7.getColumn(1).width = 50;
    worksheet7.getColumn(2).width = 30;
    worksheet7.getColumn(3).width = 30;
    worksheet7.getColumn(4).width = 30;
    worksheet7.getColumn(5).width = 30;
    worksheet7.getColumn(6).width = 30;
  }

  setCurrentAnnualAssessmentCostsWorksheet(worksheet8: ExcelJS.Worksheet, assessmentReport: AssessmentReport) {
    worksheet8.getCell(1, 2).value = 'Cost (' + this.currencySymbol + '/yr)';
    this.setBoldStyle(worksheet8, 1, 2);
    worksheet8.getCell(2, 1).value = 'Assessment Baseline';
    this.setBoldStyle(worksheet8, 2, 1);
    worksheet8.mergeCells(2, 1, 2, 2);
    worksheet8.getCell(3, 1).value = 'Energy Related Uses';
    worksheet8.getCell(3, 2).value = assessmentReport.assessment.energyCost ? assessmentReport.assessment.energyCost : '\u2014';
    worksheet8.getCell(3, 2).numFmt = `"${this.currencySymbol}"#,##0.00`;
    worksheet8.getCell(4, 1).value = 'Total Assessment Utility Cost';
    this.setBoldStyle(worksheet8, 4, 1);
    worksheet8.getCell(4, 2).value = assessmentReport.assessment.cost ? assessmentReport.assessment.cost : '\u2014';
    worksheet8.getCell(4, 2).numFmt = `"${this.currencySymbol}"#,##0.00`;
    this.setBoldStyle(worksheet8, 4, 2);
    this.setBorders(worksheet8, 4, 2);
    worksheet8.getColumn(1).width = 60;
    worksheet8.getColumn(2).width = 30;
  }

  setAnnualFinancialImpactsWorksheet(worksheet9: ExcelJS.Worksheet, assessmentReport: AssessmentReport) {
    let indexRow = 2;
    let rowsWithThickBorder: number[] = [];
    worksheet9.getCell(1, 2).value = 'Financial Impact (' + this.currencySymbol + '/yr)';
    this.setBoldStyle(worksheet9, 1, 2);
    worksheet9.getCell(2, 1).value = assessmentReport.assessment.name;
    this.setBoldStyle(worksheet9, 2, 1);
    worksheet9.mergeCells(2, 1, 2, 2);
    rowsWithThickBorder.push(2);

    if (assessmentReport.assessment.utilitySavingsByAssessment) {
      indexRow = indexRow + 1;
      worksheet9.getCell(indexRow, 1).value = assessmentReport.utilityCategory === 'energy' ? 'Total Assessment Energy Cost' : 'Total Assessment Utility Cost';
      worksheet9.getCell(indexRow, 2).value = assessmentReport.assessment.costSavings ? assessmentReport.assessment.costSavings : '\u2014';
      worksheet9.getCell(indexRow, 2).numFmt = `"${this.currencySymbol}"#,##0.00`;

      if (assessmentReport.assessment.energyCostSavings && assessmentReport.assessment.energyCostSavings != assessmentReport.assessment.costSavings) {
        indexRow = indexRow + 1;
        worksheet9.getCell(indexRow, 1).value = 'Assessment Energy Savings';
        worksheet9.getCell(indexRow, 2).value = assessmentReport.assessment.energyCostSavings ? assessmentReport.assessment.energyCostSavings : '\u2014';
        worksheet9.getCell(indexRow, 2).numFmt = `"${this.currencySymbol}"#,##0.00`;
      }
    }
    if (assessmentReport.assessment.waterCostSavings && assessmentReport.assessment.waterCostSavings != assessmentReport.assessment.costSavings) {
      indexRow = indexRow + 1;
      worksheet9.getCell(indexRow, 1).value = 'Assessment Water Savings';
      worksheet9.getCell(indexRow, 2).value = assessmentReport.assessment.waterCostSavings ? assessmentReport.assessment.waterCostSavings : '\u2014';
      worksheet9.getCell(indexRow, 2).numFmt = `"${this.currencySymbol}"#,##0.00`;
    }
    if (assessmentReport.assessmentNebReports.length > 0) {
      indexRow = indexRow + 1;
      worksheet9.getCell(indexRow, 1).value = 'Additional Operational Benefits';
      worksheet9.mergeCells(indexRow, 1, indexRow, 2);
    }
    assessmentReport.assessmentNebReports.forEach(nebReport => {
      if (nebReport.nonEnergyBenefit.costImpactType != 'oneTime') {
        indexRow = indexRow + 1;
        worksheet9.getCell(indexRow, 1).value = this.decodeHtmlLabel(nebReport.nonEnergyBenefit.name);
        worksheet9.getCell(indexRow, 2).value = nebReport.totalFinancialImpact ? nebReport.totalFinancialImpact : '\u2014';
        worksheet9.getCell(indexRow, 2).numFmt = `"${this.currencySymbol}"#,##0.00`;
      }
    });
    indexRow = indexRow + 1;
    worksheet9.getCell(indexRow, 1).value = 'Total Assessment Level Impact';
    this.setBoldStyle(worksheet9, indexRow, 1);
    worksheet9.getCell(indexRow, 2).value = assessmentReport.totalNonOpportunityCostSavings ? assessmentReport.totalNonOpportunityCostSavings : '\u2014';
    worksheet9.getCell(indexRow, 2).numFmt = `"${this.currencySymbol}"#,##0.00`;
    this.setBoldStyle(worksheet9, indexRow, 2);

    assessmentReport.energyOpportunityReports.forEach(opportunityReport => {
      indexRow = indexRow + 1;
      worksheet9.getCell(indexRow, 1).value = this.decodeHtmlLabel(opportunityReport.energyOpportunity.name);
      this.setBoldStyle(worksheet9, indexRow, 1);
      worksheet9.mergeCells(indexRow, 1, indexRow, 2);
      rowsWithThickBorder.push(indexRow);

      if (!assessmentReport.assessment.utilitySavingsByAssessment) {
        if (opportunityReport.energyOpportunity.utilityCategory == 'energy') {
          indexRow = indexRow + 1;
          worksheet9.getCell(indexRow, 1).value = this.decodeHtmlLabel(opportunityReport.energyOpportunity.name) + ' Energy Savings';
          worksheet9.getCell(indexRow, 2).value = opportunityReport.energyOpportunity.costSavings ? opportunityReport.energyOpportunity.costSavings : '\u2014';
          worksheet9.getCell(indexRow, 2).numFmt = `"${this.currencySymbol}"#,##0.00`;
        }
        else {
          indexRow = indexRow + 1;
          worksheet9.getCell(indexRow, 1).value = this.decodeHtmlLabel(opportunityReport.energyOpportunity.name) + ' Water Savings';
          worksheet9.getCell(indexRow, 2).value = opportunityReport.energyOpportunity.costSavings ? opportunityReport.energyOpportunity.costSavings : '\u2014';
          worksheet9.getCell(indexRow, 2).numFmt = `"${this.currencySymbol}"#,##0.00`;
        }
      }
      opportunityReport.nebReports.forEach(nebReport => {
        if (nebReport.nonEnergyBenefit.costImpactType != 'oneTime') {
          indexRow = indexRow + 1;
          worksheet9.getCell(indexRow, 1).value = this.decodeHtmlLabel(nebReport.nonEnergyBenefit.name);
          worksheet9.getCell(indexRow, 2).value = nebReport.totalFinancialImpact ? nebReport.totalFinancialImpact : '\u2014';
          worksheet9.getCell(indexRow, 2).numFmt = `"${this.currencySymbol}"#,##0.00`;
        }
      });
      indexRow = indexRow + 1;
      worksheet9.getCell(indexRow, 1).value = this.decodeHtmlLabel(opportunityReport.energyOpportunity.name) + ' Total Impact';
      this.setBoldStyle(worksheet9, indexRow, 1);
      worksheet9.getCell(indexRow, 2).value = opportunityReport.totalFinancialImpact ? opportunityReport.totalFinancialImpact : '\u2014';
      worksheet9.getCell(indexRow, 2).numFmt = `"${this.currencySymbol}"#,##0.00`;
      this.setBoldStyle(worksheet9, indexRow, 2);
    });
    indexRow = indexRow + 1;
    worksheet9.getCell(indexRow, 1).value = assessmentReport.assessment.utilityCategory === 'energy' ? 'Total Energy Savings' : 'Total Utility Savings';
    this.setBoldStyle(worksheet9, indexRow, 1);
    worksheet9.getCell(indexRow, 2).value = assessmentReport.totalNonNebCostSavings ? assessmentReport.totalNonNebCostSavings : '\u2014';
    worksheet9.getCell(indexRow, 2).numFmt = `"${this.currencySymbol}"#,##0.00`;
    this.setBoldStyle(worksheet9, indexRow, 2);
    rowsWithThickBorder.push(indexRow);

    indexRow = indexRow + 1;
    worksheet9.getCell(indexRow, 1).value = 'Total Additional Operational Benefits';
    this.setBoldStyle(worksheet9, indexRow, 1);
    worksheet9.getCell(indexRow, 2).value = assessmentReport.totalNebFinancialImpact ? assessmentReport.totalNebFinancialImpact : '\u2014';
    worksheet9.getCell(indexRow, 2).numFmt = `"${this.currencySymbol}"#,##0.00`;
    this.setBoldStyle(worksheet9, indexRow, 2);

    indexRow = indexRow + 1;
    worksheet9.getCell(indexRow, 1).value = 'Total Financial Impact W/ NEBs';
    this.setBoldStyle(worksheet9, indexRow, 1);
    worksheet9.getCell(indexRow, 2).value = assessmentReport.totalFinancialImpact ? assessmentReport.totalFinancialImpact : '\u2014';
    worksheet9.getCell(indexRow, 2).numFmt = `"${this.currencySymbol}"#,##0.00`;
    this.setBoldStyle(worksheet9, indexRow, 2);

    this.setBorders(worksheet9, indexRow, 2);
    rowsWithThickBorder.forEach(rowNum => {
      this.setBorderThickStyle(worksheet9, rowNum, 1);
      this.setBorderThickStyle(worksheet9, rowNum, 2);
    });
    worksheet9.getColumn(1).width = 60;
    worksheet9.getColumn(2).width = 30;
  }

  setBoldStyle(worksheet: ExcelJS.Worksheet, rowNumber: number, colNumber: number) {
    worksheet.getCell(rowNumber, colNumber).font = {
      bold: true
    };
  }

  setBorders(worksheet: ExcelJS.Worksheet, noOfRows: number, noOfCols: number) {
    for (let i = 1; i <= noOfRows; i++) {
      for (let j = 1; j <= noOfCols; j++) {
        this.setBorderStyle(worksheet, i, j);
      }
    }
  }

  setBorderStyle(worksheet: ExcelJS.Worksheet, rowNumber: number, colNumber: number) {
    worksheet.getCell(rowNumber, colNumber).border = {
      top: { style: 'thin' },
      left: { style: 'thin' },
      bottom: { style: 'thin' },
      right: { style: 'thin' }
    };
  }

  setBorderThickStyle(worksheet: ExcelJS.Worksheet, rowNumber: number, colNumber: number) {
    worksheet.getCell(rowNumber, colNumber).border = {
      top: { style: 'thick' }
    };
  }

  setHeaderStyle(worksheet: ExcelJS.Worksheet, rowNumber: number, colNumber: number) {
    worksheet.getCell(rowNumber, colNumber).font = {
      bold: true,
      color: { argb: 'FFFFFF' }
    };
    worksheet.getCell(rowNumber, colNumber).border = {
      top: { style: 'thin' },
      left: { style: 'thin' },
      bottom: { style: 'thin' },
      right: { style: 'thin' }
    };
    worksheet.getCell(rowNumber, colNumber).alignment = {
      vertical: 'middle',
      horizontal: 'center',
      wrapText: true
    };
  }

  setRowStyle(worksheet: ExcelJS.Worksheet, rowNumber: number, colNumber: number) {
    worksheet.getCell(rowNumber, colNumber).border = {
      top: { style: 'thin' },
      left: { style: 'thin' },
      bottom: { style: 'thin' },
      right: { style: 'thin' }
    };
    worksheet.getCell(rowNumber, colNumber).alignment = {
      vertical: 'middle',
      horizontal: 'center',
      wrapText: true
    };
  }

  setColor(worksheet: ExcelJS.Worksheet, rowNumber: number, colNumber: number, color: string) {
    worksheet.getCell(rowNumber, colNumber).fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: color }
    };
  }

  setCellData(worksheet: ExcelJS.Worksheet, rowNumber: number, colNumber: number, data: string | number, isHeader: boolean, bgColor: string) {
    worksheet.getCell(rowNumber, colNumber).value = data;
    if (isHeader)
      this.setHeaderStyle(worksheet, rowNumber, colNumber);
    else
      this.setRowStyle(worksheet, rowNumber, colNumber);

    this.setColor(worksheet, rowNumber, colNumber, bgColor);
  }

  decodeHtmlLabel(htmlLabel: string): string {
    const txt = document.createElement('textarea');
    txt.innerHTML = htmlLabel;
    return txt.value;
  }

  setKPM(keyPerformanceIndicatorReport) {
    this.kpmRevenueReports = new Array();
    this.kpmCostSavingsReports = new Array();
    this.qualitativeReports = new Array();
    if (keyPerformanceIndicatorReport) {
      keyPerformanceIndicatorReport.kpmReportItems.forEach(reportItem => {
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
      })
      this.totalRevenue = _.sumBy(this.kpmRevenueReports, (reportItem: KeyPerformanceMetricReportItem) => {
        return reportItem.performanceMetricImpact.costAdjustment
      });
    }
  }

  setKpmImpactReport(keyPerformanceIndicatorReport) {
    this.kpmImpactsReports = new Array();
    if (keyPerformanceIndicatorReport) {
      keyPerformanceIndicatorReport.kpmReportItems.forEach(reportItem => {
        let isCurrency: boolean = true;
        let baselineValue: number = reportItem.keyPerformanceMetric.baselineCost;
        let impact: number = reportItem.performanceMetricImpact.modificationValue;
        let goalToIncrease: boolean = reportItem.keyPerformanceMetric.goalToIncrease;
        let potential: number = reportItem.performanceMetricImpact.modifiedCost;
        if (reportItem.keyPerformanceMetric.calculationMethod == 'costPerUnit') {
          isCurrency = false;
          baselineValue = reportItem.keyPerformanceMetric.baselineValue;
          if (goalToIncrease) {
            potential = reportItem.keyPerformanceMetric.baselineValue + reportItem.performanceMetricImpact.modificationValue;
          } else {
            potential = reportItem.keyPerformanceMetric.baselineValue - reportItem.performanceMetricImpact.modificationValue;
          }
        } else if (reportItem.keyPerformanceMetric.calculationMethod == 'percentTotal') {
          impact = reportItem.keyPerformanceMetric.baselineCost - reportItem.performanceMetricImpact.modifiedCost
        }
        let percentChange: number = (impact / baselineValue) * 100;
        if (percentChange > 10) {
          //round to 1 decimal place if over 10%
          percentChange = Number(percentChange.toFixed(1));
        } else {
          //round to 2 decimal places if under 10%
          percentChange = Number(percentChange.toFixed(2));
        }

        this.kpmImpactsReports.push({
          label: reportItem.keyPerformanceMetric.htmlLabel,
          current: baselineValue,
          impact: impact,
          potential: potential,
          percentChange: percentChange,
          units: reportItem.keyPerformanceMetric.totalUnit,
          isCurrency: isCurrency,
          goalToIncrease: reportItem.keyPerformanceMetric.goalToIncrease
        })
      });
    }
  }

  getAssessmentReport(assessment: IdbAssessment, report: IdbReport) {
    let allEnergyOpportunities: Array<IdbEnergyOpportunity> = this.energyOpportunityIdbService.energyOpportunities.getValue();
    let allNonEnergyBenefits: Array<IdbNonEnergyBenefit> = this.nonEnergyBenefitIdbService.nonEnergyBenefits.getValue();
    let facilityPerformanceMetrics: Array<KeyPerformanceMetric> = this.keyPerformanceIndicatorIdbService.getFacilityKeyPerformanceMetrics(assessment.facilityId);
    let facilityPerformanceIndicators: Array<IdbKeyPerformanceIndicator> = this.keyPerformanceIndicatorIdbService.getByFacilityGuid(assessment.facilityId);
    let keyPerformanceMetricImpacts: Array<IdbKeyPerformanceMetricImpact> = this.keyPerformanceMetricImpactsIdbService.keyPerformanceMetricImpacts.getValue();
    this.assessmentReport = getAssessmentReport(assessment, allEnergyOpportunities, allNonEnergyBenefits, facilityPerformanceMetrics, facilityPerformanceIndicators, keyPerformanceMetricImpacts, report);
  }

  getSiteVisitReport(onSiteVisit: IdbOnSiteVisit, report: IdbReport) {
    let allAssessments: Array<IdbAssessment> = this.assessmentIdbService.assessments.getValue();
    let allEnergyOpportunities: Array<IdbEnergyOpportunity> = this.energyOpportunityIdbService.energyOpportunities.getValue();
    let allNonEnergyBenefits: Array<IdbNonEnergyBenefit> = this.nonEnergyBenefitIdbService.nonEnergyBenefits.getValue();
    let facilityPerformanceMetrics: Array<KeyPerformanceMetric> = this.keyPerformanceIndicatorIdbService.getFacilityKeyPerformanceMetrics(onSiteVisit.facilityId);
    let facilityPerformanceIndicators: Array<IdbKeyPerformanceIndicator> = this.keyPerformanceIndicatorIdbService.getByFacilityGuid(onSiteVisit.facilityId);
    let keyPerformanceMetricImpacts: Array<IdbKeyPerformanceMetricImpact> = this.keyPerformanceMetricImpactsIdbService.keyPerformanceMetricImpacts.getValue();
    this.onSiteVisitReport = getOnSiteVisitReport(onSiteVisit.assessmentIds, allAssessments, allEnergyOpportunities, allNonEnergyBenefits, facilityPerformanceMetrics, facilityPerformanceIndicators, keyPerformanceMetricImpacts, report);
  }
}
