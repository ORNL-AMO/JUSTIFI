import { IdbFacility } from "src/app/models/facility";
import { UtilityOptions } from "../../constants/utilityTypes";
import { ConvertValue } from "../../conversions/convertValue";
import { IdbAssessment } from "src/app/models/assessment";
import { UtilityEnergyUse } from "src/app/models/utilityEnergyUses";

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

export function updateAssessmentUtilityUseCost(assessment: IdbAssessment, facility: IdbFacility, companyEnergyUnit: string): IdbAssessment {
  const facilityUnitSettings = facility.unitSettings;
  const convertValue = new ConvertValue();
  let energyUse = 0, energyCost = 0, waterCost = 0;
  assessment.utilityTypes.forEach(utilityType => {
    let utilityEnergyUse: UtilityEnergyUse = assessment.utilityEnergyUses.find(
      _energyUse => _energyUse.utilityType == utilityType);
    if (utilityEnergyUse.include) {
      let trimmedType = utilityType.replace(/\s+/g, ''); // Remove spaces
      let camelCaseType = trimmedType.charAt(0).toLowerCase() + trimmedType.slice(1);
      if (utilityType == 'Water' || utilityType == 'Waste Water') {
        // calculate cost
        let convertedUse = 0;
        convertedUse = convertValue.convertValue(
          utilityEnergyUse.energyUse,
          utilityEnergyUse.energyUnit,
          facilityUnitSettings[`${camelCaseType}Unit`]).convertedValue;
        waterCost += convertedUse * facilityUnitSettings[`${camelCaseType}Price`];
      } else {
        let convertedUse = 0, convertedCost = 0;
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
        } else {
          convertedUse = convertValue.convertValue(
            utilityEnergyUse.energyUse * utilityEnergyUse.energyHHV,
            utilityEnergyUse.energyUnitStandard,
            companyEnergyUnit).convertedValue;
        }
        energyUse += convertedUse;
        // calculate cost
        convertedCost = convertValue.convertValue(
          utilityEnergyUse.energyUse,
          utilityEnergyUse.energyUnit,
          facilityUnitSettings[`${camelCaseType}Unit`]).convertedValue;
        energyCost += convertedCost * facilityUnitSettings[`${camelCaseType}Price`];
      }
    }
  });
  assessment.energyUse = energyUse;
  assessment.energyCost = energyCost;
  assessment.waterCost = waterCost;
  assessment.cost = energyCost + waterCost;
  return assessment;
}