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
export function getAssessmentReport(
    assessment: IdbAssessment,
    energyOpportunities: Array<IdbEnergyOpportunity>,
    nonEnergyBenefits: Array<IdbNonEnergyBenefit>,
    facilityPerformanceMetrics: Array<KeyPerformanceMetric>,
    keyPerformanceMetricImpacts: Array<IdbKeyPerformanceMetricImpact>): AssessmentReport {

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
        let energyOpportunityReport: EnergyOpportunityReport = getEnergyOpportunityReport(
            energyOpportunity, nonEnergyBenefits, facilityPerformanceMetrics, keyPerformanceMetricImpacts);
        energyOpportunityReports.push(energyOpportunityReport);
    });

    let assessmentNebReports: Array<NebReport> = new Array();
    let assessmentNebs: Array<IdbNonEnergyBenefit> = nonEnergyBenefits.filter(neb => {
        return neb.assessmentId == assessment.guid && !neb.energyOpportunityId
    });
    assessmentNebs.forEach(neb => {
        let nebReport: NebReport = getNebReport(neb, facilityPerformanceMetrics, keyPerformanceMetricImpacts);
        assessmentNebReports.push(nebReport);
    });

    let energyOpportunityNebReports: Array<NebReport> = energyOpportunityReports.flatMap(report => {
        return report.nebReports
    });

    let allNebReports: Array<NebReport> = _.concat(energyOpportunityNebReports, assessmentNebReports);

    let energyOpportunityEnergyCostSavings: number = _.sumBy(energyOpportunityReports, (report: EnergyOpportunityReport) => {
        return report.totalEnergyCostSavings
    });
    let energyOpportunityWaterCostSavings: number = _.sumBy(energyOpportunityReports, (report: EnergyOpportunityReport) => {
        return report.totalWaterCostSavings
    });
    let totalNonNebEnergyCostSavings: number = 0;
    let totalNonNebWaterCostSavings: number = 0;
    let totalNonNebCostSavings: number = 0;

    if (energyOpportunityEnergyCostSavings) {
        totalNonNebEnergyCostSavings += energyOpportunityEnergyCostSavings;
        totalNonNebCostSavings += energyOpportunityEnergyCostSavings;   
    };
    if (energyOpportunityWaterCostSavings) {
        totalNonNebWaterCostSavings += energyOpportunityWaterCostSavings;
        totalNonNebCostSavings += energyOpportunityWaterCostSavings;
    };

    if (assessment.energyCostSavings) {
        totalNonNebEnergyCostSavings += assessment.energyCostSavings;
    }
    if (assessment.waterCostSavings) {
        totalNonNebWaterCostSavings += assessment.waterCostSavings;
    }
    if (assessment.costSavings) {
        totalNonNebCostSavings += assessment.costSavings;
    }

    let totalAssessmentNebCostSavings: number = _.sumBy(assessmentNebReports, (report: NebReport) => {
        return report.totalCostSavings
    });
    let energyOpportunityNebCostSavings: number = _.sumBy(energyOpportunityNebReports, (report: NebReport) => {
        return report.totalCostSavings
    });
    let totalNebCostSavings: number = totalAssessmentNebCostSavings + energyOpportunityNebCostSavings;

    let totalCostSavings: number = totalNonNebCostSavings + totalNebCostSavings;

    let opportunityEnergySavings: number = _.sumBy(energyOpportunityReports, (report: EnergyOpportunityReport) => {
        if (report.energyOpportunity.includeSavings && 
            report.energyOpportunity.utilityCategory == 'energy' 
            && report.energyOpportunity.energySavings) {
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
    let totalPaybackWithoutNebs: number = (implementationCost / totalNonNebCostSavings);
    if (totalPaybackWithoutNebs == Infinity) {
        totalPaybackWithoutNebs = 0;
    }

    // Assessment level/Non-Opportunity Cost Savings
    let totalNonOpportunityCostSavings: number = totalAssessmentNebCostSavings;
    if (assessment.costSavings) {
        totalNonOpportunityCostSavings += assessment.costSavings;
    }

    let nonOpportunityPaybackWithoutNebs: number = (assessment.implementationCost / assessment.costSavings);
    if (nonOpportunityPaybackWithoutNebs == Infinity) {
        nonOpportunityPaybackWithoutNebs = 0;
    }
    let nonOpportunityPaybackWithNebs: number = (assessment.implementationCost / totalNonOpportunityCostSavings);
    if (nonOpportunityPaybackWithNebs == Infinity) {
        nonOpportunityPaybackWithNebs = 0;
    }
    return {
        assessment: assessment,
        energyOpportunityReports: energyOpportunityReports,
        assessmentNebReports: assessmentNebReports,
        // totalNebReports: totalNebReports,
        totalEnergyCostSavings: totalNonNebEnergyCostSavings,
        totalWaterCostSavings: totalNonNebWaterCostSavings,
        totalAssessmentNebSavings: totalAssessmentNebCostSavings,
        totalNebCostSavings: totalNebCostSavings,
        totalNonNebCostSavings: totalNonNebCostSavings,
        totalCostSavings: totalCostSavings,
        adjustedCost: assessment.cost - totalCostSavings,
        //TODO: math implementation needed
        adjustedEnergyUse: assessment.energyUse - totalEnergySavings,
        totalEnergySavings: totalEnergySavings,
        totalNonOpportunityCostSavings: totalNonOpportunityCostSavings,
        totalPaybackWithNebs: totalPaybackWithNebs,
        totalPaybackWithoutNebs: totalPaybackWithoutNebs,
        totalImplementationCost: implementationCost,
        nonOpportunityPaybackWithoutNebs: nonOpportunityPaybackWithoutNebs,
        nonOpportunityPaybackWithNebs: nonOpportunityPaybackWithNebs,
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
    totalWaterCostSavings: number,
    totalAssessmentNebSavings: number,
    totalNebCostSavings: number,
    totalNonNebCostSavings: number,
    totalCostSavings: number,
    adjustedCost: number,
    adjustedEnergyUse: number,
    totalEnergySavings: number,
    totalNonOpportunityCostSavings: number, // totalNonOpportunityAssessmentSavings
    totalPaybackWithNebs: number,
    totalPaybackWithoutNebs: number,
    totalImplementationCost: number,
    nonOpportunityPaybackWithoutNebs: number,
    nonOpportunityPaybackWithNebs: number,
    keyPerformanceIndicatorReport: KeyPerformanceIndicatorReport,
}