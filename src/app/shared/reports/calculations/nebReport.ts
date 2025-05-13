import { KeyPerformanceMetric, KeyPerformanceMetricOption } from "../../constants/keyPerformanceMetrics";
import { IdbNonEnergyBenefit } from "../../../models/nonEnergyBenefit";
import * as _ from 'lodash';
import { IdbKeyPerformanceMetricImpact } from "src/app/models/keyPerformanceMetricImpact";
import { IdbReport, ReportOption } from "src/app/models/report";
import { Key } from "ngx-indexed-db";
import { IdbKeyPerformanceIndicator } from "src/app/models/keyPerformanceIndicator";
import { KeyPerformanceIndicatorOption } from "../../constants/keyPerformanceIndicatorOptions";

///NEB REPORT
export function getNebReport(nonEnergyBenefit: IdbNonEnergyBenefit, facilityPerformanceMetrics: Array<KeyPerformanceMetric>,
    facilityPerformanceIndicators: Array<IdbKeyPerformanceIndicator>,
    keyPerformanceMetricImpact: Array<IdbKeyPerformanceMetricImpact>, report?: IdbReport): NebReport {
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
                    let keyPerformanceIndicator: IdbKeyPerformanceIndicator = facilityPerformanceIndicators.find(kpi => {
                        return kpi.guid == keyPerformanceMetric.kpiGuid
                    });
                    reportPerformanceMetrics.push({
                        performanceMetricImpact: performanceMetricImpact,
                        keyPerformanceMetric: keyPerformanceMetric,
                        keyPerformanceIndicator: keyPerformanceIndicator,
                    })
                }
            }
        }
    });
    let totalRevenue: number = 0;
    let totalCostDecrease: number = 0;
    let totalRebate: number = 0;
    if (nonEnergyBenefit.costImpactType == 'annual' && nonEnergyBenefit.costImpact) {
        totalCostDecrease = nonEnergyBenefit.costImpact;
    } else if (nonEnergyBenefit.costImpactType == 'oneTime') {
        totalRebate = nonEnergyBenefit.costImpact;
    }
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
        totalRevenue: totalRevenue,
        totalCostDecrease: totalCostDecrease,
        totalFinancialImpact: totalRevenue + totalCostDecrease,
        totalRebate: totalRebate
    }
}

export interface NebReport {
    nonEnergyBenefit: IdbNonEnergyBenefit,
    reportPerformanceMetrics: Array<ReportPerformanceMetric>
    totalRevenue: number,
    totalCostDecrease: number,
    totalFinancialImpact: number,
    totalRebate: number

}

export interface ReportPerformanceMetric {
    keyPerformanceMetric: KeyPerformanceMetric,
    performanceMetricImpact: IdbKeyPerformanceMetricImpact,
    keyPerformanceIndicator: IdbKeyPerformanceIndicator,
}