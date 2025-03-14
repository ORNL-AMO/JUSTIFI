import { IdbOnSiteVisit } from "src/app/models/onSiteVisit";
import { AssessmentReport, getAssessmentReport } from "./assessmentReport";
import { IdbAssessment } from "src/app/models/assessment";
import { IdbEnergyOpportunity } from "src/app/models/energyOpportunity";
import { KeyPerformanceMetric } from "../../constants/keyPerformanceMetrics";
import { IdbNonEnergyBenefit } from "src/app/models/nonEnergyBenefit";
import { IdbKeyPerformanceMetricImpact } from "src/app/models/keyPerformanceMetricImpact";
import { getKeyPerfomanceIndicatorReport, KeyPerformanceIndicatorReport } from "./keyPerformanceIndicatorReport";
import { NebReport } from "./nebReport";
import * as _ from 'lodash';

export function getOnSiteVisitReport(assessmentIds: Array<string>, assessments: Array<IdbAssessment>,
    energyOpportunities: Array<IdbEnergyOpportunity>, nonEnergyBenefits: Array<IdbNonEnergyBenefit>,
    facilityPerformanceMetrics: Array<KeyPerformanceMetric>, keyPerformanceMetricImpacts: Array<IdbKeyPerformanceMetricImpact>): OnSiteVisitReport {

    let assessmentReports: Array<AssessmentReport> = new Array();
    assessmentIds.forEach(assessmentId => {
        let assessment: IdbAssessment = assessments.find(assessment => {
            return assessment.guid == assessmentId;
        });
        let assessmentReport: AssessmentReport = getAssessmentReport(assessment, energyOpportunities, nonEnergyBenefits, facilityPerformanceMetrics, keyPerformanceMetricImpacts);
        assessmentReports.push(assessmentReport);
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

    let totalCostSavings: number = _.sumBy(assessmentReports, (report: AssessmentReport) => {
        return report.totalCostSavings
    });

    let totalNebCostSavings: number = _.sumBy(assessmentReports, (report: AssessmentReport) => {
        return report.totalNebCostSavings
    });
    let totalNonNebCostSavings: number = _.sumBy(assessmentReports, (report: AssessmentReport) => {
        return report.totalNonNebCostSavings
    });

    let totalUtilityCosts: number = _.sumBy(assessmentReports, (report: AssessmentReport) => {
        return report.assessment.cost
    });

    let totalImplementationCost: number = _.sumBy(assessmentReports, (report: AssessmentReport) => {
        if(report.totalImplementationCost){
            return report.totalImplementationCost
        }
        return 0;
    });
    let totalPaybackWithoutNebs: number = (totalImplementationCost / totalNonNebCostSavings);
    if (totalPaybackWithoutNebs == Infinity || isNaN(totalPaybackWithoutNebs)) {
        totalPaybackWithoutNebs = 0;
    }
    let totalPaybackWithNebs: number = (totalImplementationCost / totalCostSavings);
    if (totalPaybackWithNebs == Infinity || isNaN(totalPaybackWithNebs)) {
        totalPaybackWithNebs = 0;
    }
    return {
        assessmentReports: assessmentReports,
        allNebReports: allNebReports,
        keyPerformanceIndicatorReport: getKeyPerfomanceIndicatorReport(allNebReports),
        totalEnergyCostSavings: totalEnergyCostSavings,
        totalWaterCostSavings: totalWaterCostSavings,
        totalCostSavings: totalCostSavings,
        totalUtilityCosts: totalUtilityCosts,
        totalPaybackWithNebs: totalPaybackWithNebs,
        totalPaybackWithoutNebs: totalPaybackWithoutNebs,
        totalImplementationCost: totalImplementationCost,
        totalNebCostSavings: totalNebCostSavings,
        totalNonNebCostSavings: totalNonNebCostSavings
    };
}


export interface OnSiteVisitReport {
    assessmentReports: Array<AssessmentReport>,
    allNebReports: Array<NebReport>,
    keyPerformanceIndicatorReport: KeyPerformanceIndicatorReport,
    totalEnergyCostSavings: number,
    totalWaterCostSavings: number,
    totalUtilityCosts: number,
    totalCostSavings: number,
    totalImplementationCost: number,
    totalPaybackWithoutNebs: number,
    totalPaybackWithNebs: number,
    totalNebCostSavings: number,
    totalNonNebCostSavings: number
}