import { getGUID } from "../helpFunctions";
import { KeyPerformanceIndicatorValue } from "./keyPerformanceIndicatorOptions";

export function getPerformanceMetrics(keyPerformanceIndicatorValue: KeyPerformanceIndicatorValue, kpiGuid: string): Array<KeyPerformanceMetric> {
    if (keyPerformanceIndicatorValue != 'other') {
        let filteredMetricOptions: Array<KeyPerformanceMetricOption> = KeyPerformanceMetricOptions.filter(metric => {
            return metric.kpiValue == keyPerformanceIndicatorValue;
        });
        return filteredMetricOptions.map(option => {
            return {
                ...option,
                baselineValue: undefined,
                costPerValue: undefined,
                baselineCost: undefined,
                isCustom: false,
                kpiGuid: kpiGuid,
                calculationMethod: option.calculationMethod ? option.calculationMethod : 'costPerUnit',
                guid: getGUID(),

            }
        })
    } else {
        let customKPM: KeyPerformanceMetric = getCustomKPM(keyPerformanceIndicatorValue, kpiGuid);
        return [customKPM]
    }
}

export function getCustomKPM(keyPerformanceIndicatorValue: KeyPerformanceIndicatorValue, kpiGuid: string): KeyPerformanceMetric {
    return {
        label: 'Custom KPM',
        htmlLabel: 'Custom KPM',
        value: 'custom',
        kpiValue: keyPerformanceIndicatorValue,
        isQuantitative: true,
        baselineValue: undefined,
        costPerValue: undefined,
        totalUnit: 'unit',
        baselineCost: undefined,
        isCustom: true,
        kpiGuid: kpiGuid,
        guid: getGUID(),
        calculationMethod: 'costPerUnit',
        goalToIncrease: true,
        timePeriod: 'yr'
    }

}

export type KeyPerformanceMetricValue =
    'contributeCompanyVision' |
    'salesGrowth' |
    'customerSatisfactionRatings' |
    'customerChurnRate' |
    'supplierSatisfactionRatings' |
    'lostCustomerSales' |
    'productionCosts' |
    'cycleTimeToMakeGoods' |
    'percentOnTimeToDueDate' |
    'revenuePerEmployee' |
    'perUnitProductCost' |
    'workInProcess' |
    'numberEquipmentCausedDefects' |
    'equipmentDowntime' |
    'percentCapacityUtilization' |
    'overallEquipmentEffectiveness' |
    'forkTruckBreakdownTime' |
    'usefulEquipmentLifeExtended' |
    'timeToIntroduceNewProducts' |
    'defectiveProductionDollar' |
    'defectRatePPMorDPM' |
    'qualityCustomerComplaints' |
    'qualityCustomerReturns' |
    'percentProductionYield' |
    'percentShrinkage' |
    'dollarConsumables' |
    'percentOptimizedSpace' |
    'maintenanceCost' |
    'engineeringSupport' |
    'energyCostPerUnit' |
    'hazardousDisposalCosts' |
    'nonHazardousDisposalCosts' |
    'percentTotalOrCost' |
    'consumptionCostWater' |
    'sewageVolume' |
    'percentOrTotalRefrigerantEmissions' |
    'TRIR' |
    'oshaRecordableIncidents' |
    'oshaNonRecordables' |
    'daysAwayFromWork' |
    'lostTimeInjuryRate' |
    'hearingConservationProgram' |
    'numberOfParticles' |
    'workspaceOrFactoryFloorComfort' |
    'absenteeism' |
    'employeeEngagementSatisfaction' |
    'employeeRetentionRate' |
    'talentTurnoverRate' |
    'totalLbsDust' |
    'laborCosts' |
    'thirdPartyLabor' |
    'serviceParts' |
    'treatmentChemicals' |
    'rawMaterials' |
    'intermediateGoods' |
    'custom' |
    'stationaryFuelEmissions' |
    'purchasedEnergyEmissions' |
    'valueChainEmissions' |
    'percentTestsMeetingStandardsAirPollutants' |
    'noxSoxCoEmissions' |
    'particulateEmissions' |
    'waterPolutantEmissions' |
    'sewageCosts' | 
    'regulatoryFeesWater' | 
    'regulatoryFeesWaste' | 
    'directLaborCosts' | 
    'emergencyEquipmentDowntime' |
    'electricalDemandCosts' |
    'powerFactorCosts' |
    'mobileFuelEmissions'|
    'processEmissions';


export type KpmCalculationMethod = 'costPerUnit' | 'percentTotal' | 'directCost';

export interface KeyPerformanceMetric extends KeyPerformanceMetricOption {
    baselineValue: number,
    costPerValue: number,
    baselineCost: number,
    isCustom: boolean,
    kpiGuid: string,
    guid: string,
}


export interface KeyPerformanceMetricOption {
    label: string,
    htmlLabel: string,
    value: KeyPerformanceMetricValue,
    kpiValue: KeyPerformanceIndicatorValue,
    isQuantitative: boolean,
    totalUnit?: string,
    goalToIncrease: boolean,
    timePeriod: string,
    calculationMethod?: KpmCalculationMethod
};


export function convertOptionTypeToMetricType(option: KeyPerformanceMetricOption): KeyPerformanceMetric {
    return {
        ...option,
        baselineValue: undefined,
        costPerValue: undefined,
        baselineCost: undefined,
        isCustom: false,
        kpiGuid: undefined,
        guid: undefined,
        calculationMethod: option.calculationMethod ? option.calculationMethod : 'directCost',
        goalToIncrease: true
    }
}


export const KeyPerformanceMetricOptions: Array<KeyPerformanceMetricOption> = [
    {
        label: "Contribution to company's vision or strategy",
        htmlLabel: "Contribution to company's vision or strategy",
        value: "contributeCompanyVision",
        kpiValue: "customerSatisfaction",
        isQuantitative: false,
        goalToIncrease: true,
        timePeriod: 'yr',
        calculationMethod: 'directCost'
    },
    {
        label: "Sales growth ($)",
        htmlLabel: "Sales growth (&dollar;)",
        value: "salesGrowth",
        kpiValue: "salesGrowth",
        isQuantitative: true,
        goalToIncrease: true,
        timePeriod: 'yr',
        totalUnit: '$',
        calculationMethod: 'percentTotal'
    },
    {
        label: "Customer Satisfaction Ratings",
        htmlLabel: "Customer Satisfaction Ratings",
        value: "customerSatisfactionRatings",
        kpiValue: "customerSatisfaction",
        isQuantitative: false,
        goalToIncrease: true,
        timePeriod: 'yr'
    },
    {
        label: "Lost Customer Sales ($)",
        htmlLabel: "Lost Customer Sales (&dollar;)",
        value: "lostCustomerSales",
        kpiValue: "customerSatisfaction",
        isQuantitative: true,
        goalToIncrease: false,
        timePeriod: 'yr',
        calculationMethod: 'directCost',
        totalUnit: '$'
    },
    {
        label: "Customer Churn Rate",
        htmlLabel: "Customer Churn Rate",
        value: "customerChurnRate",
        kpiValue: "customerSatisfaction",
        isQuantitative: false,
        goalToIncrease: true,
        timePeriod: 'yr'
    },
    {
        label: "Supplier Satisfaction Ratings",
        htmlLabel: "Supplier Satisfaction Ratings",
        value: "supplierSatisfactionRatings",
        kpiValue: "customerSatisfaction",
        isQuantitative: false,
        goalToIncrease: true,
        timePeriod: 'yr'
    },
    {
        label: "Production Costs (Throughput)",
        htmlLabel: "Production Costs (Throughput)",
        value: "productionCosts",
        kpiValue: "productivity",
        isQuantitative: true,
        goalToIncrease: false,
        timePeriod: 'yr',
        totalUnit: '$',
        calculationMethod: 'directCost'

    },
    {
        label: "Cycle Time - Time to make goods",
        htmlLabel: "Cycle Time - Time to make goods",
        value: "cycleTimeToMakeGoods",
        kpiValue: "productivity",
        isQuantitative: true,
        goalToIncrease: false,
        timePeriod: 'yr',
        calculationMethod: 'percentTotal'
    },
    {
        label: "Percent On time to due date",
        htmlLabel: "&#37; On time to due date",
        value: "percentOnTimeToDueDate",
        kpiValue: "productivity",
        isQuantitative: true,
        goalToIncrease: true,
        timePeriod: 'yr',
        calculationMethod: 'percentTotal'
    },
    {
        label: "Revenue ($) / employee",
        htmlLabel: "Revenue (&dollar;) / employee",
        value: "revenuePerEmployee",
        kpiValue: "productivity",
        isQuantitative: true,
        goalToIncrease: true,
        timePeriod: 'yr',
        calculationMethod: 'percentTotal'
    },
    {
        label: "Per-unit product cost",
        htmlLabel: "Per-unit product cost",
        value: "perUnitProductCost",
        kpiValue: "productivity",
        isQuantitative: false,
        goalToIncrease: false,
        timePeriod: 'yr',
        calculationMethod: 'percentTotal'
    },
    {
        label: "Work in process",
        htmlLabel: "Work in process",
        value: "workInProcess",
        kpiValue: "productivity",
        isQuantitative: false,
        goalToIncrease: false,
        timePeriod: 'yr',
        calculationMethod: 'directCost'
    },
    {
        label: "Num. Equipment caused defects",
        htmlLabel: "&num; Equipment caused defects",
        value: "numberEquipmentCausedDefects",
        kpiValue: "machineUtilization",
        isQuantitative: true,
        totalUnit: 'defect',
        goalToIncrease: false,
        timePeriod: 'yr',
        calculationMethod: 'costPerUnit'
    },
    {
        label: "Equipment Downtime",
        htmlLabel: "Equipment Downtime",
        value: "equipmentDowntime",
        kpiValue: "machineUtilization",
        isQuantitative: true,
        totalUnit: 'hr',
        goalToIncrease: false,
        timePeriod: 'yr',
        calculationMethod: 'costPerUnit'
    },
    {
        label: "Percent Capacity utilization",
        htmlLabel: "&#37; Capacity utilization",
        value: "percentCapacityUtilization",
        kpiValue: "machineUtilization",
        isQuantitative: true,
        goalToIncrease: true,
        timePeriod: 'yr',
        calculationMethod: 'percentTotal',
    },
    {
        label: "Overall Equipment Effectiveness (OEE)",
        htmlLabel: "Overall Equipment Effectiveness (OEE)",
        value: "overallEquipmentEffectiveness",
        kpiValue: "machineUtilization",
        isQuantitative: true,
        goalToIncrease: true,
        timePeriod: 'yr',
        calculationMethod: 'percentTotal'

    },
    {
        label: "Fork truck (industrial trucks) breakdown downtime time",
        htmlLabel: "Fork truck (industrial trucks) breakdown downtime time",
        value: "forkTruckBreakdownTime",
        kpiValue: "machineUtilization",
        isQuantitative: true,
        totalUnit: 'hr',
        goalToIncrease: false,
        timePeriod: 'yr',
        calculationMethod: 'costPerUnit'
    },
    {
        label: "Useful equipment life extended (yrs)",
        htmlLabel: "Useful equipment life extended (yrs)",
        value: "usefulEquipmentLifeExtended",
        kpiValue: "machineUtilization",
        isQuantitative: true,
        goalToIncrease: true,
        timePeriod: 'yr',
        calculationMethod: 'directCost'
    },
    {
        label: "Time to introduce new products or services",
        htmlLabel: "Time to introduce new products or services",
        value: "timeToIntroduceNewProducts",
        kpiValue: "machineUtilization",
        isQuantitative: true,
        goalToIncrease: true,
        timePeriod: 'yr',
        calculationMethod: 'percentTotal'
    },
    {
        label: "($) Defective Production",
        htmlLabel: "(&dollar;) Defective Production",
        value: "defectiveProductionDollar",
        kpiValue: "quality",
        isQuantitative: true,
        totalUnit: 'product',
        goalToIncrease: false,
        timePeriod: 'yr',
        calculationMethod: 'directCost'
    },
    {
        label: "Defect Rate-PPM or DPM",
        htmlLabel: "Defect Rate-PPM or DPM",
        value: "defectRatePPMorDPM",
        kpiValue: "quality",
        isQuantitative: true,
        totalUnit: 'product',
        goalToIncrease: false,
        timePeriod: 'yr',
        calculationMethod: 'percentTotal'
    },
    {
        label: "QTY Customer Complaints (quality)",
        htmlLabel: "QTY Customer Complaints (quality)",
        value: "qualityCustomerComplaints",
        kpiValue: "quality",
        isQuantitative: false,
        goalToIncrease: true,
        timePeriod: 'yr'
    },
    {
        label: "$ Customer Returns (quality)",
        htmlLabel: "&#36; Customer Returns (quality)",
        value: "qualityCustomerReturns",
        kpiValue: "quality",
        isQuantitative: true,
        totalUnit: 'return',
        goalToIncrease: false,
        timePeriod: 'yr',
        calculationMethod: 'costPerUnit'
    },
    {
        label: "Percent Production (manufacturing) yield",
        htmlLabel: "&#37; Production (manufacturing) yield",
        value: "percentProductionYield",
        kpiValue: "materialUtilization",
        isQuantitative: true,
        goalToIncrease: true,
        timePeriod: 'yr',
        calculationMethod: 'percentTotal'
    },
    {
        label: "Percent Shrinkage",
        htmlLabel: "&#37; Shrinkage",
        value: "percentShrinkage",
        kpiValue: "materialUtilization",
        isQuantitative: true,
        goalToIncrease: false,
        timePeriod: 'yr',
        calculationMethod: 'percentTotal'
    },
    {
        label: "Dollar Consumables",
        htmlLabel: "&#36; Consumables",
        value: "dollarConsumables",
        kpiValue: "materialUtilization",
        isQuantitative: true,
        totalUnit: 'consumable',
        goalToIncrease: false,
        timePeriod: 'yr',
        calculationMethod: 'directCost'
    },
    {
        label: "Space Utilization",
        htmlLabel: "Space Utilization",
        value: "percentOptimizedSpace",
        kpiValue: "reduceExpenseCost",
        isQuantitative: true,
        totalUnit: 'ft2',
        goalToIncrease: true,
        timePeriod: 'yr',
        calculationMethod: 'percentTotal'
    },
    {
        label: "Maintenance Cost",
        htmlLabel: "Maintenance Cost",
        value: "maintenanceCost",
        kpiValue: "maintenanceExpense",
        isQuantitative: true,
        totalUnit: 'hr',
        goalToIncrease: false,
        timePeriod: 'yr',
        calculationMethod: 'costPerUnit'
    },
    {
        label: "Engineering support (dollars or hours)",
        htmlLabel: "Engineering support (&#36; or hours)",
        value: "engineeringSupport",
        kpiValue: "maintenanceExpense",
        isQuantitative: true,
        totalUnit: 'hr',
        goalToIncrease: false,
        timePeriod: 'yr',
        calculationMethod: 'costPerUnit'
    },
    // {
    //     label: "Energy Cost per Unit",
    //     htmlLabel: "Energy Cost per Unit",
    //     value: "energyCostPerUnit",
    //     kpiValue: "energyCost",
    //     isQuantitative: true,
    //     totalUnit: 'MMBtu',
    //     goalToIncrease: true,
    //     timePeriod: 'yr'
    // },
    {
        label: "Hazardous Disposal Costs",
        htmlLabel: "Hazardous Disposal Costs",
        value: "hazardousDisposalCosts",
        kpiValue: "waste",
        isQuantitative: true,
        totalUnit: 'gal',
        goalToIncrease: false,
        timePeriod: 'yr',
        calculationMethod: 'percentTotal'
    },
    {
        label: "Non-Hazardous Disposal Costs",
        htmlLabel: "Non-Hazardous Disposal Costs",
        value: "nonHazardousDisposalCosts",
        kpiValue: "waste",
        isQuantitative: true,
        totalUnit: 'gal',
        goalToIncrease: false,
        timePeriod: 'yr',
        calculationMethod: 'percentTotal'
    },
    {
        label: "Percent Total or Costs",
        htmlLabel: "&#37; Total or Costs",
        value: "percentTotalOrCost",
        kpiValue: "waste",
        isQuantitative: true,
        goalToIncrease: false,
        timePeriod: 'yr',
        calculationMethod: 'percentTotal'
    },
    {
        label: "Consumption Cost",
        htmlLabel: "Consumption Cost",
        value: "consumptionCostWater",
        kpiValue: "waterConsumption",
        isQuantitative: true,
        totalUnit: 'gal',
        goalToIncrease: false,
        timePeriod: 'yr',
        calculationMethod: 'directCost'
    },
    {
        label: "Sewage Volume",
        htmlLabel: "Sewage Volume",
        value: "sewageVolume",
        kpiValue: "waterConsumption",
        isQuantitative: true,
        totalUnit: 'gal',
        goalToIncrease: false,
        timePeriod: 'yr',
        calculationMethod: 'directCost'
    },
    {
        label: "Dust Emissions",
        htmlLabel: "Dust Emissions",
        value: "totalLbsDust",
        kpiValue: "airEnvironmentalQuality",
        isQuantitative: true,
        totalUnit: 'lb',
        goalToIncrease: false,
        timePeriod: 'yr',
        calculationMethod: 'percentTotal'
    },
    {
        label: "Stationary Fuel Emissions",
        htmlLabel: "Stationary Fuel Emissions",
        value: "stationaryFuelEmissions",
        kpiValue: "airEnvironmentalQuality",
        isQuantitative: true,
        goalToIncrease: false,
        totalUnit: 'tonne CO2e',
        timePeriod: 'yr',
        calculationMethod: 'costPerUnit'
    },
    {
        label: "Purchased Energy Emissions",
        htmlLabel: "Purchased Energy Emissions",
        value: "purchasedEnergyEmissions",
        kpiValue: "airEnvironmentalQuality",
        totalUnit: 'tonne CO2e',
        isQuantitative: true,
        goalToIncrease: false,
        timePeriod: 'yr',
        calculationMethod: 'costPerUnit'
    },
    {
        label: "Value Chain Emissions",
        htmlLabel: "Value Chain Emissions",
        value: "valueChainEmissions",
        kpiValue: "airEnvironmentalQuality",
        totalUnit: 'tonne CO2e',
        isQuantitative: true,
        goalToIncrease: false,
        timePeriod: 'yr',
        calculationMethod: 'costPerUnit'
    },
    {
        label: "Particulate Emissions",
        htmlLabel: "Particulate Emissions",
        value: "particulateEmissions",
        kpiValue: "airEnvironmentalQuality",
        isQuantitative: true,
        goalToIncrease: false,
        timePeriod: 'yr',
        calculationMethod: 'percentTotal'
    },
    {
        label: "NOx, SOx, CO Emissions",
        htmlLabel: "NOx, SOx, CO Emissions",
        value: "noxSoxCoEmissions",
        kpiValue: "airEnvironmentalQuality",
        isQuantitative: true,
        goalToIncrease: false,
        timePeriod: 'yr',
        calculationMethod: 'percentTotal'
    },
    {
        label: "Percent of tests that meet regulatory standards",
        htmlLabel: "Percent of tests that meet regulatory standards",
        value: "percentTestsMeetingStandardsAirPollutants",
        kpiValue: "airEnvironmentalQuality",
        isQuantitative: true,
        goalToIncrease: false,
        timePeriod: 'yr',
        calculationMethod: 'percentTotal'
    },
    {
        label: "Water Polutant Emissions",
        htmlLabel: "Water Polutant Emissions",
        value: "waterPolutantEmissions",
        kpiValue: "waterConsumption",
        isQuantitative: true,
        goalToIncrease: false,
        timePeriod: 'yr',
        calculationMethod: 'percentTotal'
    },
    {
        label: "Refrigerant Emissions",
        htmlLabel: "Refrigerant Emissions",
        value: "percentOrTotalRefrigerantEmissions",
        kpiValue: "airEnvironmentalQuality",
        isQuantitative: true,
        goalToIncrease: false,
        timePeriod: 'yr',
        calculationMethod: 'percentTotal'
    },
    {
        label: "(OSHA) Total recordable incident rate (TRIR)",
        htmlLabel: "(OSHA) Total recordable incident rate (TRIR)",
        value: "TRIR",
        kpiValue: "safety",
        isQuantitative: true,
        goalToIncrease: false,
        totalUnit: 'incident',
        timePeriod: 'yr',
        calculationMethod: 'costPerUnit'
    },
    {
        label: "OSHA Recordable Incidents",
        htmlLabel: "OSHA Recordable Incidents",
        value: "oshaRecordableIncidents",
        kpiValue: "safety",
        isQuantitative: true,
        totalUnit: 'incident',
        goalToIncrease: false,
        timePeriod: 'yr',
        calculationMethod: 'costPerUnit'
    },
    {
        label: "Total Safety Non-Recordables, Incidents, Near Misses",
        htmlLabel: "Total Safety Non-Recordables, Incidents, Near Misses",
        value: "oshaNonRecordables",
        kpiValue: "safety",
        isQuantitative: true,
        totalUnit: 'incident',
        goalToIncrease: false,
        timePeriod: 'yr',
        calculationMethod: 'costPerUnit'
    },
    {
        label: "Days away from work",
        htmlLabel: "Days away from work",
        value: "daysAwayFromWork",
        kpiValue: "safety",
        isQuantitative: true,
        totalUnit: 'day',
        goalToIncrease: false,
        timePeriod: 'yr',
        calculationMethod: 'costPerUnit'
    },
    {
        label: "Lost time inury rate (LTIFR)",
        htmlLabel: "Lost time injury rate (LTIFR)",
        value: "lostTimeInjuryRate",
        kpiValue: "safety",
        isQuantitative: true,
        totalUnit: 'day',
        goalToIncrease: false,
        timePeriod: 'yr',
        calculationMethod: 'costPerUnit'
    },
    {
        label: "Hearing Conservation Program Compliance - Reduce Occupational Exposure",
        htmlLabel: "Hearing Conservation Program Compliance - Reduce Occupational Exposure",
        value: "hearingConservationProgram",
        kpiValue: "safety",
        isQuantitative: true,
        goalToIncrease: false,
        timePeriod: 'yr',
        calculationMethod: 'directCost'
    },
    {
        label: "Hearing Conservation Program Compliance - Reduce Occupational Exposure",
        htmlLabel: "Hearing Conservation Program Compliance - Reduce Occupational Exposure",
        value: "hearingConservationProgram",
        kpiValue: "employeeEngagementWorkingEnvironment",
        isQuantitative: true,
        goalToIncrease: false,
        timePeriod: 'yr',
        calculationMethod: 'directCost'
    },
    {
        label: "Number of particles",
        htmlLabel: "Number of particles",
        value: "numberOfParticles",
        kpiValue: "airEnvironmentalQuality",
        isQuantitative: false,
        goalToIncrease: false,
        timePeriod: 'yr',
        calculationMethod: 'percentTotal'
    },
    {
        label: "Workspace or factory floor comfort",
        htmlLabel: "Workspace or factory floor comfort",
        value: "workspaceOrFactoryFloorComfort",
        kpiValue: "employeeEngagementWorkingEnvironment",
        isQuantitative: false,
        goalToIncrease: true,
        timePeriod: 'yr'
    },
    {
        label: "Absenteeism",
        htmlLabel: "Absenteeism",
        value: "absenteeism",
        kpiValue: "employeeEngagementWorkingEnvironment",
        isQuantitative: true,
        goalToIncrease: false,
        timePeriod: 'yr',
        totalUnit: 'days',
        calculationMethod: 'costPerUnit'
    },
    {
        label: "Employee Engagement/Satisfaction",
        htmlLabel: "Employee Engagement/Satisfaction",
        value: "employeeEngagementSatisfaction",
        kpiValue: "employeeEngagementWorkforceDevelopment",
        isQuantitative: true,
        goalToIncrease: true,
        timePeriod: 'yr',
        calculationMethod: 'directCost'
    },
    {
        label: "Employee Retention Rate",
        htmlLabel: "Employee Retention Rate",
        value: "employeeRetentionRate",
        kpiValue: "employeeEngagementWorkforceDevelopment",
        isQuantitative: true,
        goalToIncrease: true,
        timePeriod: 'yr',
        calculationMethod: 'directCost'
    },
    {
        label: "Talent Turnover Rate",
        htmlLabel: "Talent Turnover Rate",
        value: "talentTurnoverRate",
        kpiValue: "employeeEngagementWorkforceDevelopment",
        isQuantitative: true,
        goalToIncrease: false,
        timePeriod: 'yr',
        calculationMethod: 'directCost'
    },
    {
        label: "Maintenance Labor Costs",
        htmlLabel: "Maintenance Labor Costs",
        value: "laborCosts",
        kpiValue: "maintenanceExpense",
        isQuantitative: true,
        totalUnit: 'hr',
        goalToIncrease: false,
        timePeriod: 'yr',
        calculationMethod: 'costPerUnit'
    },
    {
        label: "3rd Party Labor",
        htmlLabel: "3rd Party Labor",
        value: "thirdPartyLabor",
        kpiValue: "maintenanceExpense",
        isQuantitative: true,
        totalUnit: 'hr',
        goalToIncrease: false,
        timePeriod: 'yr',
        calculationMethod: 'costPerUnit'
    },
    {
        label: "Service Parts",
        htmlLabel: "Service Parts",
        value: "serviceParts",
        kpiValue: "maintenanceExpense",
        isQuantitative: true,
        totalUnit: 'parts',
        goalToIncrease: false,
        timePeriod: 'yr',
        calculationMethod: 'costPerUnit'
    },
    {
        label: "Treatment Chemicals",
        htmlLabel: "Treatment Chemicals",
        value: "treatmentChemicals",
        kpiValue: "reduceExpenseCost",
        isQuantitative: true,
        totalUnit: '',
        goalToIncrease: false,
        timePeriod: 'yr',
        calculationMethod: 'directCost'
    },
    {
        label: "Raw Materials",
        htmlLabel: "Raw Materials",
        value: "rawMaterials",
        kpiValue: "reduceExpenseCost",
        isQuantitative: true,
        totalUnit: '',
        goalToIncrease: false,
        timePeriod: 'yr',
        calculationMethod: 'directCost'
    },
    {
        label: "Intermediate Goods",
        htmlLabel: "Intermediate Goods",
        value: "intermediateGoods",
        kpiValue: "reduceExpenseCost",
        isQuantitative: true,
        totalUnit: '',
        goalToIncrease: false,
        timePeriod: 'yr',
        calculationMethod: 'directCost'
    },
    {
        label: "Reduce Regulatory Fees",
        htmlLabel: "Reduce Regulatory Fees",
        value: "regulatoryFeesWater",
        kpiValue: "waterConsumption",
        isQuantitative: true,
        totalUnit: '',
        goalToIncrease: false,
        timePeriod: 'yr',
        calculationMethod: 'directCost'
    },
    {
        label: "Reduce Regulatory Fees",
        htmlLabel: "Reduce Regulatory Fees",
        value: "regulatoryFeesWaste",
        kpiValue: "waste",
        isQuantitative: true,
        totalUnit: '',
        goalToIncrease: false,
        timePeriod: 'yr',
        calculationMethod: 'directCost'
    },
    {
        label: "Direct Labor Costs",
        htmlLabel: "Direct Labor Costs",
        value: "directLaborCosts",
        kpiValue: "productivity",
        isQuantitative: true,
        totalUnit: '',
        goalToIncrease: false,
        timePeriod: 'yr',
        calculationMethod: 'directCost'
    },
    {
        label: "Emergency Equipment Downtime",
        htmlLabel: "Emergency Equipment Downtime",
        value: "emergencyEquipmentDowntime",
        kpiValue: "maintenanceExpense",
        isQuantitative: true,
        totalUnit: '',
        goalToIncrease: false,
        timePeriod: 'yr',
        calculationMethod: 'directCost'
    },
    {
        label: "Electrical Demand Costs",
        htmlLabel: "Electrical Demand Costs",
        value: "electricalDemandCosts",
        kpiValue: "reduceExpenseCost",
        isQuantitative: true,
        totalUnit: '',
        goalToIncrease: false,
        timePeriod: 'yr',
        calculationMethod: 'directCost'
    },
    {
        label: "Power Factor Costs",
        htmlLabel: "Power Factor Costs",
        value: "powerFactorCosts",
        kpiValue: "reduceExpenseCost",
        isQuantitative: true,
        totalUnit: '',
        goalToIncrease: false,
        timePeriod: 'yr',
        calculationMethod: 'directCost'
    },
    {
        label: "Mobile Fuel Emissions",
        htmlLabel: "Mobile Fuel Emissions",
        value: "mobileFuelEmissions",
        kpiValue: "airEnvironmentalQuality",
        isQuantitative: true,
        totalUnit: 'tonne CO2e',
        goalToIncrease: false,
        timePeriod: 'yr',
        calculationMethod: 'directCost'
    },
    {
        label: "Process Emissions",
        htmlLabel: "Process Emissions",
        value: "processEmissions",
        kpiValue: "airEnvironmentalQuality",
        isQuantitative: true,
        totalUnit: 'tonne CO2e',
        goalToIncrease: false,
        timePeriod: 'yr',
        calculationMethod: 'directCost'
    }
]