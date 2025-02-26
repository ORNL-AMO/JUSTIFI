import { KeyPerformanceMetric } from "../../constants/keyPerformanceMetrics";
import { IdbEnergyOpportunity } from "../../../models/energyOpportunity";
import { IdbNonEnergyBenefit } from "../../../models/nonEnergyBenefit";
import * as _ from 'lodash';
import { NebReport, getNebReport } from "./nebReport";
import { IdbKeyPerformanceMetricImpact } from "src/app/models/keyPerformanceMetricImpact";

///ENERGY REPORT
export function getEnergyOpportunityReport(energyOpportunity: IdbEnergyOpportunity, nonEnergyBenefits: Array<IdbNonEnergyBenefit>, facilityPerformanceMetrics: Array<KeyPerformanceMetric>, keyPerformanceMetricImpacts: Array<IdbKeyPerformanceMetricImpact>): EnergyOpportunityReport {
    let energyOpportunityNebs: Array<IdbNonEnergyBenefit> = nonEnergyBenefits.filter(neb => {
        return neb.energyOpportunityId == energyOpportunity.guid
    });
    let nebReports: Array<NebReport> = new Array();
    energyOpportunityNebs.forEach(neb => {
        let nebReport: NebReport = getNebReport(neb, facilityPerformanceMetrics, keyPerformanceMetricImpacts);
        nebReports.push(nebReport);
    })
    let totalEnergyCostSavings: number = 0;
    if (energyOpportunity.includeSavings && energyOpportunity.costSavings) {
        totalEnergyCostSavings = energyOpportunity.costSavings;
    }

    let totalNebSavings: number = _.sumBy(nebReports, (nebReport: NebReport) => {
        return nebReport.totalCostSavings
    });
    let totalCostSavings: number = totalEnergyCostSavings + totalNebSavings;
    let paybackWithNebs: number = (energyOpportunity.implementationCost / totalCostSavings);
    if(paybackWithNebs == Infinity){
        paybackWithNebs = 0;
    }
    let paybackWithoutNebs: number = (energyOpportunity.implementationCost / totalEnergyCostSavings);
    if(paybackWithoutNebs == Infinity){
        paybackWithoutNebs = 0;
    }

    return {
        energyOpportunity: energyOpportunity,
        nebReports: nebReports,
        totalEnergyCostSavings: totalEnergyCostSavings,
        totalNebSavings: totalNebSavings,
        totalCostSavings: totalCostSavings,
        paybackWithNebs: paybackWithNebs,
        paybackWithoutNebs: paybackWithoutNebs
    }
}


export interface EnergyOpportunityReport {
    energyOpportunity: IdbEnergyOpportunity
    nebReports: Array<NebReport>,
    totalEnergyCostSavings: number,
    totalNebSavings: number,
    totalCostSavings: number,
    paybackWithNebs: number,
    paybackWithoutNebs: number
}
