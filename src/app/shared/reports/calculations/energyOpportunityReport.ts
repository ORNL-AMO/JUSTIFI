import { KeyPerformanceMetric } from "../../constants/keyPerformanceMetrics";
import { IdbEnergyOpportunity } from "../../../models/energyOpportunity";
import { IdbNonEnergyBenefit } from "../../../models/nonEnergyBenefit";
import * as _ from 'lodash';
import { NebReport, getNebReport } from "./nebReport";
import { IdbKeyPerformanceMetricImpact } from "src/app/models/keyPerformanceMetricImpact";
import { filterNebs } from "./assessmentReport";
import { IdbReport } from "src/app/models/report";

///ENERGY REPORT
export function getEnergyOpportunityReport(energyOpportunity: IdbEnergyOpportunity, nonEnergyBenefits: Array<IdbNonEnergyBenefit>, facilityPerformanceMetrics: Array<KeyPerformanceMetric>, keyPerformanceMetricImpacts: Array<IdbKeyPerformanceMetricImpact>, report?: IdbReport): EnergyOpportunityReport {
    let energyOpportunityNebs: Array<IdbNonEnergyBenefit> = filterNebs(nonEnergyBenefits, energyOpportunity.assessmentId, energyOpportunity.guid, report?.nonEnergyBenefitOptions);
    let nebReports: Array<NebReport> = new Array();
    energyOpportunityNebs.forEach(neb => {
        let nebReport: NebReport = getNebReport(neb, facilityPerformanceMetrics, keyPerformanceMetricImpacts);
        nebReports.push(nebReport);
    })
    let totalEnergyCostSavings: number = 0;
    let totalWaterCostSavings: number = 0;
    if (energyOpportunity.includeSavings && energyOpportunity.costSavings) {
        if (energyOpportunity.utilityCategory && energyOpportunity.utilityCategory == 'water') {
            totalEnergyCostSavings = 0;
            totalWaterCostSavings = energyOpportunity.costSavings;
        } else {
            totalEnergyCostSavings = energyOpportunity.costSavings;
            totalWaterCostSavings = 0;
        }
    }
    let totalNonNebCostSavings: number = totalEnergyCostSavings + totalWaterCostSavings;

    let totalNebCostSavings: number = _.sumBy(nebReports, (nebReport: NebReport) => {
        return nebReport.totalCostSavings
    });
    let totalCostSavings: number = totalNonNebCostSavings + totalNebCostSavings;
    let paybackWithNebs: number = (energyOpportunity.implementationCost / totalCostSavings);
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
        totalNebCostSavings: totalNebCostSavings,
        totalCostSavings: totalCostSavings,
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
    totalNebCostSavings: number,
    totalCostSavings: number,
    paybackWithNebs: number,
    paybackWithoutNebs: number
}
