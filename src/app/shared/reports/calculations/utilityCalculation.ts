import { IdbFacility } from "src/app/models/facility";
import { UtilityOptions } from "../../constants/utilityTypes";
import { ConvertValue } from "../../conversions/convertValue";
import { IdbAssessment } from "src/app/models/assessment";
import { UtilityEnergyUse } from "src/app/models/utilityEnergyUses";
import { UnitSettings } from "src/app/models/unitSettings";

export function updateFacilityUtilityUseCost(facility: IdbFacility, companyEnergyUnit: string): IdbFacility {
  const convertValue = new ConvertValue();
  let energyUse = 0, energyCost = 0, waterCost = 0;
  UtilityOptions.forEach(option => {
    let utilityType = option.utilityType;
    let trimmedType = utilityType.replace(/\s+/g, ''); // Remove spaces
    let camelCaseType = trimmedType.charAt(0).toLowerCase() + trimmedType.slice(1);
    if (facility.unitSettings[`include${trimmedType}`]) {
      if (utilityType === 'Water' || utilityType === 'Waste Water') {
        // water related cost
        waterCost += facility.unitSettings[`${camelCaseType}Use`] *
          facility.unitSettings[`${camelCaseType}Price`];
      } else {
        // energy related use and cost
        let convertedUse = 0;
        let selectedUnitOption = option.energyUnitOptions.find(
          _unitOption => _unitOption.value == facility.unitSettings[`${camelCaseType}Unit`]);
        if (option.isStandardEnergyUnit && selectedUnitOption.isStandard !== false) {
          // standard energy unit
          convertedUse = convertValue.convertValue(
            facility.unitSettings[`${camelCaseType}Use`],
            facility.unitSettings[`${camelCaseType}Unit`],
            companyEnergyUnit).convertedValue;
        } else {
          // non-standard energy unit
          convertedUse = convertValue.convertValue(
            facility.unitSettings[`${camelCaseType}Use`] *
            facility.unitSettings[`${camelCaseType}HHV`],
            facility.unitSettings[`${camelCaseType}EnergyUnit`],
            companyEnergyUnit).convertedValue;
        }
        energyUse += convertedUse;
        energyCost += facility.unitSettings[`${camelCaseType}Use`] *
          facility.unitSettings[`${camelCaseType}Price`];
      }
    }
  });
  facility.energyUse = energyUse;
  facility.energyCost = energyCost;
  facility.waterCost = waterCost;
  facility.cost = energyCost + waterCost;
  return facility;
}

export function updateAssessmentUtilityUseCostSavings(assessment: IdbAssessment, facilityUnitSettings: UnitSettings, companyEnergyUnit: string): IdbAssessment {
  assessment = calculateAssessmentUtilityUseSavings(assessment, companyEnergyUnit);
  assessment = calculateAssessmentUtilityCostSavings(assessment, facilityUnitSettings);
  return assessment;
}

export function calculateAssessmentUtilityUseSavings(assessment: IdbAssessment, companyEnergyUnit: string): IdbAssessment {
  const convertValue = new ConvertValue();
  let energyUse = 0;
  let energySavings = 0, waterSavings = 0;
  assessment.utilityTypes.forEach(utilityType => {
    let utilityEnergyUse: UtilityEnergyUse = assessment.utilityEnergyUses.find(
      _energyUse => _energyUse.utilityType == utilityType);
    if (utilityEnergyUse.include) {
      let trimmedType = utilityType.replace(/\s+/g, ''); // Remove spaces
      let camelCaseType = trimmedType.charAt(0).toLowerCase() + trimmedType.slice(1);
      let convertedUse = 0;
      let convertedSaving = 0;
      if (utilityType == 'Water' || utilityType == 'Waste Water') {
        // calculate saving
        convertedSaving = convertValue.convertValue(
          utilityEnergyUse.utilitySaving,
          utilityEnergyUse.energyUnit,
          'kgal').convertedValue; // default to kgal
        if (isNaN(convertedSaving)) {
          convertedSaving = 0;
        }
        waterSavings += convertedSaving;
      } else {
        let selectedUtilityOption = UtilityOptions.find(
          _option => _option.utilityType == utilityType);
        let selectedUnitOption = selectedUtilityOption.energyUnitOptions.find(
          _unitOption => _unitOption.value == utilityEnergyUse.energyUnit);
        // calculate use
        if (selectedUtilityOption.isStandardEnergyUnit
          && selectedUnitOption?.isStandard !== false) {
          convertedUse = convertValue.convertValue(
            utilityEnergyUse.energyUse,
            utilityEnergyUse.energyUnit,
            companyEnergyUnit).convertedValue;
          convertedSaving = convertValue.convertValue(
            utilityEnergyUse.utilitySaving,
            utilityEnergyUse.energyUnit,
            companyEnergyUnit).convertedValue;
        } else {
          convertedUse = convertValue.convertValue(
            utilityEnergyUse.energyUse * utilityEnergyUse.energyHHV,
            utilityEnergyUse.energyUnitStandard,
            companyEnergyUnit).convertedValue;
          convertedSaving = convertValue.convertValue(
            utilityEnergyUse.utilitySaving * utilityEnergyUse.energyHHV,
            utilityEnergyUse.energyUnitStandard,
            companyEnergyUnit).convertedValue;
        }
        if (isNaN(convertedUse)) {
          convertedUse = 0;
        }
        if (isNaN(convertedSaving)) {
          convertedSaving = 0;
        }
        energyUse += convertedUse;
        energySavings += convertedSaving;
      }
    }
  });
  assessment.energyUse = energyUse;
  assessment.energySavings = energySavings;
  assessment.waterSavings = waterSavings;
  return assessment;
}

export function calculateAssessmentUtilityCostSavings(assessment: IdbAssessment, facilityUnitSettings: UnitSettings): IdbAssessment {
  const convertValue = new ConvertValue();
  let energyCost = 0, waterCost = 0;
  let energyCostSavings = 0, waterCostSavings = 0;
  assessment.utilityTypes.forEach(utilityType => {
    let utilityEnergyUse: UtilityEnergyUse = assessment.utilityEnergyUses.find(
      _energyUse => _energyUse.utilityType == utilityType);
    if (utilityEnergyUse.include) {
      let trimmedType = utilityType.replace(/\s+/g, ''); // Remove spaces
      let camelCaseType = trimmedType.charAt(0).toLowerCase() + trimmedType.slice(1);
      let convertedUse = 0, convertedUseForCost = 0;
      let convertedSaving = 0, convertedSavingForCost = 0;
      if (utilityType == 'Water' || utilityType == 'Waste Water') {
        // calculate cost
        convertedUseForCost = convertValue.convertValue(
          utilityEnergyUse.energyUse,
          utilityEnergyUse.energyUnit,
          facilityUnitSettings[`${camelCaseType}Unit`]).convertedValue;
        if (isNaN(convertedUseForCost)) {
          convertedUseForCost = 0;
        }
        waterCost += convertedUseForCost * facilityUnitSettings[`${camelCaseType}Price`];
        // calculate saving
        convertedSavingForCost = convertValue.convertValue(
          utilityEnergyUse.utilitySaving,
          utilityEnergyUse.energyUnit,
          facilityUnitSettings[`${camelCaseType}Unit`]).convertedValue;
        if (isNaN(convertedSavingForCost)) {
          convertedSavingForCost = 0;
        }
        waterCostSavings += convertedSavingForCost * facilityUnitSettings[`${camelCaseType}Price`];
      } else {
        let selectedUtilityOption = UtilityOptions.find(
          _option => _option.utilityType == utilityType);
        let selectedUnitOption = selectedUtilityOption.energyUnitOptions.find(
          _unitOption => _unitOption.value == utilityEnergyUse.energyUnit);
        // calculate cost
        convertedUseForCost = convertValue.convertValue(
          utilityEnergyUse.energyUse,
          utilityEnergyUse.energyUnit,
          facilityUnitSettings[`${camelCaseType}Unit`]).convertedValue;
        if (isNaN(convertedUseForCost)) {
          convertedUseForCost = 0;
        }
        energyCost += convertedUseForCost * facilityUnitSettings[`${camelCaseType}Price`];
        // calculate saving for cost
        convertedSavingForCost = convertValue.convertValue(
          utilityEnergyUse.utilitySaving,
          utilityEnergyUse.energyUnit,
          facilityUnitSettings[`${camelCaseType}Unit`]).convertedValue;
        if (isNaN(convertedSavingForCost)) {
          convertedSavingForCost = 0;
        }
        energyCostSavings += convertedSavingForCost * facilityUnitSettings[`${camelCaseType}Price`];
      }
    }
  });
  assessment.energyCost = energyCost;
  assessment.waterCost = waterCost;
  assessment.cost = energyCost + waterCost;
  assessment.energyCostSavings = energyCostSavings;
  assessment.waterCostSavings = waterCostSavings;
  assessment.costSavings = energyCostSavings + waterCostSavings;
  return assessment;
}