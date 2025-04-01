import { IdbAssessment } from "src/app/models/assessment";
import { IdbEnergyOpportunity } from "src/app/models/energyOpportunity";
import { IdbNonEnergyBenefit } from "src/app/models/nonEnergyBenefit";
import { KeyPerformanceMetric } from "../../constants/keyPerformanceMetrics";
import { IdbKeyPerformanceMetricImpact } from "src/app/models/keyPerformanceMetricImpact";
import { IdbReport } from "src/app/models/report";

//IF no report is passed as a parameter
//All data (assessments/opps/nebs) included
export function getExecutiveSummaryReport(assessmentIds: Array<string>, assessments: Array<IdbAssessment>,
    energyOpportunities: Array<IdbEnergyOpportunity>, nonEnergyBenefits: Array<IdbNonEnergyBenefit>,
    facilityPerformanceMetrics: Array<KeyPerformanceMetric>, keyPerformanceMetricImpacts: Array<IdbKeyPerformanceMetricImpact>,
    report?: IdbReport): ExecutiveSummaryReport {
    //TODO: Fill out math for executive summary report

    return {};
}

export interface ExecutiveSummaryReport {
    //TODO: Define exectuive summary report details
}