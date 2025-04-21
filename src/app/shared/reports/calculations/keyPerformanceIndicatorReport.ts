import { KeyPerformanceMetric } from "../../constants/keyPerformanceMetrics";
import * as _ from 'lodash';
import { NebReport } from "./nebReport";
import { IdbKeyPerformanceMetricImpact } from "src/app/models/keyPerformanceMetricImpact";
import { KeyPerformanceIndicatorValue } from "../../constants/keyPerformanceIndicatorOptions";


export function getKeyPerfomanceIndicatorReport(nebReports: Array<NebReport>): KeyPerformanceIndicatorReport {
    let kpmReportItems: Array<KeyPerformanceMetricReportItem> = new Array();
    nebReports.forEach(nebReport => {
        nebReport.reportPerformanceMetrics.forEach(performanceMetric => {
            if (isNaN(performanceMetric.performanceMetricImpact.costAdjustment)) {
                performanceMetric.performanceMetricImpact.costAdjustment = 0;
            }
            if (isNaN(performanceMetric.keyPerformanceMetric.baselineCost)) {
                performanceMetric.keyPerformanceMetric.baselineCost = 0;
            }

            let itemExistIndex: number = kpmReportItems.findIndex(reportItem => {
                if (reportItem.keyPerformanceMetric.isCustom == false) {
                    return reportItem.keyPerformanceMetric.value == performanceMetric.keyPerformanceMetric.value;
                } else {
                    return reportItem.keyPerformanceMetric.label == performanceMetric.keyPerformanceMetric.label;
                }
            });
            if (itemExistIndex != -1) {
                if (performanceMetric.performanceMetricImpact.costAdjustment) {
                    kpmReportItems[itemExistIndex].performanceMetricImpact.costAdjustment += performanceMetric.performanceMetricImpact.costAdjustment;
                }
                if (performanceMetric.performanceMetricImpact.modificationValue) {
                    kpmReportItems[itemExistIndex].performanceMetricImpact.modificationValue += performanceMetric.performanceMetricImpact.modificationValue;
                }
                if (kpmReportItems[itemExistIndex].keyPerformanceMetric.baselineCost) {
                    kpmReportItems[itemExistIndex].performanceMetricImpact.percentSavings = (kpmReportItems[itemExistIndex].performanceMetricImpact.costAdjustment / kpmReportItems[itemExistIndex].keyPerformanceMetric.baselineCost) * 100;
                } else if (kpmReportItems[itemExistIndex].keyPerformanceMetric.baselineValue && kpmReportItems[itemExistIndex].performanceMetricImpact.modificationValue) {
                    kpmReportItems[itemExistIndex].performanceMetricImpact.percentSavings = (kpmReportItems[itemExistIndex].performanceMetricImpact.modificationValue / kpmReportItems[itemExistIndex].keyPerformanceMetric.baselineValue) * 100;
                }
            } else {
                if (performanceMetric.keyPerformanceMetric.isCustom) {

                }
                let percentSavings: number = 0;

                if (performanceMetric.keyPerformanceMetric.baselineCost) {
                    percentSavings = (performanceMetric.performanceMetricImpact.costAdjustment / performanceMetric.keyPerformanceMetric.baselineCost) * 100;
                } else if (performanceMetric.keyPerformanceMetric.baselineValue && performanceMetric.performanceMetricImpact.modificationValue) {
                    percentSavings = (performanceMetric.performanceMetricImpact.modificationValue / performanceMetric.keyPerformanceMetric.baselineValue) * 100;
                }

                let modifiedCost: number;
                if(performanceMetric.keyPerformanceMetric.goalToIncrease){
                    modifiedCost = performanceMetric.keyPerformanceMetric.baselineCost + performanceMetric.performanceMetricImpact.costAdjustment
                }else{
                    modifiedCost = performanceMetric.keyPerformanceMetric.baselineCost - performanceMetric.performanceMetricImpact.costAdjustment
                }


                kpmReportItems.push({
                    keyPerformanceMetric: performanceMetric.keyPerformanceMetric,
                    performanceMetricImpact: {
                        ...performanceMetric.performanceMetricImpact,
                        percentSavings: percentSavings,
                        modifiedCost: modifiedCost
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

    let baselineCost: number = _.sumBy(kpmReportItems, (reportItem: KeyPerformanceMetricReportItem) => {
        if (reportItem.keyPerformanceMetric.isQuantitative && reportItem.keyPerformanceMetric.baselineCost) {
            return reportItem.keyPerformanceMetric.baselineCost;
        }
        return 0
    });
    let annualSavings: number = _.sumBy(kpmReportItems, (reportItem: KeyPerformanceMetricReportItem) => {
        if (reportItem.keyPerformanceMetric.isQuantitative && reportItem.performanceMetricImpact.costAdjustment) {
            return reportItem.performanceMetricImpact.costAdjustment;
        }
        return 0
    });
    let modifiedCost: number = baselineCost - annualSavings;
    let percentSavings: number = (annualSavings / baselineCost) * 100
    return {
        kpmReportItems: kpmReportItems,
        kpiReportItems: getKeyPerformanceIndicatorReportItems(kpmReportItems),
        total: {
            baselineCost: baselineCost,
            annualSavings: annualSavings,
            modifiedCost: modifiedCost,
            percentSavings: percentSavings
        }
    }
}

export function getKeyPerformanceIndicatorReportItems(kpmReportItems: Array<KeyPerformanceMetricReportItem>): Array<KeyPerformanceIndicatorReportItem> {
    let results: Array<KeyPerformanceIndicatorReportItem> = new Array();
    let kpiValues: Array<KeyPerformanceIndicatorValue> = kpmReportItems.map(item => {
        return item.keyPerformanceMetric.kpiValue;
    });
    let uniqValues: Array<KeyPerformanceIndicatorValue> = _.uniq(kpiValues);
    uniqValues.forEach(kpiValue => {
        let kpiReportsItems = kpmReportItems.filter(item => {
            return item.keyPerformanceMetric.kpiValue == kpiValue && item.keyPerformanceMetric.isQuantitative && !isNaN(item.keyPerformanceMetric.baselineCost) && !isNaN(item.performanceMetricImpact.costAdjustment);
        });

        let baselineCost: number = _.sumBy(kpiReportsItems, (item: KeyPerformanceMetricReportItem) => { return item.keyPerformanceMetric.baselineCost });
        let annualCostSavings: number = _.sumBy(kpiReportsItems, (item: KeyPerformanceMetricReportItem) => { return item.performanceMetricImpact.costAdjustment });
        let modifiedCost: number = baselineCost - annualCostSavings;
        let percentSavings: number = (annualCostSavings / baselineCost) * 100;
        if (percentSavings == Infinity || percentSavings == -Infinity || isNaN(percentSavings)) {
            percentSavings = 0;
        }
        results.push({
            kpiValue: kpiValue,
            baselineCost: _.sumBy(kpiReportsItems, (item: KeyPerformanceMetricReportItem) => { return item.keyPerformanceMetric.baselineCost }),
            annualCostSavings: annualCostSavings,
            modifiedCost: modifiedCost,
            percentSavings: percentSavings
        })
    });
    return results;
}

export interface KeyPerformanceIndicatorReportItem {
    kpiValue: KeyPerformanceIndicatorValue,
    baselineCost: number,
    annualCostSavings: number,
    modifiedCost: number,
    percentSavings: number
}


export interface KeyPerformanceIndicatorReport {
    kpmReportItems: Array<KeyPerformanceMetricReportItem>,
    kpiReportItems: Array<KeyPerformanceIndicatorReportItem>,
    total: {
        baselineCost: number,
        annualSavings: number,
        modifiedCost: number,
        percentSavings: number
    }
}

export interface KeyPerformanceMetricReportItem {
    keyPerformanceMetric: KeyPerformanceMetric,
    performanceMetricImpact: IdbKeyPerformanceMetricImpact
    // nebsImpacts: Array<{
    //     nebName: string,
    //     nebValue: NebOptionValue,
    //     performanceMetricImpact: PerformanceMetricImpact
    // }>
}