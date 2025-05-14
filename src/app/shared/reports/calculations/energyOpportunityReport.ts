import { KeyPerformanceMetric } from "../../constants/keyPerformanceMetrics";
import { IdbEnergyOpportunity } from "../../../models/energyOpportunity";
import { IdbNonEnergyBenefit } from "../../../models/nonEnergyBenefit";
import * as _ from 'lodash';
import { NebReport, getNebReport } from "./nebReport";
import { IdbKeyPerformanceMetricImpact } from "src/app/models/keyPerformanceMetricImpact";
import { filterNebs } from "./assessmentReport";
import { IdbReport } from "src/app/models/report";
import { IdbKeyPerformanceIndicator } from "src/app/models/keyPerformanceIndicator";
import { IdbAssessment } from "src/app/models/assessment";

///ENERGY REPORT
export function getEnergyOpportunityReport(
    energyOpportunity: IdbEnergyOpportunity,
    nonEnergyBenefits: Array<IdbNonEnergyBenefit>,
    facilityPerformanceMetrics: Array<KeyPerformanceMetric>,
    facilityPerformanceIndicators: Array<IdbKeyPerformanceIndicator>,
    keyPerformanceMetricImpacts: Array<IdbKeyPerformanceMetricImpact>,
    assessment: IdbAssessment,
    report?: IdbReport): EnergyOpportunityReport {
    let energyOpportunityNebs: Array<IdbNonEnergyBenefit> = filterNebs(nonEnergyBenefits, energyOpportunity.assessmentId, energyOpportunity.guid, report?.nonEnergyBenefitOptions);
    let nebReports: Array<NebReport> = new Array();
    energyOpportunityNebs.forEach(neb => {
        let nebReport: NebReport = getNebReport(neb, facilityPerformanceMetrics, facilityPerformanceIndicators, keyPerformanceMetricImpacts, report);
        nebReports.push(nebReport);
    })
    let totalEnergyCostSavings: number = 0;
    let totalWaterCostSavings: number = 0;
    if (!assessment.utilitySavingsByAssessment && energyOpportunity.costSavings) {
        if (energyOpportunity.utilityCategory && energyOpportunity.utilityCategory == 'water') {
            totalEnergyCostSavings = 0;
            totalWaterCostSavings = energyOpportunity.costSavings;
        } else {
            totalEnergyCostSavings = energyOpportunity.costSavings;
            totalWaterCostSavings = 0;
        }
    }
    let totalNonNebCostSavings: number = totalEnergyCostSavings + totalWaterCostSavings;

    let totalNebFinancialImpact: number = _.sumBy(nebReports, (nebReport: NebReport) => {
        return nebReport.totalFinancialImpact
    });
    let totalFinancialImpact: number = totalNonNebCostSavings + totalNebFinancialImpact;
    let paybackWithNebs: number = (energyOpportunity.implementationCost / totalFinancialImpact);
    if (paybackWithNebs == Infinity) {
        paybackWithNebs = 0;
    }
    let paybackWithoutNebs: number = (energyOpportunity.implementationCost / totalNonNebCostSavings);
    if (paybackWithoutNebs == Infinity) {
        paybackWithoutNebs = 0;
    }

    return {
        energyOpportunity: energyOpportunity,
        nebReports: nebReports,
        totalEnergyCostSavings: totalEnergyCostSavings,
        totalWaterCostSavings: totalWaterCostSavings,
        totalNonNebCostSavings: totalNonNebCostSavings,
        totalNebFinancialImpact: totalNebFinancialImpact,
        totalFinancialImpact: totalFinancialImpact,
        paybackWithNebs: paybackWithNebs,
        paybackWithoutNebs: paybackWithoutNebs
    }
}


export interface EnergyOpportunityReport {
    energyOpportunity: IdbEnergyOpportunity
    nebReports: Array<NebReport>,
    totalEnergyCostSavings: number,
    totalWaterCostSavings: number,
    totalNonNebCostSavings: number,
    totalNebFinancialImpact: number,
    totalFinancialImpact: number,
    paybackWithNebs: number,
    paybackWithoutNebs: number
}

export interface AdditionalEnergyOpportunityReport {
    name: string,
    implementationCost: number,
    totalEnergyCostSavings: number,
    totalWaterCostSavings: number,
    totalNonNebCostSavings: number,
    totalNebFinancialImpact: number,
    totalFinancialImpact: number,
}