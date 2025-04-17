import { KeyPerformanceMetric } from "../../constants/keyPerformanceMetrics";
import { IdbNonEnergyBenefit } from "../../../models/nonEnergyBenefit";
import * as _ from 'lodash';
import { IdbKeyPerformanceMetricImpact } from "src/app/models/keyPerformanceMetricImpact";
import { IdbReport, ReportOption } from "src/app/models/report";

///NEB REPORT
export function getNebReport(nonEnergyBenefit: IdbNonEnergyBenefit, facilityPerformanceMetrics: Array<KeyPerformanceMetric>, keyPerformanceMetricImpact: Array<IdbKeyPerformanceMetricImpact>, report?: IdbReport): NebReport {
    let reportPerformanceMetrics: Array<ReportPerformanceMetric> = new Array();
    keyPerformanceMetricImpact.forEach(performanceMetricImpact => {
        if (nonEnergyBenefit.guid == performanceMetricImpact.nebId) {
            let includedInReport: boolean = true;
            if (report) {
                let option: ReportOption = report.kpmImpactOptions.find(option => {
                    return option.kpmImpactId == performanceMetricImpact.guid
                });
                includedInReport = option.include
            }
            if (includedInReport) {
                let keyPerformanceMetric: KeyPerformanceMetric = facilityPerformanceMetrics.find(companyKPM => {
                    if (companyKPM.isCustom == false) {
                        return companyKPM.value == performanceMetricImpact.kpmValue
                    } else {
                        return companyKPM.guid == performanceMetricImpact.kpmGuid
                    }
                });
                if (keyPerformanceMetric) {
                    reportPerformanceMetrics.push({
                        performanceMetricImpact: performanceMetricImpact,
                        keyPerformanceMetric: keyPerformanceMetric
                    })
                }
            }
        }
    });
    let totalRevenue: number = 0;
    //TODO: costimpact/revenue on NEB
    let totalCostDecrease: number = nonEnergyBenefit.costImpact || 0;
    reportPerformanceMetrics.forEach(reportPerformanceMetric => {
        if (reportPerformanceMetric.keyPerformanceMetric.goalToIncrease) {
            //revenue
            if (reportPerformanceMetric.performanceMetricImpact.costAdjustment) {
                totalRevenue += reportPerformanceMetric.performanceMetricImpact.costAdjustment;
            }
        } else {
            //cost
            if (reportPerformanceMetric.performanceMetricImpact.costAdjustment) {
                totalCostDecrease += reportPerformanceMetric.performanceMetricImpact.costAdjustment;
            }
        }
    });

    return {
        nonEnergyBenefit: nonEnergyBenefit,
        reportPerformanceMetrics: reportPerformanceMetrics,
        //todo: update to handle cost adjustment +/- as good
        //currently treating everything as a reduction
        totalRevenue: totalRevenue,
        totalCostDecrease: totalCostDecrease,
        totalFinancialImpact: totalRevenue + totalCostDecrease
    }
}

export interface NebReport {
    nonEnergyBenefit: IdbNonEnergyBenefit,
    reportPerformanceMetrics: Array<ReportPerformanceMetric>
    totalRevenue: number,
    totalCostDecrease: number,
    totalFinancialImpact: number,

}

export interface ReportPerformanceMetric {
    keyPerformanceMetric: KeyPerformanceMetric,
    performanceMetricImpact: IdbKeyPerformanceMetricImpact
}