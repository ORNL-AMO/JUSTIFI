import { IdbAssessment } from "src/app/models/assessment";
import * as _ from 'lodash';
import { IdbEnergyOpportunity } from "src/app/models/energyOpportunity";
import { IdbNonEnergyBenefit } from "src/app/models/nonEnergyBenefit";
import { KeyPerformanceMetric } from "../../constants/keyPerformanceMetrics";
import { IdbKeyPerformanceMetricImpact } from "src/app/models/keyPerformanceMetricImpact";
import { IdbReport, ReportOption } from "src/app/models/report";
import { AssessmentReport, getAssessmentReport } from "./assessmentReport";
import { getKeyPerformanceIndicatorReport, KeyPerformanceIndicatorReport } from "./keyPerformanceIndicatorReport";
import { NebReport } from "./nebReport";
import { IdbKeyPerformanceIndicator } from "src/app/models/keyPerformanceIndicator";

// If no report is passed as a parameter, all data (assessments/EEMs/NEBs) included
export function getExecutiveSummaryReport(visitDate: Date, assessmentIds: Array<string>, assessments: Array<IdbAssessment>,
    energyOpportunities: Array<IdbEnergyOpportunity>,
    nonEnergyBenefits: Array<IdbNonEnergyBenefit>,
    facilityPerformanceMetrics: Array<KeyPerformanceMetric>,
    facilityPerformanceIndicators: Array<IdbKeyPerformanceIndicator>,
    keyPerformanceMetricImpacts: Array<IdbKeyPerformanceMetricImpact>,
    report?: IdbReport): ExecutiveSummaryReport {
    // gather assessment reports
    let assessmentReports: Array<AssessmentReport> = new Array();
    assessmentIds.forEach(assessmentId => {
        let includedInReport: boolean = true;
        if (report) {
            let reportOption: ReportOption = report.assessmentOptions.find(option => {
                return option.assessmentId == assessmentId
            });
            includedInReport = reportOption.include;
        }
        if (includedInReport) {
            let assessment: IdbAssessment = assessments.find(assessment => {
                return assessment.guid == assessmentId;
            });
            let assessmentReport: AssessmentReport = getAssessmentReport(
                assessment, energyOpportunities, nonEnergyBenefits, facilityPerformanceMetrics, facilityPerformanceIndicators, keyPerformanceMetricImpacts, report);
            assessmentReports.push(assessmentReport);
        }
    });
    // gather kpm impacts
    let allNebReports: Array<NebReport> = assessmentReports.flatMap(report => {
        return report.allNebReports
    });

    // calculate utility cost savings
    let totalUtilityCosts: number = _.sumBy(assessmentReports, (report: AssessmentReport) => {
        return report.assessment.cost
    });
    let totalUtilityCostSavings: number = _.sumBy(assessmentReports, (report: AssessmentReport) => {
        return report.totalEnergyCostSavings + report.totalWaterCostSavings;
    });

    // calculate total cost savings
    let totalFinancialImpact: number = _.sumBy(assessmentReports, (report: AssessmentReport) => {
        return report.totalFinancialImpact
    });
    let totalNebFinancialImpact: number = _.sumBy(assessmentReports, (report: AssessmentReport) => {
        return report.totalNebFinancialImpact
    });
    let totalNonNebCostSavings: number = _.sumBy(assessmentReports, (report: AssessmentReport) => {
        return report.totalNonNebCostSavings
    });
    let totalImplementationCost: number = _.sumBy(assessmentReports, (report: AssessmentReport) => {
        if (report.totalImplementationCost) {
            return report.totalImplementationCost
        }
        return 0;
    });
    // calculate total visit revenues and costs
    let keyPerformanceIndicatorReport: KeyPerformanceIndicatorReport = getKeyPerformanceIndicatorReport(allNebReports);
    let totalCostSavings: number = totalUtilityCostSavings;
    let totalRevenues: number = 0;
    keyPerformanceIndicatorReport.kpmReportItems.forEach(item => {
        if (item.keyPerformanceMetric.goalToIncrease == false) {
            totalCostSavings += item.performanceMetricImpact.costAdjustment;
        } else {
            totalRevenues += item.performanceMetricImpact.costAdjustment;
        }
    });
    // calculate non-associated neb impacts
    let totalAssessmentNebFinancialImpact: number = _.sumBy(assessmentReports, (report: AssessmentReport) => {
        let nebReports: Array<NebReport> = report.assessmentNebReports;
        let totalNebFinancialImpact: number = _.sumBy(nebReports, (nebReport: NebReport) => {
            return nebReport.totalFinancialImpact
        });
        return totalNebFinancialImpact;
    });
    // update utility category
    let utilityCategory: string = "energy"; // Default to "energy"
    if (assessmentReports.some(report => report.assessment.utilityCategory === "water")) {
        utilityCategory = "water";
    }
    let totalPaybackWithoutNebs: number = (totalImplementationCost / totalNonNebCostSavings);
    if (totalPaybackWithoutNebs == Infinity || isNaN(totalPaybackWithoutNebs)) {
        totalPaybackWithoutNebs = 0;
    }
    let totalPaybackWithNebs: number = (totalImplementationCost / totalFinancialImpact);
    if (totalPaybackWithNebs == Infinity || isNaN(totalPaybackWithNebs)) {
        totalPaybackWithNebs = 0;
    }

    return {
        visitDate: visitDate,
        assessmentReports: assessmentReports,
        keyPerformanceIndicatorReport: keyPerformanceIndicatorReport,
        totalImplementationCost: totalImplementationCost,
        totalNebFinancialImpact: totalNebFinancialImpact,
        totalNonNebCostSavings: totalNonNebCostSavings,
        totalFinancialImpact: totalFinancialImpact,
        totalCostSavings: totalCostSavings,
        totalRevenues: totalRevenues,
        totalAssessmentNebFinancialImpact: totalAssessmentNebFinancialImpact,
        totalPaybackWithoutNebs: totalPaybackWithoutNebs,
        totalPaybackWithNebs: totalPaybackWithNebs,
        totalUtilityCosts: totalUtilityCosts,
        totalUtilityCostSavings: totalUtilityCostSavings,
        utilityCategory: utilityCategory
    };
}
export interface ExecutiveSummaryReport {
    visitDate: Date;
    assessmentReports: Array<AssessmentReport>;
    keyPerformanceIndicatorReport: KeyPerformanceIndicatorReport;
    totalImplementationCost: number;
    totalNebFinancialImpact: number;
    totalNonNebCostSavings: number;
    totalFinancialImpact: number;
    totalCostSavings: number;
    totalRevenues: number;
    totalAssessmentNebFinancialImpact: number;
    totalPaybackWithoutNebs: number;
    totalPaybackWithNebs: number;
    totalUtilityCosts: number;
    totalUtilityCostSavings: number;
    utilityCategory?: string;
}