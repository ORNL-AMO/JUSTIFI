import { KeyPerformanceMetric } from "../../constants/keyPerformanceMetrics";
import { IdbAssessment } from "../../../models/assessment";
import { IdbEnergyOpportunity } from "../../../models/energyOpportunity";
import { IdbNonEnergyBenefit } from "../../../models/nonEnergyBenefit";
import * as _ from 'lodash';
import { EnergyOpportunityReport, getEnergyOpportunityReport } from "./energyOpportunityReport";
import { NebReport, getNebReport } from "./nebReport";
import { KeyPerformanceIndicatorReport, getKeyPerformanceIndicatorReport } from "./keyPerformanceIndicatorReport";
import { IdbKeyPerformanceMetricImpact } from "src/app/models/keyPerformanceMetricImpact";
import { IdbReport, ReportOption } from "src/app/models/report";
import { IdbKeyPerformanceIndicator } from "src/app/models/keyPerformanceIndicator";

///ASSESSMENT REPORT
export function getAssessmentReport(
    assessment: IdbAssessment,
    energyOpportunities: Array<IdbEnergyOpportunity>,
    nonEnergyBenefits: Array<IdbNonEnergyBenefit>,
    facilityPerformanceMetrics: Array<KeyPerformanceMetric>,
    facilityPerformanceIndicators: Array<IdbKeyPerformanceIndicator>,
    keyPerformanceMetricImpacts: Array<IdbKeyPerformanceMetricImpact>,
    report?: IdbReport): AssessmentReport {

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
    let assessmentEnergyOpportunities: Array<IdbEnergyOpportunity> = filterEnergyOpps(energyOpportunities, assessment.guid, report?.energyOpportunityOptions);
    assessmentEnergyOpportunities.forEach(energyOpportunity => {
        let energyOpportunityReport: EnergyOpportunityReport = getEnergyOpportunityReport(
            energyOpportunity, nonEnergyBenefits, facilityPerformanceMetrics, facilityPerformanceIndicators, keyPerformanceMetricImpacts, report);
        energyOpportunityReports.push(energyOpportunityReport);
    });

    let assessmentNebReports: Array<NebReport> = new Array();
    let assessmentNebs: Array<IdbNonEnergyBenefit> = filterNebs(nonEnergyBenefits, assessment.guid, undefined, report?.nonEnergyBenefitOptions);
    assessmentNebs.forEach(neb => {
        let nebReport: NebReport = getNebReport(neb, facilityPerformanceMetrics, facilityPerformanceIndicators, keyPerformanceMetricImpacts, report);
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

    let totalAssessmentNebFinancialImpact: number = _.sumBy(assessmentNebReports, (report: NebReport) => {
        return report.totalFinancialImpact
    });
    let energyOpportunityNebFinancialImpact: number = _.sumBy(energyOpportunityNebReports, (report: NebReport) => {
        return report.totalFinancialImpact
    });
    let totalNebFinancialImpact: number = totalAssessmentNebFinancialImpact + energyOpportunityNebFinancialImpact;

    let totalFinancialImpact: number = totalNonNebCostSavings + totalNebFinancialImpact;

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

    // update utilityCategory based on assessment and EEMs
    let utilityCategory: string = assessment.utilityCategory;
    if (utilityCategory == 'energy') {
        for (const report of energyOpportunityReports) {
            if (report.energyOpportunity.utilityCategory == 'water') {
                utilityCategory = 'water';
                break;
            }
        };
    }

    let totalNonOpportunityRebates: number = _.sumBy(assessmentNebReports, (report: EnergyOpportunityReport) => {
        if (report.totalRebates) {
            return report.totalRebates;
        }
        return 0;
    })

    let totalRebates: number = _.sumBy(energyOpportunityReports, (report: EnergyOpportunityReport) => {
        if (report.totalRebates) {
            return report.totalRebates;
        }
        return 0;
    }) + totalNonOpportunityRebates;

    let totalPaybackWithNebs: number = ((implementationCost + totalRebates) / totalFinancialImpact);
    if (totalPaybackWithNebs == Infinity) {
        totalPaybackWithNebs = 0;
    }
    let totalPaybackWithoutNebs: number = (implementationCost / totalNonNebCostSavings);
    if (totalPaybackWithoutNebs == Infinity) {
        totalPaybackWithoutNebs = 0;
    }

    // Assessment level/Non-Opportunity Cost Savings
    let totalNonOpportunityCostSavings: number = totalAssessmentNebFinancialImpact;
    if (assessment.costSavings) {
        totalNonOpportunityCostSavings += assessment.costSavings;
    }

    let nonOpportunityPaybackWithoutNebs: number = (assessment.implementationCost / assessment.costSavings);
    if (nonOpportunityPaybackWithoutNebs == Infinity) {
        nonOpportunityPaybackWithoutNebs = 0;
    }
    let nonOpportunityPaybackWithNebs: number = ((assessment.implementationCost - totalNonOpportunityRebates) / totalNonOpportunityCostSavings);
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
        totalAssessmentNebFinancialImpact: totalAssessmentNebFinancialImpact,
        totalNebFinancialImpact: totalNebFinancialImpact,
        totalNonNebCostSavings: totalNonNebCostSavings,
        totalFinancialImpact: totalFinancialImpact,
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
        keyPerformanceIndicatorReport: getKeyPerformanceIndicatorReport(allNebReports),
        utilityCategory: utilityCategory,
        totalNonOpportunityRebates: totalNonOpportunityRebates,
        totalRebates: totalRebates
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
    totalAssessmentNebFinancialImpact: number,
    totalNebFinancialImpact: number,
    totalNonNebCostSavings: number,
    totalFinancialImpact: number,
    adjustedEnergyUse: number,
    totalEnergySavings: number,
    totalNonOpportunityCostSavings: number, // totalNonOpportunityAssessmentSavings
    totalPaybackWithNebs: number,
    totalPaybackWithoutNebs: number,
    totalImplementationCost: number,
    nonOpportunityPaybackWithoutNebs: number,
    nonOpportunityPaybackWithNebs: number,
    keyPerformanceIndicatorReport: KeyPerformanceIndicatorReport,
    utilityCategory?: string,
    totalRebates: number,
    totalNonOpportunityRebates: number
}


function filterEnergyOpps(energyOpportunities: Array<IdbEnergyOpportunity>, assessmentGuid: string, energyOppReportOptions?: Array<ReportOption>): Array<IdbEnergyOpportunity> {
    let filteredEnergyOpportunities: Array<IdbEnergyOpportunity> = energyOpportunities.filter(energyOpportunity => {
        return energyOpportunity.assessmentId == assessmentGuid;
    });
    if (energyOppReportOptions) {
        filteredEnergyOpportunities = filteredEnergyOpportunities.filter(energyOpp => {
            let option: ReportOption = energyOppReportOptions.find(option => {
                return option.energyOpportunityId == energyOpp.guid
            });
            return option.include;
        });
    }
    return filteredEnergyOpportunities;
}

export function filterNebs(nonEnergyBenefits: Array<IdbNonEnergyBenefit>, assessmentId: string, energyOpportunityId: string, nebReportOptions?: Array<ReportOption>): Array<IdbNonEnergyBenefit> {
    let filteredNonEnergyBenefits: Array<IdbNonEnergyBenefit> = nonEnergyBenefits.filter(neb => {
        return neb.assessmentId == assessmentId && neb.energyOpportunityId == energyOpportunityId
    });
    if (nebReportOptions) {
        filteredNonEnergyBenefits = filteredNonEnergyBenefits.filter(nebOpp => {
            let option: ReportOption = nebReportOptions.find(option => {
                return option.nonEnergyBenefitId == nebOpp.guid
            });
            return option.include;
        });
    }
    return filteredNonEnergyBenefits;
}