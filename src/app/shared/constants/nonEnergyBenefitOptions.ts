import { KeyPerformanceMetricValue } from "./keyPerformanceMetrics"

export interface NebOption {
    label: string,
    htmlLabel: string,
    optionValue: NebOptionValue,
    isQualitative: boolean,
    howToCalculate: string,
    KPM: Array<KeyPerformanceMetricValue>,
    selected?: boolean,
    selectedKPM?: Array<KeyPerformanceMetricValue>
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
    'increaseUsefulEquipmentLife' |
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
        label: "Improved image or reputation",
        htmlLabel: "Improved image or reputation",
        optionValue: "improvedImageOrReputation",
        isQualitative: true,
        howToCalculate: "N/A",
        KPM: ["contributeCompanyVision", "salesGrowth", "customerSatisfactionRatings", "lostCustomerSales", "customerChurnRate", "supplierSatisfactionRatings"],
        selectedKPM: []
    },
    {
        label: "Improved stakeholder relationship",
        htmlLabel: "Improved stakeholder relationship",
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
        label: "Increased customer satisfaction",
        htmlLabel: "Increased customer satisfaction",
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
        label: "Increased customer loyalty",
        htmlLabel: "Increased customer loyalty",
        optionValue: "increasedCustomerLoyalty",
        isQualitative: true,
        howToCalculate: "N/A",
        KPM: ["contributeCompanyVision", "salesGrowth", "customerSatisfactionRatings", "lostCustomerSales", "customerChurnRate"],
        selectedKPM: []
    },
    {
        label: "Improved supply chain relationships",
        htmlLabel: "Improved supply chain relationships",
        optionValue: "improvedSupplyChainRelationships",
        isQualitative: true,
        howToCalculate: "N/A",
        KPM: ["contributeCompanyVision", "supplierSatisfactionRatings"],
        selectedKPM: []
    },
    {
        label: "Increased Productivity",
        htmlLabel: "Increased Productivity",
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
        KPM: ["equipmentDowntime", "percentCapacityUtilization", "overallEquipmentEffectiveness", "forkTruckBreakdownTime", "maintenanceCost", "employeeEngagementSatisfaction", "laborCosts", "equipmentDowntime"],
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
        label: "Improved product quality by improving machine source",
        htmlLabel: "Improved product quality by improving machine source",
        optionValue: "improvedProductQualityMachineSource",
        isQualitative: true,
        howToCalculate: "N/A",
        KPM: ["productionCosts", "cycleTimeToMakeGoods", "percentOnTimeToDueDate", "revenuePerEmployee", "perUnitProductCost", "numberEquipmentCausedDefects", "equipmentDowntime", "percentCapacityUtilization", "overallEquipmentEffectiveness", "defectiveProductionDollar", "defectRatePPMorDPM", "qualityCustomerComplaints", "qualityCustomerReturns", "percentProductionYield", "percentShrinkage", "maintenanceCost", "engineeringSupport", "laborCosts"],
        selectedKPM: []
    },
    {
        label: "Improved product quality by reducing operator error",
        htmlLabel: "Improved product quality by reducing operator error",
        optionValue: "improvedProductQualityOperatorSource",
        isQualitative: true,
        howToCalculate: "N/A",
        KPM: ["productionCosts", "cycleTimeToMakeGoods", "percentOnTimeToDueDate", "revenuePerEmployee", "perUnitProductCost", "defectiveProductionDollar", "defectRatePPMorDPM", "qualityCustomerComplaints", "qualityCustomerReturns", "percentProductionYield", "percentShrinkage", "maintenanceCost", "engineeringSupport", "employeeEngagementSatisfaction"],
        selectedKPM: []
    },
    {
        label: "Improved product quality by reducing debris contamination",
        htmlLabel: "Improved product quality by reducing debris contamination",
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
        label: "Reduced raw material loss",
        htmlLabel: "Reduced raw material loss",
        optionValue: "reducedRawMaterialLoss",
        isQualitative: true,
        howToCalculate: "N/A",
        KPM: ["productionCosts", "revenuePerEmployee", "perUnitProductCost", "defectiveProductionDollar", "defectRatePPMorDPM", "percentProductionYield", "percentShrinkage", "hazardousDisposalCosts", "nonHazardousDisposalCosts", "rawMaterials"],
        selectedKPM: []
    },
    {
        label: "Reduce cost from using less consumables",
        htmlLabel: "Reduce cost from using less consumables",
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
        label: "Reduced wear and tear, reduced replacement and repair parts",
        htmlLabel: "Reduced wear and tear, reduced replacement and repair parts",
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
        label: "Reduced costs for labor",
        htmlLabel: "Reduced costs for labor",
        optionValue: "reduceCostsForLabor",
        isQualitative: true,
        howToCalculate: "N/A",
        KPM: ["equipmentDowntime", "percentCapacityUtilization", "overallEquipmentEffectiveness", "forkTruckBreakdownTime", "usefulEquipmentLifeExtended", "maintenanceCost", "laborCosts", "serviceParts"],
        selectedKPM: []
    },
    {
        label: "Reduced labor costs for problem solving and repair",
        htmlLabel: "Reduced labor costs for problem solving and repair",
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
        KPM: ["contributeCompanyVision", "defectiveProductionDollar", "defectRatePPMorDPM", "percentShrinkage", "percentTotalOrCost"],
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
        KPM: ["contributeCompanyVision", "totalLbsDust", "particulateEmissions"],
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
        label: "Improved air quality",
        htmlLabel: "Improved air quality",
        optionValue: "improveAmbientAirQuality",
        isQualitative: true,
        howToCalculate: "N/A",
        KPM: ["defectiveProductionDollar", "defectRatePPMorDPM", "totalLbsDust", "numberOfParticles", "particulateEmissions", "noxSoxCoEmissions", "percentTestsMeetingStandardsAirPollutants"],
        selectedKPM: []
    },
    {
        label: "Reduced need for personal protective equipment (PPE)",
        htmlLabel: "Reduced need for personal protective equipment (PPE)",
        optionValue: "reducePPE",
        isQualitative: true,
        howToCalculate: "N/A",
        KPM: ["defectiveProductionDollar", "defectRatePPMorDPM", "totalLbsDust", "numberOfParticles"],
        selectedKPM: []
    },
    {
        label: "Improve workplace temperature comfort",
        htmlLabel: "Improve workplace temperature comfort",
        optionValue: "improvedThermalComfort",
        isQualitative: true,
        howToCalculate: "N/A",
        KPM: ["energyCostPerUnit", "workspaceOrFactoryFloorComfort", "absenteeism", "employeeEngagementSatisfaction", "employeeRetentionRate", "talentTurnoverRate"],
        selectedKPM: []
    },
    {
        label: "Reduce unscheduled breaks",
        htmlLabel: "Reduce unscheduled breaks",
        optionValue: "reduceUnscheduledBreaks",
        isQualitative: true,
        howToCalculate: "N/A",
        KPM: ["energyCostPerUnit", "workspaceOrFactoryFloorComfort", "absenteeism", "employeeEngagementSatisfaction", "employeeRetentionRate", "talentTurnoverRate"],
        selectedKPM: []
    },
    {
        label: "Reduce workplace safety incidents related to heat",
        htmlLabel: "Reduce workplace safety incidents related to heat",
        optionValue: "reduceWorkplaceIncidentsRelatedToHeat",
        isQualitative: true,
        howToCalculate: "N/A",
        KPM: ["energyCostPerUnit", "workspaceOrFactoryFloorComfort", "absenteeism", "employeeEngagementSatisfaction", "employeeRetentionRate", "talentTurnoverRate"],
        selectedKPM: []
    },
    {
        label: "Increase workplace security",
        htmlLabel: "Increase workplace security",
        optionValue: "increaseWorkplaceSecurity",
        isQualitative: true,
        howToCalculate: "N/A",
        KPM: ["energyCostPerUnit", "workspaceOrFactoryFloorComfort", "absenteeism", "employeeEngagementSatisfaction", "employeeRetentionRate", "talentTurnoverRate"],
        selectedKPM: []
    },
    {
        label: "Improved workplace visual comfort",
        htmlLabel: "Improved workplace visual comfort",
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
        label: "Improve social, economic, health burden conditions for surrounding community",
        htmlLabel: "Improve social, economic, health burden conditions for surrounding community",
        optionValue: "improveCommunityConditions",
        isQualitative: true,
        howToCalculate: "N/A",
        KPM: ["contributeCompanyVision", "customerSatisfactionRatings", "supplierSatisfactionRatings", "employeeEngagementSatisfaction", "employeeRetentionRate", "talentTurnoverRate"],
        selectedKPM: []
    },
    {
        label: "Improved staff satisfaction",
        htmlLabel: "Improved staff satisfaction",
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
        KPM: ["stationaryFuelEmissions", "scope2Emissions", "scope3Emissions"],
        selectedKPM: []
    },
    {
        label: "Reduce regulatory costs",
        htmlLabel: "Reduce regulatory costs",
        optionValue: "reduceRegulatoryCosts",
        isQualitative: true,
        howToCalculate: "N/A",
        KPM: ["stationaryFuelEmissions", "scope2Emissions", "scope3Emissions", "particulateEmissions", "noxSoxCoEmissions", "percentTestsMeetingStandardsAirPollutants", "waterPolutantEmissions"],
        selectedKPM: []
    },
    {
        label: "Improved water quality",
        htmlLabel: "Improved water quality",
        optionValue: "improvedWaterQuality",
        isQualitative: true,
        howToCalculate: "N/A",
        KPM: ["waterPolutantEmissions"],
        selectedKPM: []
    }
]
