import { KeyPerformanceMetricValue } from "./keyPerformanceMetrics"

export interface NebOption {
    label: string,
    htmlLabel: string,
    optionValue: NebOptionValue,
    isQualitative: boolean,
    howToCalculate: string,
    KPM: Array<KeyPerformanceMetricValue>,
    selected?: boolean,
    selectedKPM?: Array<string> // store KeyPerformanceMetricValue or KPM_KPI
};

export type NebOptionValue = 'improvedImageOrReputation' |
    'improvedStakeholderRelationship' |
    'newCustomers' |
    'increasedCustomerSatisfaction' |
    'reduceCustomerLossThroughBetterPerformance' |
    'increasedCustomerLoyalty' |
    'improvedSupplyChainRelationships' |
    'increasedProductivity' |
    'shorterCycleTime' |
    'increaseEquipmentUptime' |
    'reduceIndustrialTrucksDowntime' |
    'delayReplacementEquipment' |
    'increaseProdScheduleFlexibility' |
    'improvedProductQualityMachineSource' |
    'improvedProductQualityOperatorSource' |
    'improvedProductQualityDebrisContamination' |
    'reduceProductionLossLaborMaterial' |
    'reducedRawMaterialLoss' |
    'reducedConsumables' |
    'additionalSpaceFromLayoutChanges' |
    'reducedLaborServiceAgreementAndOtherExpenses' |
    'reducedWearAndTear' |
    'reducedLaborCostsForProblemSolvingAndRepair' |
    'reduceHazardousWaste' |
    'reduceNonhazardousWaste' |
    'reduceProductWaste' |
    'reduceWaterConsumption' |
    'reduceSewageVolume' |
    'reduceDustEmissions' |
    'reduceChemicalEmissions' |
    'reduceRefrigerantGasEmissions' |
    'reduceOccupationalDangers' |
    'reducedNoiseExposure' |
    'improveAmbientAirQuality' |
    'improvedThermalComfort' |
    'improvedVisualComfort' |
    'increaseEmployeeEngagement' |
    'changeAddQualityJobs' |
    'improveCommunityConditions' |
    'improvedStaffSatisfaction' |
    'increaseUsefulEquipmentLife' |
    'increaseAverageYearsEmployed' |
    'reduceStaffTurnover' |
    'reducePPE' |
    'reduceUnscheduledBreaks' |
    'reduceWorkplaceIncidentsRelatedToHeat' |
    'increaseWorkplaceSecurity' |
    'increaseEnergyResiliency' |
    'reduceNeedOshaHearingProgram' |
    'reduceUnsafeOperatorActs' |
    'reduceLikelinessOfOccupationalDangers' |
    'reduceCostsForLabor' |
    'reduceRegulatoryCosts' |
    'improvedWaterQuality';


export const NebOptions: Array<NebOption> = [
    {
        label: "Improve organization image or reputation",
        htmlLabel: "Improve organization image or reputation",
        optionValue: "improvedImageOrReputation",
        isQualitative: true,
        howToCalculate: "N/A",
        KPM: ["contributeCompanyVision", "salesGrowth", "customerSatisfactionRatings", "lostCustomerSales", "customerChurnRate", "supplierSatisfactionRatings"],
        selectedKPM: []
    },
    {
        label: "Improve stakeholder relationship",
        htmlLabel: "Improve stakeholder relationship",
        optionValue: "improvedStakeholderRelationship",
        isQualitative: true,
        howToCalculate: "N/A",
        KPM: ["contributeCompanyVision", "salesGrowth", "customerSatisfactionRatings", "lostCustomerSales", "customerChurnRate", "supplierSatisfactionRatings"],
        selectedKPM: []
    },
    {
        label: "Gain new customers",
        htmlLabel: "Gain new customers",
        optionValue: "newCustomers",
        isQualitative: true,
        howToCalculate: "N/A",
        KPM: ["contributeCompanyVision", "salesGrowth", "lostCustomerSales", "customerChurnRate"],
        selectedKPM: []
    },
    {
        label: "Increase customer satisfaction",
        htmlLabel: "Increase customer satisfaction",
        optionValue: "increasedCustomerSatisfaction",
        isQualitative: true,
        howToCalculate: "N/A",
        KPM: ["contributeCompanyVision", "salesGrowth", "customerSatisfactionRatings", "lostCustomerSales", "customerChurnRate"],
        selectedKPM: []
    },
    {
        label: "Improve customer retention through improved performance",
        htmlLabel: "Improve customer retention through improved performance",
        optionValue: "reduceCustomerLossThroughBetterPerformance",
        isQualitative: true,
        howToCalculate: "N/A",
        KPM: ["contributeCompanyVision", "salesGrowth", "customerSatisfactionRatings", "lostCustomerSales", "customerChurnRate"],
        selectedKPM: []
    },
    {
        label: "Increase customer loyalty",
        htmlLabel: "Increase customer loyalty",
        optionValue: "increasedCustomerLoyalty",
        isQualitative: true,
        howToCalculate: "N/A",
        KPM: ["contributeCompanyVision", "salesGrowth", "customerSatisfactionRatings", "lostCustomerSales", "customerChurnRate"],
        selectedKPM: []
    },
    {
        label: "Improve supply chain relationships",
        htmlLabel: "Improve supply chain relationships",
        optionValue: "improvedSupplyChainRelationships",
        isQualitative: true,
        howToCalculate: "N/A",
        KPM: ["contributeCompanyVision", "supplierSatisfactionRatings"],
        selectedKPM: []
    },
    {
        label: "Increase Productivity",
        htmlLabel: "Increase Productivity",
        optionValue: "increasedProductivity",
        isQualitative: true,
        howToCalculate: "N/A",
        KPM: ["contributeCompanyVision", "salesGrowth", "productionCosts", "cycleTimeToMakeGoods", "percentOnTimeToDueDate", "revenuePerEmployee", "perUnitProductCost", "percentCapacityUtilization", "overallEquipmentEffectiveness", "timeToIntroduceNewProducts"],
        selectedKPM: []
    },
    {
        label: "Shorter cycle (make) time",
        htmlLabel: "Shorter cycle (make) time",
        optionValue: "shorterCycleTime",
        isQualitative: true,
        howToCalculate: "N/A",
        KPM: ["contributeCompanyVision", "salesGrowth", "productionCosts", "cycleTimeToMakeGoods", "percentOnTimeToDueDate", "revenuePerEmployee", "perUnitProductCost", "percentCapacityUtilization", "overallEquipmentEffectiveness", "timeToIntroduceNewProducts", "workInProcess"],
        selectedKPM: []
    },
    {
        label: "Increase equipment uptime",
        htmlLabel: "Increase equipment uptime",
        optionValue: "increaseEquipmentUptime",
        isQualitative: true,
        howToCalculate: "N/A",
        KPM: ["numberEquipmentCausedDefects", "equipmentDowntime", "percentCapacityUtilization", "overallEquipmentEffectiveness", "percentProductionYield", "percentShrinkage", "hazardousDisposalCosts", "nonHazardousDisposalCosts", "percentTotalOrCost", "employeeEngagementSatisfaction"],
        selectedKPM: []
    },
    {
        label: "Reduce industrial trucks downtime",
        htmlLabel: "Reduce industrial trucks downtime",
        optionValue: "reduceIndustrialTrucksDowntime",
        isQualitative: true,
        howToCalculate: "N/A",
        KPM: ["equipmentDowntime", "percentCapacityUtilization", "overallEquipmentEffectiveness", "forkTruckBreakdownTime", "maintenanceCost", "employeeEngagementSatisfaction", "laborCosts", "equipmentDowntime", "mobileFuelEmissions"],
        selectedKPM: []
    },
    {
        label: "Increase useful equipment life",
        htmlLabel: "Increase useful equipment life",
        optionValue: "increaseUsefulEquipmentLife",
        isQualitative: true,
        howToCalculate: "N/A",
        KPM: ["contributeCompanyVision", "usefulEquipmentLifeExtended", "maintenanceCost", "laborCosts", "equipmentDowntime", "serviceParts"],
        selectedKPM: []
    },
    {
        label: "Delay cost to replace equipment",
        htmlLabel: "Delay cost to replace equipment",
        optionValue: "delayReplacementEquipment",
        isQualitative: true,
        howToCalculate: "N/A",
        KPM: ["contributeCompanyVision", "usefulEquipmentLifeExtended", "maintenanceCost", "laborCosts", "equipmentDowntime", "serviceParts"],
        selectedKPM: []
    },
    {
        label: "Increase production schedule flexibility",
        htmlLabel: "Increase production schedule flexibility",
        optionValue: "increaseProdScheduleFlexibility",
        isQualitative: true,
        howToCalculate: "N/A",
        KPM: ["contributeCompanyVision", "percentCapacityUtilization", "overallEquipmentEffectiveness", "usefulEquipmentLifeExtended"],
        selectedKPM: []
    },
    {
        label: "Improve product quality by enhancing equipment performance",
        htmlLabel: "Improve product quality by enhancing equipment performance",
        optionValue: "improvedProductQualityMachineSource", // keep the old value for backward compatibility
        isQualitative: true,
        howToCalculate: "N/A",
        KPM: ["productionCosts", "cycleTimeToMakeGoods", "percentOnTimeToDueDate", "revenuePerEmployee", "perUnitProductCost", "numberEquipmentCausedDefects", "equipmentDowntime", "percentCapacityUtilization", "overallEquipmentEffectiveness", "defectiveProductionDollar", "defectRatePPMorDPM", "qualityCustomerComplaints", "qualityCustomerReturns", "percentProductionYield", "percentShrinkage", "maintenanceCost", "engineeringSupport", "laborCosts"],
        selectedKPM: []
    },
    {
        label: "Improve product quality by reducing operator error",
        htmlLabel: "Improve product quality by reducing operator error",
        optionValue: "improvedProductQualityOperatorSource",
        isQualitative: true,
        howToCalculate: "N/A",
        KPM: ["productionCosts", "cycleTimeToMakeGoods", "percentOnTimeToDueDate", "revenuePerEmployee", "perUnitProductCost", "defectiveProductionDollar", "defectRatePPMorDPM", "qualityCustomerComplaints", "qualityCustomerReturns", "percentProductionYield", "percentShrinkage", "maintenanceCost", "engineeringSupport", "employeeEngagementSatisfaction"],
        selectedKPM: []
    },
    {
        label: "Improve product quality by reducing debris contamination",
        htmlLabel: "Improve product quality by reducing debris contamination",
        optionValue: "improvedProductQualityDebrisContamination",
        isQualitative: true,
        howToCalculate: "N/A",
        KPM: ["perUnitProductCost", "percentCapacityUtilization", "defectiveProductionDollar", "defectRatePPMorDPM", "qualityCustomerComplaints", "qualityCustomerReturns"],
        selectedKPM: []
    },
    {
        label: "Reduce production loss - labor and material",
        htmlLabel: "Reduce production loss - labor and material",
        optionValue: "reduceProductionLossLaborMaterial",
        isQualitative: true,
        howToCalculate: "N/A",
        KPM: ["productionCosts", "percentOnTimeToDueDate", "revenuePerEmployee", "perUnitProductCost", "defectiveProductionDollar", "defectRatePPMorDPM", "percentProductionYield", "percentShrinkage"],
        selectedKPM: []
    },
    {
        label: "Reduce raw material loss",
        htmlLabel: "Reduce raw material loss",
        optionValue: "reducedRawMaterialLoss",
        isQualitative: true,
        howToCalculate: "N/A",
        KPM: ["productionCosts", "revenuePerEmployee", "perUnitProductCost", "defectiveProductionDollar", "defectRatePPMorDPM", "percentProductionYield", "percentShrinkage", "hazardousDisposalCosts", "nonHazardousDisposalCosts", "rawMaterials"],
        selectedKPM: []
    },
    {
        label: "Reduce use of consumables",
        htmlLabel: "Reduce use of consumables",
        optionValue: "reducedConsumables",
        isQualitative: true,
        howToCalculate: "N/A",
        KPM: ["perUnitProductCost", "dollarConsumables", "intermediateGoods", "rawMaterials", "serviceParts", "treatmentChemicals"],
        selectedKPM: []
    },
    {
        label: "Better space utilization",
        htmlLabel: "Better space utilization",
        optionValue: "additionalSpaceFromLayoutChanges",
        isQualitative: true,
        howToCalculate: "N/A",
        KPM: ["percentOptimizedSpace", "employeeEngagementSatisfaction"],
        selectedKPM: []
    },
    {
        label: "Reduce wear and tear, reduce replacement and repair parts",
        htmlLabel: "Reduce wear and tear, reduce replacement and repair parts",
        optionValue: "reducedWearAndTear",
        isQualitative: true,
        howToCalculate: "N/A",
        KPM: ["equipmentDowntime", "percentCapacityUtilization", "overallEquipmentEffectiveness", "forkTruckBreakdownTime", "usefulEquipmentLifeExtended", "maintenanceCost", "laborCosts", "serviceParts"],
        selectedKPM: []
    },
    {
        label: "Reduce cost from maintenance replacement/repair parts",
        htmlLabel: "Reduce cost from maintenance replacement/repair parts",
        optionValue: "reducedWearAndTear",
        isQualitative: true,
        howToCalculate: "N/A",
        KPM: ["equipmentDowntime", "percentCapacityUtilization", "overallEquipmentEffectiveness", "forkTruckBreakdownTime", "usefulEquipmentLifeExtended", "maintenanceCost", "laborCosts", "serviceParts"],
        selectedKPM: []
    },
    {
        label: "Reduce costs for labor",
        htmlLabel: "Reduce costs for labor",
        optionValue: "reduceCostsForLabor",
        isQualitative: true,
        howToCalculate: "N/A",
        KPM: ["equipmentDowntime", "percentCapacityUtilization", "overallEquipmentEffectiveness", "forkTruckBreakdownTime", "usefulEquipmentLifeExtended", "maintenanceCost", "laborCosts", "serviceParts"],
        selectedKPM: []
    },
    {
        label: "Reduce labor costs for problem solving and repair",
        htmlLabel: "Reduce labor costs for problem solving and repair",
        optionValue: "reducedLaborCostsForProblemSolvingAndRepair",
        isQualitative: true,
        howToCalculate: "N/A",
        KPM: ["maintenanceCost", "engineeringSupport", "laborCosts"],
        selectedKPM: []
    },
    {
        label: "Reduce hazardous waste",
        htmlLabel: "Reduce hazardous waste",
        optionValue: "reduceHazardousWaste",
        isQualitative: true,
        howToCalculate: "N/A",
        KPM: ["contributeCompanyVision", "defectiveProductionDollar", "percentProductionYield", "percentShrinkage", "hazardousDisposalCosts", "percentTotalOrCost"],
        selectedKPM: []
    },
    {
        label: "Reduce nonhazardous waste",
        htmlLabel: "Reduce nonhazardous waste",
        optionValue: "reduceNonhazardousWaste",
        isQualitative: true,
        howToCalculate: "N/A",
        KPM: ["contributeCompanyVision", "defectiveProductionDollar", "percentProductionYield", "percentShrinkage", "nonHazardousDisposalCosts", "percentTotalOrCost"],
        selectedKPM: []
    },
    {
        label: "Reduce product waste",
        htmlLabel: "Reduce product waste",
        optionValue: "reduceProductWaste",
        isQualitative: true,
        howToCalculate: "N/A",
        KPM: ["contributeCompanyVision", "defectiveProductionDollar", "defectRatePPMorDPM", "percentShrinkage", "percentTotalOrCost", "processEmissions"],
        selectedKPM: []
    },
    {
        label: "Reduce water consumption",
        htmlLabel: "Reduce water consumption",
        optionValue: "reduceWaterConsumption",
        isQualitative: true,
        howToCalculate: "N/A",
        KPM: ["contributeCompanyVision", "consumptionCostWater", "sewageCosts"],
        selectedKPM: []
    },
    {
        label: "Reduce sewage volume",
        htmlLabel: "Reduce sewage volume",
        optionValue: "reduceSewageVolume",
        isQualitative: true,
        howToCalculate: "N/A",
        KPM: ["contributeCompanyVision", "consumptionCostWater", "sewageCosts"],
        selectedKPM: []
    },
    {
        label: "Reduce dust emission",
        htmlLabel: "Reduce dust emissions",
        optionValue: "reduceDustEmissions",
        isQualitative: true,
        howToCalculate: "N/A",
        KPM: ["contributeCompanyVision", "dustEmission", "particulateEmissions"],
        selectedKPM: []
    },
    {
        label: "Reduce refrigerant gas emissions",
        htmlLabel: "Reduce refrigerant gas emissions",
        optionValue: "reduceRefrigerantGasEmissions",
        isQualitative: true,
        howToCalculate: "N/A",
        KPM: ["contributeCompanyVision", "percentOrTotalRefrigerantEmissions"],
        selectedKPM: []
    },
    {
        label: "Reduce accidents or occupational disease",
        htmlLabel: "Reduce accidents or occupational disease",
        optionValue: "reduceOccupationalDangers",
        isQualitative: true,
        howToCalculate: "N/A",
        KPM: ["contributeCompanyVision", "TRIR", "oshaRecordableIncidents", "oshaNonRecordables", "daysAwayFromWork", "lostTimeInjuryRate", "employeeEngagementSatisfaction", "employeeRetentionRate", "talentTurnoverRate", "rawMaterials", "intermediateGoods", "serviceParts", "treatmentChemicals"],
        selectedKPM: []
    },
    {
        label: "Reduce unsafe operator acts",
        htmlLabel: "Reduce unsafe operator acts",
        optionValue: "reduceUnsafeOperatorActs",
        isQualitative: true,
        howToCalculate: "N/A",
        KPM: ["contributeCompanyVision", "TRIR", "oshaRecordableIncidents", "oshaNonRecordables", "daysAwayFromWork", "lostTimeInjuryRate", "employeeEngagementSatisfaction", "employeeRetentionRate", "talentTurnoverRate", "rawMaterials", "intermediateGoods", "serviceParts", "treatmentChemicals"],
        selectedKPM: []
    },
    {
        label: "Reduce likeliness of accidents or occupational disease",
        htmlLabel: "Reduce likeliness of accidents or occupational disease",
        optionValue: "reduceLikelinessOfOccupationalDangers",
        isQualitative: true,
        howToCalculate: "N/A",
        KPM: ["contributeCompanyVision", "TRIR", "oshaRecordableIncidents", "oshaNonRecordables", "daysAwayFromWork", "lostTimeInjuryRate", "employeeEngagementSatisfaction", "employeeRetentionRate", "talentTurnoverRate", "rawMaterials", "intermediateGoods", "serviceParts", "treatmentChemicals"],
        selectedKPM: []
    },
    {
        label: "Reduce nuisance noise",
        htmlLabel: "Reduce nuisance noise",
        optionValue: "reducedNoiseExposure",
        isQualitative: true,
        howToCalculate: "N/A",
        KPM: ["dollarConsumables", "engineeringSupport", "TRIR", "oshaNonRecordables", "oshaRecordableIncidents", "daysAwayFromWork", "lostTimeInjuryRate", "hearingConservationProgram", "employeeEngagementSatisfaction", "employeeRetentionRate", "talentTurnoverRate"],
        selectedKPM: []
    },
    {
        label: "Reduce scope or need of OSHA Hearing Conservation Program",
        htmlLabel: "Reduce scope or need of OSHA Hearing Conservation Program",
        optionValue: "reduceNeedOshaHearingProgram",
        isQualitative: true,
        howToCalculate: "N/A",
        KPM: ["dollarConsumables", "engineeringSupport", "TRIR", "oshaNonRecordables", "oshaRecordableIncidents", "daysAwayFromWork", "lostTimeInjuryRate", "hearingConservationProgram", "employeeEngagementSatisfaction", "employeeRetentionRate", "talentTurnoverRate"],
        selectedKPM: []
    },
    {
        label: "Improve air quality",
        htmlLabel: "Improve air quality",
        optionValue: "improveAmbientAirQuality",
        isQualitative: true,
        howToCalculate: "N/A",
        KPM: ["defectiveProductionDollar", "defectRatePPMorDPM", "dustEmission", "particulateEmissions", "noxSoxCoEmissions", "regulatoryCompliancePercentTests", "reduceRegulatoryFees"],
        selectedKPM: []
    },
    {
        label: "Reduce need for personal protective equipment (PPE)",
        htmlLabel: "Reduce need for personal protective equipment (PPE)",
        optionValue: "reducePPE",
        isQualitative: true,
        howToCalculate: "N/A",
        KPM: ["defectiveProductionDollar", "defectRatePPMorDPM", "dustEmission"],
        selectedKPM: []
    },
    {
        label: "Improve workplace temperature comfort",
        htmlLabel: "Improve workplace temperature comfort",
        optionValue: "improvedThermalComfort",
        isQualitative: true,
        howToCalculate: "N/A",
        KPM: ["workspaceOrFactoryFloorComfort", "absenteeism", "employeeEngagementSatisfaction", "employeeRetentionRate", "talentTurnoverRate"],
        selectedKPM: []
    },
    {
        label: "Reduce unscheduled breaks",
        htmlLabel: "Reduce unscheduled breaks",
        optionValue: "reduceUnscheduledBreaks",
        isQualitative: true,
        howToCalculate: "N/A",
        KPM: ["workspaceOrFactoryFloorComfort", "absenteeism", "employeeEngagementSatisfaction", "employeeRetentionRate", "talentTurnoverRate"],
        selectedKPM: []
    },
    {
        label: "Reduce workplace safety incidents related to heat",
        htmlLabel: "Reduce workplace safety incidents related to heat",
        optionValue: "reduceWorkplaceIncidentsRelatedToHeat",
        isQualitative: true,
        howToCalculate: "N/A",
        KPM: ["workspaceOrFactoryFloorComfort", "absenteeism", "employeeEngagementSatisfaction", "employeeRetentionRate", "talentTurnoverRate"],
        selectedKPM: []
    },
    {
        label: "Increase workplace security",
        htmlLabel: "Increase workplace security",
        optionValue: "increaseWorkplaceSecurity",
        isQualitative: true,
        howToCalculate: "N/A",
        KPM: ["workspaceOrFactoryFloorComfort", "absenteeism", "employeeEngagementSatisfaction", "employeeRetentionRate", "talentTurnoverRate"],
        selectedKPM: []
    },
    {
        label: "Improve workplace lighting and visual comfort",
        htmlLabel: "Improve workplace lighting and visual comfort",
        optionValue: "improvedVisualComfort",
        isQualitative: true,
        howToCalculate: "N/A",
        KPM: ["cycleTimeToMakeGoods", "defectiveProductionDollar", "defectRatePPMorDPM", "qualityCustomerComplaints", "qualityCustomerReturns", "workspaceOrFactoryFloorComfort", "absenteeism", "employeeEngagementSatisfaction", "employeeRetentionRate", "talentTurnoverRate"],
        selectedKPM: []
    },
    {
        label: "Increase employee engagement",
        htmlLabel: "Increase employee engagement",
        optionValue: "increaseEmployeeEngagement",
        isQualitative: true,
        howToCalculate: "N/A",
        KPM: ["contributeCompanyVision", "productionCosts", "cycleTimeToMakeGoods", "percentOnTimeToDueDate", "revenuePerEmployee", "perUnitProductCost", "workInProcess", "defectiveProductionDollar", "defectRatePPMorDPM", "qualityCustomerComplaints", "qualityCustomerReturns", "percentProductionYield", "percentShrinkage", "dollarConsumables", "TRIR", "oshaNonRecordables", "oshaRecordableIncidents", "workspaceOrFactoryFloorComfort", "absenteeism", "employeeEngagementSatisfaction", "employeeRetentionRate", "talentTurnoverRate"],
        selectedKPM: []
    },
    {
        label: "Change or add jobs",
        htmlLabel: "Change or add jobs",
        optionValue: "changeAddQualityJobs",
        isQualitative: true,
        howToCalculate: "N/A",
        KPM: ["contributeCompanyVision", "salesGrowth", "employeeEngagementSatisfaction", "employeeRetentionRate", "talentTurnoverRate"],
        selectedKPM: []
    },
    {
        label: "Increase energy resiliency",
        htmlLabel: "Increase energy resiliency",
        optionValue: "increaseEnergyResiliency",
        isQualitative: true,
        howToCalculate: "N/A",
        KPM: ["contributeCompanyVision", "customerSatisfactionRatings", "supplierSatisfactionRatings", "employeeEngagementSatisfaction", "employeeRetentionRate", "talentTurnoverRate"],
        selectedKPM: []
    },
    {
        label: "Improve social, economic, health conditions for surrounding community",
        htmlLabel: "Improve social, economic, health conditions for surrounding community",
        optionValue: "improveCommunityConditions",
        isQualitative: true,
        howToCalculate: "N/A",
        KPM: ["contributeCompanyVision", "customerSatisfactionRatings", "supplierSatisfactionRatings", "employeeEngagementSatisfaction", "employeeRetentionRate", "talentTurnoverRate"],
        selectedKPM: []
    },
    {
        label: "Improve staff satisfaction",
        htmlLabel: "Improve staff satisfaction",
        optionValue: "improvedStaffSatisfaction",
        isQualitative: true,
        howToCalculate: "N/A",
        KPM: ["contributeCompanyVision", "productionCosts", "cycleTimeToMakeGoods", "percentOnTimeToDueDate", "revenuePerEmployee", "perUnitProductCost", "equipmentDowntime", "percentCapacityUtilization", "overallEquipmentEffectiveness", "forkTruckBreakdownTime", "defectiveProductionDollar", "defectRatePPMorDPM", "qualityCustomerComplaints", "qualityCustomerReturns", "percentProductionYield", "percentShrinkage", "dollarConsumables", "TRIR", "oshaNonRecordables", "oshaRecordableIncidents", "absenteeism", "employeeEngagementSatisfaction", "employeeRetentionRate", "talentTurnoverRate"],
        selectedKPM: []
    },
    {
        label: "Increase average years employed",
        htmlLabel: "Increase average years employed",
        optionValue: "increaseAverageYearsEmployed",
        isQualitative: true,
        howToCalculate: "N/A",
        KPM: ["contributeCompanyVision", "productionCosts", "cycleTimeToMakeGoods", "percentOnTimeToDueDate", "revenuePerEmployee", "perUnitProductCost", "equipmentDowntime", "percentCapacityUtilization", "overallEquipmentEffectiveness", "forkTruckBreakdownTime", "defectiveProductionDollar", "defectRatePPMorDPM", "qualityCustomerComplaints", "qualityCustomerReturns", "percentProductionYield", "percentShrinkage", "dollarConsumables", "TRIR", "oshaNonRecordables", "oshaRecordableIncidents", "absenteeism", "employeeEngagementSatisfaction", "employeeRetentionRate", "talentTurnoverRate"],
        selectedKPM: []
    },
    {
        label: "Reduce staff turnover",
        htmlLabel: "Reduce staff turnover",
        optionValue: "reduceStaffTurnover",
        isQualitative: true,
        howToCalculate: "N/A",
        KPM: ["contributeCompanyVision", "productionCosts", "cycleTimeToMakeGoods", "percentOnTimeToDueDate", "revenuePerEmployee", "perUnitProductCost", "equipmentDowntime", "percentCapacityUtilization", "overallEquipmentEffectiveness", "forkTruckBreakdownTime", "defectiveProductionDollar", "defectRatePPMorDPM", "qualityCustomerComplaints", "qualityCustomerReturns", "percentProductionYield", "percentShrinkage", "dollarConsumables", "TRIR", "oshaNonRecordables", "oshaRecordableIncidents", "absenteeism", "employeeEngagementSatisfaction", "employeeRetentionRate", "talentTurnoverRate"],
        selectedKPM: []
    },
    {
        label: "Reduce GHG emissions",
        htmlLabel: "Reduce GHG emissions",
        optionValue: "reduceChemicalEmissions",
        isQualitative: true,
        howToCalculate: "N/A",
        KPM: ["stationaryFuelEmissions", "purchasedEnergyEmissions", "valueChainEmissions", "mobileFuelEmissions", "processEmissions"],
        selectedKPM: []
    },
    {
        label: "Reduce regulatory costs",
        htmlLabel: "Reduce regulatory costs",
        optionValue: "reduceRegulatoryCosts",
        isQualitative: true,
        howToCalculate: "N/A",
        KPM: ["stationaryFuelEmissions", "purchasedEnergyEmissions", "valueChainEmissions", "particulateEmissions", "noxSoxCoEmissions", "regulatoryCompliancePercentTests", "waterPollutantEmissions", "reduceRegulatoryFees"],
        selectedKPM: []
    },
    {
        label: "Improve water quality",
        htmlLabel: "Improve water quality",
        optionValue: "improvedWaterQuality",
        isQualitative: true,
        howToCalculate: "N/A",
        KPM: ["waterPollutantEmissions"],
        selectedKPM: []
    }
]

export const NebKeywords: { [key: string]: Array<string>} = {
    improvedImageOrReputation: [
        // Keywords from the NEB label
        "improve image", "reputation", "branding", "public perception", "corporate image", "company reputation",
        "brand image", "brand reputation", "positive image", "brand equity", "public trust", "brand loyalty",
        "corporate branding", "corporate reputation", "organizational image", "organizational reputation",
    
        // Synonyms and related terms
        "image enhancement", "reputation management", "brand improvement", "public relations", "PR", "media presence",
        "stakeholder trust", "stakeholder perception", "customer perception", "market reputation", "brand awareness",
        "brand recognition", "brand value", "brand identity", "corporate identity", "corporate trust"
    ],
    improvedStakeholderRelationship: [
        // Keywords from the NEB label
        "improve stakeholder relationship", "stakeholder relationship", "stakeholder engagement", "stakeholder collaboration",
        "stakeholder trust", "stakeholder satisfaction", "stakeholder involvement", "stakeholder communication",
        "stakeholder partnerships", "stakeholder alignment", "stakeholder cooperation", "stakeholder connections",
    
        // Synonyms and related terms
        "relationship building", "stakeholder management", "stakeholder support", "stakeholder loyalty",
        "stakeholder interaction", "stakeholder integration", "stakeholder harmony", "stakeholder rapport",
        "stakeholder networking", "stakeholder outreach", "stakeholder advocacy", "stakeholder participation"
    ],
    newCustomers: [
        // Keywords from the NEB label
        "new customers", "gain customers", "customer acquisition", "customer growth", "new clients", "customer base expansion",
    
        // Synonyms and related terms
        "client acquisition", "client growth", "client base expansion", "market expansion", "customer recruitment",
        "customer onboarding", "business growth", "new markets", "customer outreach", "customer engagement",
        "customer retention", "customer loyalty", "customer satisfaction", "customer experience"
    ],
    increasedCustomerSatisfaction: [
        // Keywords from the NEB label
        "increase customer satisfaction", "customer satisfaction", "happy customers", "customer happiness",
        "customer experience", "customer feedback", "improve customer experience", "customer delight",

        // Synonyms and related terms
        "customer loyalty", "customer retention", "positive reviews", "customer trust", "customer engagement",
        "customer appreciation", "customer service quality", "enhance customer relationships", "customer-centric approach"
    ],
    reduceCustomerLossThroughBetterPerformance: [
        // Keywords from the NEB label
        "improve customer retention", "customer retention", "reduce customer loss", "improve performance",
        "retain customers", "customer loyalty", "better performance", "customer retention improvement",
    
        // Synonyms and related terms
        "customer retention strategy", "reduce churn", "customer retention rate", "minimize customer loss",
        "customer loyalty improvement", "retain existing customers", "reduce customer turnover",
        "enhance customer experience", "improve customer satisfaction", "customer retention enhancement"
    ],
    increasedCustomerLoyalty: [
        // Keywords from the NEB label
        "increase customer loyalty", "customer loyalty", "loyal customers", "repeat customers", "customer retention",
    
        // Synonyms and related terms
        "customer trust", "customer commitment", "brand loyalty", "customer engagement", "customer satisfaction",
        "customer relationships", "customer dedication", "customer faithfulness", "long-term customers",
        "customer allegiance", "customer devotion", "customer reliability", "customer dependability"
    ],
    improvedSupplyChainRelationships: [
        // Keywords from the NEB label
        "improve supply chain relationships", "supply chain relationships", "supply chain collaboration",
        "supply chain partnerships", "supply chain efficiency", "supplier relationships", "supplier collaboration",
        "supplier partnerships", "supplier engagement", "supplier satisfaction", "supplier trust",
    
        // Synonyms and related terms
        "supply chain optimization", "supply chain integration", "supplier loyalty", "supplier alignment",
        "supplier cooperation", "supplier connections", "supplier harmony", "supplier rapport",
        "logistics relationships", "logistics partnerships", "logistics collaboration", "logistics efficiency",
        "supply chain management", "supplier management", "supplier support"
    ],
    increasedProductivity: [
        // Keywords from the NEB label
        "increase productivity", "productivity", "improve productivity", "higher productivity", "work efficiency",

        // Synonyms and related terms
        "efficiency improvement", "process efficiency", "work output", "operational efficiency", "performance improvement",
        "workforce productivity", "production efficiency", "enhance productivity", "business efficiency",
        "output improvement", "process optimization", "work optimization", "task efficiency"
    ],
    shorterCycleTime: [
        // Keywords from the NEB label
        "shorter cycle time", "cycle time", "reduce cycle time", "shorter production time", "faster production",
    
        // Synonyms and related terms
        "efficiency", "process speed", "time reduction", "production efficiency", "time to make goods", "reduce production time",
        "faster manufacturing", "improve cycle efficiency", "time optimization", "process improvement"
    ],
    increaseEquipmentUptime: [
        // Keywords from the NEB label
        "increase equipment uptime", "equipment uptime", "uptime", "improve uptime", "maximize uptime",
    
        // Synonyms and related terms
        "equipment reliability", "machine availability", "reduce downtime", "operational efficiency",
        "equipment performance", "machine uptime", "equipment availability", "minimize downtime",
        "enhance equipment utilization", "improve machine reliability", "continuous operation",
        "efficiency"
    ],
    reduceIndustrialTrucksDowntime: [
        // Keywords from the NEB label
        "reduce industrial trucks downtime", "industrial trucks downtime", "truck downtime", "reduce truck downtime",
    
        // Synonyms and related terms
        "forklift downtime", "fork truck downtime", "reduce forklift downtime", "reduce fork truck downtime",
        "logistics efficiency", "equipment downtime", "reduce equipment downtime", "minimize truck downtime",
        "improve truck availability", "reduce logistics delays", "enhance logistics operations"
    ],
    delayReplacementEquipment: [
        // Keywords from the NEB label
        "delay cost to replace equipment", "equipment replacement delay", "postpone equipment replacement",
        "defer replacement costs", "delay replacement expenses",
    
        // Synonyms and related terms
        "extend equipment life", "prolong equipment usage", "defer capital expenditure", "reduce replacement frequency",
        "delay capital costs", "extend asset lifespan", "postpone replacement investment",
        "savings"
    ],
    increaseProdScheduleFlexibility: [
        // Keywords from the NEB label
        "increase production schedule flexibility", "production schedule flexibility", "flexible production schedule",
    
        // Synonyms and related terms
        "schedule optimization", "production flexibility", "adaptive production schedule", "dynamic scheduling",
        "flexible manufacturing", "production adaptability", "schedule efficiency", "improve scheduling",
        "responsive production schedule", "adjustable production schedule",
        "efficiency"
    ],
    improvedProductQualityMachineSource: [
        // Keywords from the NEB label
        "improve product quality", "product quality", "improving machine source", "machine source improvement",
    
        // Synonyms and related terms
        "quality improvement", "machine reliability", "equipment performance", "reduce defects", "enhance product quality",
        "machine optimization", "equipment optimization", "reduce machine errors", "improve manufacturing quality",
        "reduce equipment defects", "improve machine output", "enhance production quality"
    ],
    improvedProductQualityOperatorSource: [
        // Keywords from the NEB label
        "improve product quality", "product quality", "reducing operator error", "operator error reduction",

        // Synonyms and related terms
        "quality improvement", "reduce human error", "operator performance", "error minimization", "improve operator accuracy",
        "operator training", "operator reliability", "reduce operator mistakes", "enhance operator efficiency",
        "error prevention", "operator skill improvement", "reduce manual errors"
    ],
    improvedProductQualityDebrisContamination: [
        // Keywords from the NEB label
        "improve product quality", "product quality", "reducing debris contamination", "debris contamination reduction",

        // Synonyms and related terms
        "quality improvement", "reduce contamination", "debris-free production", "clean manufacturing",
        "reduce product defects", "enhance product quality", "contamination control", "improve cleanliness",
        "reduce debris defects", "cleaner production processes"
    ],
    reduceProductionLossLaborMaterial: [
        // Keywords from the NEB label
        "reduce production loss", "production loss", "labor loss", "material loss", "reduce labor loss", "reduce material loss",
    
        // Synonyms and related terms
        "minimize production waste", "reduce manufacturing waste", "reduce operational inefficiencies",
        "reduce defective production", "reduce resource waste", "improve production efficiency",
        "reduce downtime", "reduce production inefficiencies", "optimize labor usage", "optimize material usage"
    ],
    reducedRawMaterialLoss: [
        // Keywords from the NEB label
        "reduce raw material loss", "raw material loss", "reduce raw material waste", "raw material reduction",
    
        // Synonyms and related terms
        "minimize material waste", "reduce material consumption", "raw material efficiency", "material utilization improvement",
        "reduce resource waste", "optimize raw material usage", "material waste reduction", "improve material efficiency",
        "efficiency"
    ],
    reducedConsumables: [
        // Keywords from the NEB label
        "reduce cost from using less consumables", "reduce consumables", "less consumables", "consumables cost reduction",
    
        // Synonyms and related terms
        "minimize consumables usage", "reduce consumables expenses", "consumables efficiency", "lower consumables cost",
        "optimize consumables usage", "reduce material consumption", "reduce intermediate goods", "reduce service parts",
        "reduce treatment chemicals",
        "savings"
    ],
    additionalSpaceFromLayoutChanges: [
        // Keywords from the NEB label
        "better space utilization", "space utilization", "optimize space", "improve layout efficiency",
    
        // Synonyms and related terms
        "space optimization", "layout optimization", "efficient space usage", "maximize usable space",
        "improve workspace layout", "space efficiency", "better floor plan", "optimize facility layout"
    ],
    reducedWearAndTear: [
        // Keywords from the NEB label
        "reduce wear and tear", "wear and tear", "reduce replacement parts", "reduce repair parts",
    
        // Synonyms and related terms
        "minimize equipment wear", "reduce maintenance needs", "reduce part replacements", "reduce repair frequency",
        "extend equipment lifespan", "improve equipment durability", "reduce component wear", "enhance equipment reliability",
        "reduce maintenance costs", "optimize equipment usage",
        "savings"
    ],
    reducedLaborCostsForProblemSolvingAndRepair: [
        // Keywords from the NEB label
        "reduce labor costs for problem solving and repair", "labor costs", "problem solving costs", "repair costs",

        // Synonyms and related terms
        "minimize labor expenses", "reduce troubleshooting costs", "reduce repair labor costs", "optimize maintenance labor",
        "lower problem resolution costs", "reduce maintenance workforce costs", "reduce repair workforce expenses",
        "improve labor efficiency", "reduce operational labor costs",
        "savings"
    ],
    reduceHazardousWaste: [
        // Keywords from the NEB label
        "reduce hazardous waste", "hazardous waste reduction", "minimize hazardous waste", "hazardous waste disposal",
    
        // Synonyms and related terms
        "reduce toxic waste", "hazardous material reduction", "minimize toxic materials", "reduce hazardous byproducts",
        "hazardous waste management", "toxic waste disposal", "reduce hazardous emissions", "improve hazardous waste handling"
    ],
    reduceNonhazardousWaste: [
        // Keywords from the NEB label
        "reduce nonhazardous waste", "nonhazardous waste reduction", "minimize nonhazardous waste", "nonhazardous waste disposal",
    
        // Synonyms and related terms
        "reduce general waste", "nonhazardous material reduction", "minimize general waste", "reduce nonhazardous byproducts",
        "nonhazardous waste management", "general waste disposal", "reduce nonhazardous emissions", "improve nonhazardous waste handling"
    ],
    reduceProductWaste: [
        // Keywords from the NEB label
        "reduce product waste", "product waste reduction", "minimize product waste", "reduce defective products",
    
        // Synonyms and related terms
        "reduce production waste", "product defect reduction", "minimize defective production", "reduce product rework",
        "reduce product scrap", "improve product yield", "reduce waste in manufacturing", "optimize product quality"
    ],
    reduceWaterConsumption: [
        // Keywords from the NEB label
        "reduce water consumption", "water consumption reduction", "minimize water usage", "water use reduction",
    
        // Synonyms and related terms
        "reduce water use", "water efficiency", "optimize water usage", "conserve water", "water conservation",
        "lower water consumption", "reduce water waste", "improve water utilization",
        "efficiency", "savings"
    ],
    reduceSewageVolume: [
        // Keywords from the NEB label
        "reduce sewage volume", "sewage volume reduction", "minimize sewage volume", "reduce wastewater volume",
    
        // Synonyms and related terms
        "wastewater reduction", "reduce effluent volume", "minimize wastewater discharge", "sewage management",
        "reduce liquid waste", "improve wastewater efficiency", "reduce sewage discharge", "optimize wastewater handling"
    ],
    reduceDustEmissions: [
        // Keywords from the NEB label
        "reduce dust emissions", "dust emissions reduction", "minimize dust emissions", "dust control",
    
        // Synonyms and related terms
        "reduce particulate emissions", "dust suppression", "airborne dust reduction", "dust mitigation",
        "improve air quality", "reduce particulate matter", "dust pollution control", "dust abatement"
    ],
    reduceRefrigerantGasEmissions: [
        // Keywords from the NEB label
        "reduce refrigerant gas emissions", "refrigerant gas emissions reduction", "minimize refrigerant emissions",
    
        // Synonyms and related terms
        "reduce refrigerant leaks", "refrigerant emissions control", "reduce greenhouse gas emissions",
        "minimize refrigerant gas release", "reduce HVAC emissions", "reduce cooling system emissions",
        "refrigerant management", "reduce fluorinated gas emissions", "reduce F-gas emissions"
    ],
    reduceOccupationalDangers: [
        // Keywords from the NEB label
        "reduce accidents", "reduce occupational disease", "reduce workplace accidents", "reduce occupational hazards",
    
        // Synonyms and related terms
        "minimize workplace risks", "reduce workplace injuries", "reduce workplace illnesses", "improve workplace safety",
        "reduce safety incidents", "reduce occupational risks", "reduce workplace dangers", "enhance employee safety",
        "reduce injury rates", "reduce health risks at work", "improve occupational health"
    ],
    reduceUnsafeOperatorActs: [
        // Keywords from the NEB label
        "reduce unsafe operator acts", "unsafe operator acts reduction", "minimize unsafe acts", "reduce operator errors",
    
        // Synonyms and related terms
        "improve operator safety", "reduce unsafe behaviors", "minimize operator risks", "enhance workplace safety",
        "reduce operator-related incidents", "prevent unsafe actions", "reduce operator hazards", "improve operator practices"
    ],
    reduceLikelinessOfOccupationalDangers: [
        // Keywords from the NEB label
        "reduce likeliness of accidents", "reduce occupational disease likelihood", "reduce workplace accidents likelihood", "reduce occupational hazards likelihood",
    
        // Synonyms and related terms
        "minimize workplace risks", "reduce workplace injury chances", "reduce workplace illness risks", "improve workplace safety",
        "reduce safety incident likelihood", "reduce occupational risk probability", "reduce workplace danger probability", "enhance employee safety",
        "reduce injury likelihood", "reduce health risks at work", "improve occupational health conditions"
    ],
    reducedNoiseExposure: [
        // Keywords from the NEB label
        "reduce nuisance noise", "nuisance noise reduction", "minimize noise exposure", "reduce workplace noise",
    
        // Synonyms and related terms
        "noise control", "reduce noise pollution", "minimize sound levels", "reduce ambient noise",
        "improve acoustic environment", "reduce noise hazards", "noise abatement", "reduce auditory disturbances"
    ],
    reduceNeedOshaHearingProgram: [
        // Keywords from the NEB label
        "reduce OSHA hearing program", "reduce hearing conservation program", "reduce scope of OSHA program", "reduce need for hearing conservation",
        "occupational safety and health administration",
    
        // Synonyms and related terms
        "minimize OSHA hearing program", "reduce occupational noise exposure", "reduce hearing protection requirements",
        "reduce workplace noise compliance", "reduce hearing conservation scope", "reduce OSHA compliance burden",
        "improve hearing conservation compliance", "reduce noise-related OSHA requirements"
    ],
    improveAmbientAirQuality: [
        // Keywords from the NEB label
        "improve air quality", "improve air quality", "better air quality", "enhance air quality",
    
        // Synonyms and related terms
        "reduce air pollution", "reduce particulate matter", "reduce airborne contaminants", "cleaner air",
        "reduce dust and emissions", "improve environmental air quality", "reduce atmospheric pollutants",
        "enhance breathable air", "reduce harmful emissions", "improve ambient air conditions"
    ],
    reducePPE: [
        // Keywords from the NEB label
        "reduce PPE", "reduce need for PPE", "reduce personal protective equipment", "reduce need for personal protective equipment",
    
        // Synonyms and related terms
        "minimize PPE usage", "reduce safety equipment", "reduce protective gear", "reduce workplace protective equipment",
        "reduce safety gear requirements", "reduce occupational safety equipment", "reduce protective equipment costs",
        "savings"
    ],
    improvedThermalComfort: [
        // Keywords from the NEB label
        "improve workplace temperature comfort", "workplace temperature comfort", "improve thermal comfort", "better temperature control",
    
        // Synonyms and related terms
        "enhance thermal comfort", "improve temperature regulation", "better workplace climate", "improve indoor temperature",
        "enhance workplace comfort", "reduce temperature fluctuations", "improve thermal environment", "better HVAC performance"
    ],
    reduceUnscheduledBreaks: [
        // Keywords from the NEB label
        "reduce unscheduled breaks", "unscheduled breaks reduction", "minimize unscheduled breaks", "reduce unplanned breaks",
    
        // Synonyms and related terms
        "reduce unexpected breaks", "minimize unplanned interruptions", "reduce workplace interruptions", "reduce unplanned downtime",
        "improve work continuity", "reduce workflow disruptions", "enhance workplace efficiency", "reduce unexpected interruptions",
        "efficiency"
    ],
    reduceWorkplaceIncidentsRelatedToHeat: [
        // Keywords from the NEB label
        "reduce workplace safety incidents related to heat", "reduce heat-related workplace incidents", "reduce heat-related safety incidents", "reduce heat-related injuries",
    
        // Synonyms and related terms
        "minimize heat-related workplace risks", "reduce heat stress incidents", "reduce heat-related hazards", "improve workplace heat safety",
        "prevent heat-related injuries", "reduce heat exposure risks", "enhance workplace safety in heat", "reduce heat-induced accidents"
    ],
    increaseWorkplaceSecurity: [
        // Keywords from the NEB label
        "increase workplace security", "workplace security improvement", "enhance workplace security", "improve workplace safety and security",
    
        // Synonyms and related terms
        "boost workplace protection", "increase facility security", "improve employee safety", "enhance workplace protection",
        "reduce workplace vulnerabilities", "strengthen workplace safety measures", "improve workplace access control", "increase workplace surveillance"
    ],
    increaseEnergyResiliency: [
        // Keywords from the NEB label
        "increase energy resiliency", "energy resiliency improvement", "enhance energy resilience", "improve energy security",
    
        // Synonyms and related terms
        "boost energy reliability", "increase energy independence", "improve energy stability", "enhance energy sustainability",
        "reduce energy vulnerabilities", "strengthen energy infrastructure", "improve energy supply security", "increase energy adaptability"
    ],
    improvedVisualComfort: [
        // Keywords from the NEB label
        "improve workplace visual comfort", "workplace visual comfort", "better visual comfort", "enhance visual comfort",
    
        // Synonyms and related terms
        "improve lighting conditions", "better workplace lighting", "enhance visibility", "reduce visual strain",
        "improve visual ergonomics", "better lighting environment", "enhance visual clarity", "reduce eye fatigue"
    ],
    increaseEmployeeEngagement: [
        // Keywords from the NEB label
        "increase employee engagement", "employee engagement improvement", "enhance employee engagement", "improve workforce engagement",
    
        // Synonyms and related terms
        "boost employee involvement", "increase employee participation", "improve employee commitment", "enhance workforce morale",
        "increase employee satisfaction", "improve workplace engagement", "strengthen employee connection", "enhance employee motivation"
    ],
    changeAddQualityJobs: [
        // Keywords from the NEB label
        "change jobs", "add jobs", "change or add jobs", "job creation", "job changes",
    
        // Synonyms and related terms
        "increase employment opportunities", "improve job quality", "create new jobs", "enhance workforce opportunities",
        "expand employment", "job growth", "improve workforce conditions", "add quality jobs"
    ],
    improveCommunityConditions: [
        // Keywords from the NEB label
        "improve community conditions", "social conditions improvement",
        "improve surrounding community conditions", "enhance community well-being",
    
        // Synonyms and related terms
        "improve social conditions", "reduce community health burdens", "enhance economic opportunities", "improve public health",
        "strengthen community support", "reduce local health risks", "enhance community quality of life", "improve neighborhood conditions"
    ],
    improvedStaffSatisfaction: [
        // Keywords from the NEB label
        "improve staff satisfaction", "staff satisfaction improvement", "enhance staff satisfaction", "improve employee satisfaction",
    
        // Synonyms and related terms
        "boost workforce morale", "increase employee happiness", "improve workplace satisfaction", "enhance employee well-being",
        "increase job satisfaction", "improve employee contentment", "enhance workplace morale", "improve team satisfaction"
    ],
    increaseUsefulEquipmentLife: [
        // Keywords from the NEB label
        "increase useful equipment life", "useful equipment life extension", "extend equipment lifespan", "prolong equipment life",
    
        // Synonyms and related terms
        "enhance equipment durability", "improve equipment longevity", "reduce equipment wear", "maximize equipment usage",
        "extend asset life", "improve machinery lifespan", "reduce replacement frequency", "enhance equipment reliability"
    ],
    increaseAverageYearsEmployed: [
        // Keywords from the NEB label
        "increase average years employed", "average years employed improvement", "enhance employee tenure", "improve workforce retention",
    
        // Synonyms and related terms
        "increase employee retention", "extend employee tenure", "improve average employment duration", "enhance job stability",
        "reduce employee turnover", "increase workforce longevity", "improve employee loyalty", "enhance workforce retention"
    ],
    reduceStaffTurnover: [
        // Keywords from the NEB label
        "reduce staff turnover", "staff turnover reduction", "minimize staff turnover", "reduce employee turnover",
    
        // Synonyms and related terms
        "improve employee retention", "reduce workforce attrition", "minimize employee churn", "enhance workforce stability",
        "reduce talent turnover", "improve employee loyalty", "increase workforce retention", "reduce employee attrition"
    ],
    reduceChemicalEmissions: [
        // Keywords from the NEB label
        "reduce GHG emissions", "GHG emissions reduction", "minimize greenhouse gas emissions", "reduce greenhouse gases",
    
        // Synonyms and related terms
        "reduce carbon emissions", "reduce CO2 emissions", "lower carbon footprint", "reduce methane emissions",
        "reduce nitrous oxide emissions", "reduce fluorinated gas emissions", "reduce climate pollutants",
        "reduce atmospheric emissions", "reduce harmful emissions", "reduce industrial emissions"
    ],
    reduceRegulatoryCosts: [
        // Keywords from the NEB label
        "reduce regulatory costs", "regulatory cost reduction", "minimize regulatory expenses", "reduce compliance costs",
    
        // Synonyms and related terms
        "reduce regulatory fees", "lower compliance costs", "reduce environmental fees", "reduce government fees",
        "reduce regulatory burdens", "reduce legal compliance costs", "minimize regulatory obligations", "reduce administrative costs",
        "savings"
    ],
    reduceCostsForLabor: [
        // Keywords from the NEB label
        "reduce costs for labor", "labor cost reduction", "minimize labor expenses", "reduce workforce costs",
    
        // Synonyms and related terms
        "lower labor costs", "reduce employee expenses", "optimize labor spending", "minimize workforce expenses",
        "reduce payroll costs", "enhance labor efficiency", "improve workforce cost-effectiveness", "reduce labor overhead",
        "efficiency", "savings"
    ],
    improvedWaterQuality: [
        // Keywords from the NEB label
        "improve water quality", "water quality improvement", "enhance water quality", "better water quality",
    
        // Synonyms and related terms
        "reduce water pollutants", "improve water cleanliness", "enhance water purity", "reduce water contamination",
        "improve aquatic health", "reduce waterborne pollutants", "improve environmental water quality", "cleaner water"
    ]
}


export const NebKeywordList: Array<string> = Array.from(
    new Set(Object.values(NebKeywords).flat())
);