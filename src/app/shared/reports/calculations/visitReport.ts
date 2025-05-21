import { IdbOnSiteVisit } from "src/app/models/onSiteVisit";
import { AssessmentReport, getAssessmentReport } from "./assessmentReport";
import { IdbAssessment } from "src/app/models/assessment";
import { IdbEnergyOpportunity } from "src/app/models/energyOpportunity";
import { KeyPerformanceMetric } from "../../constants/keyPerformanceMetrics";
import { IdbNonEnergyBenefit } from "src/app/models/nonEnergyBenefit";
import { IdbKeyPerformanceMetricImpact } from "src/app/models/keyPerformanceMetricImpact";
import { getKeyPerformanceIndicatorReport, KeyPerformanceIndicatorReport } from "./keyPerformanceIndicatorReport";
import { NebReport } from "./nebReport";
import * as _ from 'lodash';
import { IdbReport, ReportOption } from "src/app/models/report";
import { IdbKeyPerformanceIndicator } from "src/app/models/keyPerformanceIndicator";

export function getOnSiteVisitReport(assessmentIds: Array<string>, assessments: Array<IdbAssessment>,
    energyOpportunities: Array<IdbEnergyOpportunity>, nonEnergyBenefits: Array<IdbNonEnergyBenefit>,
    facilityPerformanceMetrics: Array<KeyPerformanceMetric>,
    facilityPerformanceIndicators: Array<IdbKeyPerformanceIndicator>,
    keyPerformanceMetricImpacts: Array<IdbKeyPerformanceMetricImpact>,
    report?: IdbReport): OnSiteVisitReport {

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
            let assessmentReport: AssessmentReport = getAssessmentReport(assessment, energyOpportunities, nonEnergyBenefits, facilityPerformanceMetrics, facilityPerformanceIndicators, keyPerformanceMetricImpacts, report);
            assessmentReports.push(assessmentReport);
        }
    });
    let allNebReports: Array<NebReport> = assessmentReports.flatMap(report => {
        return report.allNebReports
    });

    let totalEnergyCostSavings: number = _.sumBy(assessmentReports, (report: AssessmentReport) => {
        return report.totalEnergyCostSavings
    });
    let totalWaterCostSavings: number = _.sumBy(assessmentReports, (report: AssessmentReport) => {
        return report.totalWaterCostSavings
    });

    let totalFinancialImpact: number = _.sumBy(assessmentReports, (report: AssessmentReport) => {
        return report.totalFinancialImpact
    });

    let totalNebFinancialImpact: number = _.sumBy(assessmentReports, (report: AssessmentReport) => {
        return report.totalNebFinancialImpact
    });
    let totalNonNebCostSavings: number = _.sumBy(assessmentReports, (report: AssessmentReport) => {
        return report.totalNonNebCostSavings
    });

    let totalUtilityCosts: number = _.sumBy(assessmentReports, (report: AssessmentReport) => {
        return report.assessment.cost
    });

    let totalRebates: number = _.sumBy(assessmentReports, (report: AssessmentReport) => {
        return report.totalRebates
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

    let totalNonKpmNebs: number = _.sumBy(assessmentReports, (report: AssessmentReport) => {
        if (report.totalNonKpmNebs) {
            return report.totalNonKpmNebs
        }
        return 0;
    });

    return {
        assessmentReports: assessmentReports,
        allNebReports: allNebReports,
        keyPerformanceIndicatorReport: getKeyPerformanceIndicatorReport(allNebReports),
        totalEnergyCostSavings: totalEnergyCostSavings,
        totalWaterCostSavings: totalWaterCostSavings,
        totalFinancialImpact: totalFinancialImpact,
        totalUtilityCosts: totalUtilityCosts,
        totalPaybackWithNebs: totalPaybackWithNebs,
        totalPaybackWithoutNebs: totalPaybackWithoutNebs,
        totalImplementationCost: totalImplementationCost,
        totalNebFinancialImpact: totalNebFinancialImpact,
        totalNonNebCostSavings: totalNonNebCostSavings,
        totalRebates: totalRebates,
        totalNonKpmNebs: totalNonKpmNebs
    };
}


export interface OnSiteVisitReport {
    assessmentReports: Array<AssessmentReport>,
    allNebReports: Array<NebReport>,
    keyPerformanceIndicatorReport: KeyPerformanceIndicatorReport,
    totalEnergyCostSavings: number,
    totalWaterCostSavings: number,
    totalUtilityCosts: number,
    totalFinancialImpact: number,
    totalImplementationCost: number,
    totalPaybackWithoutNebs: number,
    totalPaybackWithNebs: number,
    totalNebFinancialImpact: number,
    totalNonNebCostSavings: number,
    totalRebates: number,
    totalNonKpmNebs: number
}