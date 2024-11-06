import { KeyPerformanceMetric } from "../../constants/keyPerformanceMetrics";
import * as _ from 'lodash';
import { NebReport } from "./nebReport";
import { IdbKeyPerformanceMetricImpact } from "src/app/models/keyPerformanceMetricImpact";


export function getKeyPerfomanceIndicatorReport(nebReports: Array<NebReport>): KeyPerformanceIndicatorReport {
    let kpiReportItems: Array<KeyPerformanceIndicatorReportItem> = new Array();
    nebReports.forEach(nebReport => {
        nebReport.reportPerformanceMetrics.forEach(performanceMetric => {
            if (isNaN(performanceMetric.performanceMetricImpact.costAdjustment)) {
                performanceMetric.performanceMetricImpact.costAdjustment = 0;
            }
            let itemExistIndex: number = kpiReportItems.findIndex(reportItem => {
                if (reportItem.keyPerformanceMetric.isCustom == false) {
                    return reportItem.keyPerformanceMetric.value == performanceMetric.keyPerformanceMetric.value;
                } else {
                    return reportItem.keyPerformanceMetric.label == performanceMetric.keyPerformanceMetric.label;
                }
            });
            if (itemExistIndex != -1) {
                if (performanceMetric.performanceMetricImpact.costAdjustment) {
                    kpiReportItems[itemExistIndex].performanceMetricImpact.costAdjustment += performanceMetric.performanceMetricImpact.costAdjustment;
                }
                if (performanceMetric.performanceMetricImpact.modificationValue) {
                    kpiReportItems[itemExistIndex].performanceMetricImpact.modificationValue += performanceMetric.performanceMetricImpact.modificationValue;
                }
                if (kpiReportItems[itemExistIndex].keyPerformanceMetric.baselineCost) {
                    kpiReportItems[itemExistIndex].performanceMetricImpact.percentSavings = (kpiReportItems[itemExistIndex].performanceMetricImpact.costAdjustment / kpiReportItems[itemExistIndex].keyPerformanceMetric.baselineCost) * 100;
                }
            } else {
                if (performanceMetric.keyPerformanceMetric.isCustom) {

                }
                kpiReportItems.push({
                    keyPerformanceMetric: performanceMetric.keyPerformanceMetric,
                    performanceMetricImpact: {
                        ...performanceMetric.performanceMetricImpact,
                        percentSavings: (performanceMetric.performanceMetricImpact.costAdjustment / performanceMetric.keyPerformanceMetric.baselineCost) * 100,
                        modifiedCost: (performanceMetric.keyPerformanceMetric.baselineCost - performanceMetric.performanceMetricImpact.costAdjustment)
                    },
                    // nebsImpacts: [{
                    //     nebName: string,
                    //     nebValue: NebOptionValue,
                    //     performanceMetricImpact: PerformanceMetricImpact
                    // }]

                })
            }
        })
    })

    let baselineCost: number = _.sumBy(kpiReportItems, (reportItem: KeyPerformanceIndicatorReportItem) => {
        if (reportItem.keyPerformanceMetric.isQuantitative && reportItem.keyPerformanceMetric.baselineCost) {
            return reportItem.keyPerformanceMetric.baselineCost;
        }
        return 0
    });
    let annualSavings: number = _.sumBy(kpiReportItems, (reportItem: KeyPerformanceIndicatorReportItem) => {
        if (reportItem.keyPerformanceMetric.isQuantitative && reportItem.performanceMetricImpact.costAdjustment) {
            return reportItem.performanceMetricImpact.costAdjustment;
        }
        return 0
    });
    let modifiedCost: number = baselineCost - annualSavings;
    let percentSavings: number = (annualSavings / baselineCost) * 100
    return {
        kpiReportItems: kpiReportItems,
        total: {
            baselineCost: baselineCost,
            annualSavings: annualSavings,
            modifiedCost: modifiedCost,
            percentSavings: percentSavings
        }
    }
}




export interface KeyPerformanceIndicatorReport {
    kpiReportItems: Array<KeyPerformanceIndicatorReportItem>,
    total: {
        baselineCost: number,
        annualSavings: number,
        modifiedCost: number,
        percentSavings: number
    }
}

export interface KeyPerformanceIndicatorReportItem {
    keyPerformanceMetric: KeyPerformanceMetric,
    performanceMetricImpact: IdbKeyPerformanceMetricImpact
    // nebsImpacts: Array<{
    //     nebName: string,
    //     nebValue: NebOptionValue,
    //     performanceMetricImpact: PerformanceMetricImpact
    // }>
}