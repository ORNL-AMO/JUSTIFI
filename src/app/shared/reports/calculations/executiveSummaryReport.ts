import { IdbAssessment } from "src/app/models/assessment";
import * as _ from 'lodash';
import { IdbEnergyOpportunity } from "src/app/models/energyOpportunity";
import { IdbNonEnergyBenefit } from "src/app/models/nonEnergyBenefit";
import { KeyPerformanceMetric } from "../../constants/keyPerformanceMetrics";
import { IdbKeyPerformanceMetricImpact } from "src/app/models/keyPerformanceMetricImpact";
import { IdbReport, ReportOption } from "src/app/models/report";
import { AssessmentReport, getAssessmentReport } from "./assessmentReport";
import { getKeyPerfomanceIndicatorReport, KeyPerformanceIndicatorReport } from "./keyPerformanceIndicatorReport";
import { NebReport } from "./nebReport";

//IF no report is passed as a parameter
//All data (assessments/opps/nebs) included
export function getExecutiveSummaryReport(visitDate: Date, assessmentIds: Array<string>, assessments: Array<IdbAssessment>,
    energyOpportunities: Array<IdbEnergyOpportunity>, nonEnergyBenefits: Array<IdbNonEnergyBenefit>,
    facilityPerformanceMetrics: Array<KeyPerformanceMetric>, keyPerformanceMetricImpacts: Array<IdbKeyPerformanceMetricImpact>,
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
                assessment, energyOpportunities, nonEnergyBenefits, facilityPerformanceMetrics, keyPerformanceMetricImpacts, report);
            assessmentReports.push(assessmentReport);
        }
    });
    // gather kpm impacts
    let allNebReports: Array<NebReport> = assessmentReports.flatMap(report => {
        return report.allNebReports
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
        keyPerformanceIndicatorReport: getKeyPerfomanceIndicatorReport(allNebReports),
        totalImplementationCost: totalImplementationCost,
        totalNebFinancialImpact: totalNebFinancialImpact,
        totalNonNebCostSavings: totalNonNebCostSavings,
        totalFinancialImpact: totalFinancialImpact,
        totalPaybackWithoutNebs: totalPaybackWithoutNebs,
        totalPaybackWithNebs: totalPaybackWithNebs,
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
    totalPaybackWithoutNebs: number;
    totalPaybackWithNebs: number;
}