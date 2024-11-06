import { KeyPerformanceMetric } from "../../constants/keyPerformanceMetrics";
import { IdbNonEnergyBenefit } from "../../../models/nonEnergyBenefit";
import * as _ from 'lodash';
import { IdbKeyPerformanceMetricImpact } from "src/app/models/keyPerformanceMetricImpact";

///NEB REPORT
export function getNebReport(nonEnergyBenefit: IdbNonEnergyBenefit, companyPerformanceMetrics: Array<KeyPerformanceMetric>, keyPerformanceMetricImpact: Array<IdbKeyPerformanceMetricImpact>): NebReport {
    let reportPerformanceMetrics: Array<ReportPerformanceMetric> = new Array();
    keyPerformanceMetricImpact.forEach(performanceMetricImpact => {
        if (nonEnergyBenefit.guid == performanceMetricImpact.nebId) {
            let keyPerformanceMetric: KeyPerformanceMetric = companyPerformanceMetrics.find(companyKPM => {
                if (companyKPM.isCustom == false) {
                    return companyKPM.value == performanceMetricImpact.kpmValue
                } else {
                    return companyKPM.guid == performanceMetricImpact.kpmGuid
                }
            });
            reportPerformanceMetrics.push({
                performanceMetricImpact: performanceMetricImpact,
                keyPerformanceMetric: keyPerformanceMetric
            })
        }
    });
    let costSavings: number = nonEnergyBenefit.costImpact || 0;


    return {
        nonEnergyBenefit: nonEnergyBenefit,
        reportPerformanceMetrics: reportPerformanceMetrics,
        //todo: update to handle cost adjustment +/- as good
        //currently treating everything as a reduction
        totalCostSavings: costSavings + _.sumBy(reportPerformanceMetrics, (reportPerformanceMetric: ReportPerformanceMetric) => {
            if (reportPerformanceMetric.performanceMetricImpact.costAdjustment) {
                return reportPerformanceMetric.performanceMetricImpact.costAdjustment;
            }
            return 0;
        })
    }
}

export interface NebReport {
    nonEnergyBenefit: IdbNonEnergyBenefit,
    reportPerformanceMetrics: Array<ReportPerformanceMetric>
    totalCostSavings: number
}

export interface ReportPerformanceMetric {
    keyPerformanceMetric: KeyPerformanceMetric,
    performanceMetricImpact: IdbKeyPerformanceMetricImpact
}