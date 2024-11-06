import { KeyPerformanceMetric } from "../../constants/keyPerformanceMetrics";
import { IdbAssessment } from "../../../models/assessment";
import { IdbEnergyOpportunity } from "../../../models/energyOpportunity";
import { IdbNonEnergyBenefit } from "../../../models/nonEnergyBenefit";
import * as _ from 'lodash';
import { EnergyOpportunityReport, getEnergyOpportunityReport } from "./energyOpportunityReport";
import { NebReport, getNebReport } from "./nebReport";
import { KeyPerformanceIndicatorReport, getKeyPerfomanceIndicatorReport } from "./keyPerformanceIndicatorReport";
import { IdbKeyPerformanceMetricImpact } from "src/app/models/keyPerformanceMetricImpact";

///ASSESSMENT REPORT
export function getAssessmentReport(assessment: IdbAssessment, energyOpportunities: Array<IdbEnergyOpportunity>, nonEnergyBenefits: Array<IdbNonEnergyBenefit>, companyPerformanceMetrics: Array<KeyPerformanceMetric>, keyPerformanceMetricImpacts: Array<IdbKeyPerformanceMetricImpact>): AssessmentReport {

    if (!assessment.energySavings) {
        assessment.energySavings = 0;
    }

    if (!assessment.costSavings) {
        assessment.costSavings = 0;
    }

    if (!assessment.implementationCost) {
        assessment.implementationCost = 0;
    }

    let energyOpportunityReports: Array<EnergyOpportunityReport> = new Array();
    let assessmentEnergyOpportunities: Array<IdbEnergyOpportunity> = energyOpportunities.filter(energyOpportunity => {
        return energyOpportunity.assessmentId == assessment.guid;
    })
    assessmentEnergyOpportunities.forEach(energyOpportunity => {
        let energyOpportunityReport: EnergyOpportunityReport = getEnergyOpportunityReport(energyOpportunity, nonEnergyBenefits, companyPerformanceMetrics, keyPerformanceMetricImpacts);
        energyOpportunityReports.push(energyOpportunityReport);
    });

    let assessmentNebReports: Array<NebReport> = new Array();
    let assessmentNebs: Array<IdbNonEnergyBenefit> = nonEnergyBenefits.filter(neb => {
        return neb.assessmentId == assessment.guid && !neb.energyOpportunityId
    });
    assessmentNebs.forEach(neb => {
        let nebReport: NebReport = getNebReport(neb, companyPerformanceMetrics, keyPerformanceMetricImpacts);
        assessmentNebReports.push(nebReport);
    });

    let energyOpportunityNebReports: Array<NebReport> = energyOpportunityReports.flatMap(report => {
        return report.nebReports
    });

    let allNebReports: Array<NebReport> = _.concat(energyOpportunityNebReports, assessmentNebReports);

    let totalNonOpportunitySavings: number = _.sumBy(assessmentNebReports, (report: NebReport) => {
        return report.totalCostSavings
    });
    if (assessment.costSavings) {
        totalNonOpportunitySavings += assessment.costSavings;
    }
    let energyOpportunityCostSavings: number = _.sumBy(energyOpportunityReports, (report: EnergyOpportunityReport) => {
        return report.totalEnergyCostSavings
    });
    let totalEnergyCostSavings: number = 0;

    if (energyOpportunityCostSavings) {
        totalEnergyCostSavings += energyOpportunityCostSavings;
    };

    if (assessment.costSavings) {
        totalEnergyCostSavings += assessment.costSavings;
    }

    let totalAssessmentNebSavings: number = _.sumBy(assessmentNebReports, (report: NebReport) => {
        return report.totalCostSavings
    });
    let energyOpportunityNebSavings: number = _.sumBy(energyOpportunityNebReports, (report: NebReport) => {
        return report.totalCostSavings
    });
    let totalNebSavings: number = totalAssessmentNebSavings + energyOpportunityNebSavings;

    let totalCostSavings: number = totalEnergyCostSavings + totalNebSavings;

    let opportunityEnergySavings: number = _.sumBy(energyOpportunityReports, (report: EnergyOpportunityReport) => {
        if (report.energyOpportunity.energySavings) {
            return report.energyOpportunity.energySavings;
        }
        return 0;
    });

    let totalEnergySavings: number = 0;
    if (assessment.energySavings) {
        totalEnergySavings += assessment.energySavings;
    }
    if (opportunityEnergySavings) {
        totalEnergySavings += opportunityEnergySavings;
    };


    let energyOpportunityImplementationCost: number = _.sumBy(energyOpportunityReports, (report: EnergyOpportunityReport) => {
        if (report.energyOpportunity.implementationCost) {
            return report.energyOpportunity.implementationCost;
        }
        return 0;
    })

    let implementationCost: number = 0;
    if (energyOpportunityImplementationCost) {
        implementationCost += energyOpportunityImplementationCost;
    }
    if (assessment.implementationCost) {
        implementationCost += assessment.implementationCost;
    }

    let totalPaybackWithNebs: number = (implementationCost / totalCostSavings);
    if (totalPaybackWithNebs == Infinity) {
        totalPaybackWithNebs = 0;
    }
    let totalPaybackWithoutNebs: number = (implementationCost / totalEnergyCostSavings);
    if (totalPaybackWithoutNebs == Infinity) {
        totalPaybackWithoutNebs = 0;
    }
    let nonOpportunityPaybackWithoutNebs: number = (assessment.implementationCost / assessment.costSavings);
    if (nonOpportunityPaybackWithoutNebs == Infinity) {
        nonOpportunityPaybackWithoutNebs = 0;
    }
    let nonOpportunityPaybackWithNebs: number = (assessment.implementationCost / totalNonOpportunitySavings);
    if (nonOpportunityPaybackWithNebs == Infinity) {
        nonOpportunityPaybackWithNebs = 0;
    }
    let totalNonOpportunityAssessmentSavings: number = totalAssessmentNebSavings + assessment.costSavings;
    return {
        assessment: assessment,
        energyOpportunityReports: energyOpportunityReports,
        assessmentNebReports: assessmentNebReports,
        // totalNebReports: totalNebReports,
        totalEnergyCostSavings: totalEnergyCostSavings,
        totalAssessmentNebSavings: totalAssessmentNebSavings,
        totalNebSavings: totalNebSavings,
        totalCostSavings: totalCostSavings,
        adjustedCost: assessment.cost - totalCostSavings,
        //TODO: math implementation needed
        adjustedEnergyUse: assessment.energyUse - totalEnergySavings,
        totalEnergySavings: totalEnergySavings,
        totalNonOpportunitySavings: totalNonOpportunitySavings,
        totalPaybackWithNebs: totalPaybackWithNebs,
        totalPaybackWithoutNebs: totalPaybackWithoutNebs,
        totalImplementationCost: implementationCost,
        nonOpportunityPaybackWithoutNebs: nonOpportunityPaybackWithoutNebs,
        nonOpportunityPaybackWithNebs: nonOpportunityPaybackWithNebs,
        totalNonOpportunityAssessmentSavings: totalNonOpportunityAssessmentSavings,
        allNebReports: allNebReports,
        keyPerformanceIndicatorReport: getKeyPerfomanceIndicatorReport(allNebReports)
    }
}

export interface AssessmentReport {
    assessment: IdbAssessment,
    energyOpportunityReports: Array<EnergyOpportunityReport>,
    assessmentNebReports: Array<NebReport>,
    allNebReports: Array<NebReport>,
    // totalNebReports: Array<NebReport>,
    totalEnergyCostSavings: number,
    totalAssessmentNebSavings: number,
    totalNebSavings: number,
    totalCostSavings: number,
    adjustedCost: number,
    adjustedEnergyUse: number,
    totalEnergySavings: number,
    totalNonOpportunitySavings: number,
    totalPaybackWithNebs: number,
    totalPaybackWithoutNebs: number,
    totalImplementationCost: number,
    nonOpportunityPaybackWithoutNebs: number,
    nonOpportunityPaybackWithNebs: number,
    totalNonOpportunityAssessmentSavings: number,
    keyPerformanceIndicatorReport: KeyPerformanceIndicatorReport,
}