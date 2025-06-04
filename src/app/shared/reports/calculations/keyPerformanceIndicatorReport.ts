import { KeyPerformanceMetric } from "../../constants/keyPerformanceMetrics";
import * as _ from 'lodash';
import { NebReport } from "./nebReport";
import { IdbKeyPerformanceMetricImpact } from "src/app/models/keyPerformanceMetricImpact";
import { KeyPerformanceIndicatorValue } from "../../constants/keyPerformanceIndicatorOptions";
import { IdbKeyPerformanceIndicator } from "src/app/models/keyPerformanceIndicator";


export function getKeyPerformanceIndicatorReport(nebReports: Array<NebReport>): KeyPerformanceIndicatorReport {
    let kpmReportItems: Array<KeyPerformanceMetricReportItem> = new Array();
    nebReports.forEach(nebReport => {
        if (nebReport.nonEnergyBenefit.costImpactType == 'annual') {
            nebReport.reportPerformanceMetrics.forEach(reportKPM => {
                if (isNaN(reportKPM.performanceMetricImpact.costAdjustment)) {
                    reportKPM.performanceMetricImpact.costAdjustment = 0;
                }
                if (isNaN(reportKPM.keyPerformanceMetric.baselineCost)) {
                    reportKPM.keyPerformanceMetric.baselineCost = 0;
                }

                let itemExistIndex: number = kpmReportItems.findIndex(reportItem => {
                    if (reportItem.keyPerformanceMetric.isCustom == false) {
                        return reportItem.keyPerformanceMetric.value == reportKPM.keyPerformanceMetric.value;
                    } else {
                        return reportItem.keyPerformanceMetric.label == reportKPM.keyPerformanceMetric.label;
                    }
                });
                if (itemExistIndex != -1) {
                    if (reportKPM.performanceMetricImpact.costAdjustment) {
                        kpmReportItems[itemExistIndex].performanceMetricImpact.costAdjustment += reportKPM.performanceMetricImpact.costAdjustment;
                    }
                    if (reportKPM.performanceMetricImpact.modificationValue) {
                        kpmReportItems[itemExistIndex].performanceMetricImpact.modificationValue += reportKPM.performanceMetricImpact.modificationValue;
                    }
                    if (kpmReportItems[itemExistIndex].keyPerformanceMetric.baselineCost) {
                        kpmReportItems[itemExistIndex].performanceMetricImpact.percentSavings = (kpmReportItems[itemExistIndex].performanceMetricImpact.costAdjustment / kpmReportItems[itemExistIndex].keyPerformanceMetric.baselineCost) * 100;
                    } else if (kpmReportItems[itemExistIndex].keyPerformanceMetric.baselineValue && kpmReportItems[itemExistIndex].performanceMetricImpact.modificationValue) {
                        kpmReportItems[itemExistIndex].performanceMetricImpact.percentSavings = (kpmReportItems[itemExistIndex].performanceMetricImpact.modificationValue / kpmReportItems[itemExistIndex].keyPerformanceMetric.baselineValue) * 100;
                    }
                } else {
                    if (reportKPM.keyPerformanceMetric.isCustom) {

                    }
                    let percentSavings: number = 0;

                    if (reportKPM.keyPerformanceMetric.baselineCost) {
                        percentSavings = (reportKPM.performanceMetricImpact.costAdjustment / reportKPM.keyPerformanceMetric.baselineCost) * 100;
                    } else if (reportKPM.keyPerformanceMetric.baselineValue && reportKPM.performanceMetricImpact.modificationValue) {
                        percentSavings = (reportKPM.performanceMetricImpact.modificationValue / reportKPM.keyPerformanceMetric.baselineValue) * 100;
                    }

                    let modifiedCost: number;
                    if (reportKPM.keyPerformanceMetric.goalToIncrease) {
                        modifiedCost = reportKPM.keyPerformanceMetric.baselineCost + reportKPM.performanceMetricImpact.costAdjustment
                    } else {
                        modifiedCost = reportKPM.keyPerformanceMetric.baselineCost - reportKPM.performanceMetricImpact.costAdjustment
                    }


                    kpmReportItems.push({
                        keyPerformanceMetric: reportKPM.keyPerformanceMetric,
                        performanceMetricImpact: {
                            ...reportKPM.performanceMetricImpact,
                            percentSavings: percentSavings,
                            modifiedCost: modifiedCost
                        },
                        keyPerformanceIndicator: reportKPM.keyPerformanceIndicator,
                        // nebsImpacts: [{
                        //     nebName: string,
                        //     nebValue: NebOptionValue,
                        //     performanceMetricImpact: PerformanceMetricImpact
                        // }]

                    })
                }
            })
        }
    });

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
    let percentSavings: number = (annualSavings / baselineCost) * 100;

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
    let kpiGuids: Array<string> = kpmReportItems.map(item => {
        return item.keyPerformanceMetric.kpiGuid;
    });
    let kpis: Array<IdbKeyPerformanceIndicator> = kpmReportItems.map(item => {
        return item.keyPerformanceIndicator;
    });

    let uniqueGuids: Array<KeyPerformanceIndicatorValue> = _.uniq(kpiGuids);
    uniqueGuids.forEach(guid => {
        let kpi: IdbKeyPerformanceIndicator = kpis.find(kpi => kpi.guid == guid);
        let kpiReportsItems = kpmReportItems.filter(item => {
            return item.keyPerformanceMetric.kpiGuid == guid && item.keyPerformanceMetric.isQuantitative && !isNaN(item.keyPerformanceMetric.baselineCost) && !isNaN(item.performanceMetricImpact.costAdjustment);
        });
        let baselineCost: number = _.sumBy(kpiReportsItems, (item: KeyPerformanceMetricReportItem) => { return item.keyPerformanceMetric.baselineCost });
        let financialImpact: number = _.sumBy(kpiReportsItems, (item: KeyPerformanceMetricReportItem) => { return item.performanceMetricImpact.costAdjustment });
        let costSaving: number = _.sumBy(kpiReportsItems, (item: KeyPerformanceMetricReportItem) => {
            return item.keyPerformanceMetric.goalToIncrease == false ? item.performanceMetricImpact.costAdjustment : 0;
        });
        let revenue: number = _.sumBy(kpiReportsItems, (item: KeyPerformanceMetricReportItem) => {
            return item.keyPerformanceMetric.goalToIncrease == true ? item.performanceMetricImpact.costAdjustment : 0;
        });
        let modifiedCost: number = baselineCost - financialImpact;
        let percentSavings: number = (financialImpact / baselineCost) * 100;
        if (percentSavings == Infinity || percentSavings == -Infinity || isNaN(percentSavings)) {
            percentSavings = 0;
        }
        results.push({
            keyPerformanceIndicator: kpi,
            baselineCost: _.sumBy(kpiReportsItems, (item: KeyPerformanceMetricReportItem) => { return item.keyPerformanceMetric.baselineCost }),
            financialImpact: financialImpact,
            costSaving: costSaving,
            revenue: revenue,
            modifiedCost: modifiedCost,
            percentSavings: percentSavings
        })
    });
    return results;
}

export interface KeyPerformanceIndicatorReportItem {
    keyPerformanceIndicator: IdbKeyPerformanceIndicator,
    baselineCost: number,
    financialImpact: number,
    costSaving: number,
    revenue: number,
    modifiedCost: number,
    percentSavings: number
}

export interface AdditionalKeyPerformanceIndicatorReportItem {
    baselineCost: number,
    financialImpact: number,
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
    performanceMetricImpact: IdbKeyPerformanceMetricImpact,
    keyPerformanceIndicator: IdbKeyPerformanceIndicator,
    // nebsImpacts: Array<{
    //     nebName: string,
    //     nebValue: NebOptionValue,
    //     performanceMetricImpact: PerformanceMetricImpact
    // }>
}