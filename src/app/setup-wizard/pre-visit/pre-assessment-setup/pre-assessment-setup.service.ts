import { Injectable } from '@angular/core';
import { AssessmentIdbService } from 'src/app/indexed-db/assessment-idb.service';
import { IdbAssessment } from 'src/app/models/assessment';
import { UnitSettings } from 'src/app/models/unitSettings';
import { UtilityEnergyUse } from 'src/app/models/utilityEnergyUses';
import { UtilityOptions } from 'src/app/shared/constants/utilityTypes';
import { ConvertValue } from 'src/app/shared/conversions/convertValue';

@Injectable({
  providedIn: 'root'
})
export class PreAssessmentSetupService {
  convertValue = new ConvertValue();

  constructor(private assessmentIdbService: AssessmentIdbService) { }

  async updateAssessmentEnergyUse(assessments: Array<IdbAssessment>, companyEnergyUnit: string) {
    for (const assessment of assessments) {
      let use = 0;
      assessment.utilityTypes.forEach(utilityType => {
        let utilityEnergyUse: UtilityEnergyUse = assessment.utilityEnergyUses.find(
          _energyUse => _energyUse.utilityType == utilityType);
        if (utilityEnergyUse.include) {
          // calculate use
          let convertedUse = 0;
          let selectedUtilityOption = UtilityOptions.find(
            _option => _option.utilityType == utilityType);
          let selectedUnitOption = selectedUtilityOption.energyUnitOptions.find(
            _unitOption => _unitOption.value == utilityEnergyUse.energyUnit);
          if (selectedUtilityOption.isStandardEnergyUnit 
            && selectedUnitOption.isStandard !== false) {
              convertedUse = this.convertValue.convertValue(
                utilityEnergyUse.energyUse,
                utilityEnergyUse.energyUnit,
                companyEnergyUnit).convertedValue;
          } else {
            convertedUse = this.convertValue.convertValue(
              utilityEnergyUse.energyUse * utilityEnergyUse.energyHHV,
              utilityEnergyUse.energyUnitStandard,
              companyEnergyUnit).convertedValue;
          }
          use += convertedUse;
        }
      });
      assessment.energyUse = use;
      // Update assessment energy savings
      if (companyEnergyUnit === 'MMBtu') {
        assessment.energySavings = this.convertValue.convertValue(
          assessment.energySavings,
          'kWh',
          'MMBtu').convertedValue;
      } else {
        assessment.energySavings = this.convertValue.convertValue(
          assessment.energySavings,
          'MMBtu',
          'kWh').convertedValue;
      }
      await this.saveChanges(assessment);
    }
  }

  async updateAssessmentEnergyCost(assessments: Array<IdbAssessment>, facilityUnitSettings: UnitSettings) {
    for (const assessment of assessments) {
      let cost = 0;
      assessment.utilityTypes.forEach(utilityType => {
        let utilityEnergyUse: UtilityEnergyUse = assessment.utilityEnergyUses.find(
          _energyUse => _energyUse.utilityType == utilityType);
        if (utilityEnergyUse.include) {
          // calculate cost
          let trimmedType = utilityType.replace(/\s+/g, '');
          let camelCaseType = trimmedType.charAt(0).toLowerCase() + trimmedType.slice(1);
          let convertedCost = 0;
          let hasError = this.convertValue.convertValue(
            1, utilityEnergyUse.energyUnit, facilityUnitSettings[`${camelCaseType}Unit`]).hasError;
          if (hasError) {
            // facility unit and assessment unit are not compatible
            // convert to standard energy unit
            let selectedUtilityOption = UtilityOptions.find(
              _option => _option.utilityType == utilityType);
            let selectedUnitOption = selectedUtilityOption.energyUnitOptions.find(
              _unitOption => _unitOption.value == utilityEnergyUse.energyUnit);
            if (selectedUtilityOption.isStandardEnergyUnit 
              && selectedUnitOption.isStandard !== false) {
              convertedCost = this.convertValue.convertValue(
                utilityEnergyUse.energyUse / (facilityUnitSettings[`${camelCaseType}HHV`]),
                utilityEnergyUse.energyUnit,
                facilityUnitSettings[`${camelCaseType}EnergyUnit`]).convertedValue;
            } else {
              convertedCost = this.convertValue.convertValue(
                utilityEnergyUse.energyUse * utilityEnergyUse.energyHHV,
                utilityEnergyUse.energyUnitStandard,
                facilityUnitSettings[`${camelCaseType}Unit`]).convertedValue;
            }
          } else {
            // facility unit and assessment unit are compatible
            // convert to facility unit
            convertedCost = this.convertValue.convertValue(
              utilityEnergyUse.energyUse,
              utilityEnergyUse.energyUnit,
              facilityUnitSettings[`${camelCaseType}Unit`]).convertedValue;
          }
          if (convertedCost === Infinity || convertedCost === undefined) {
            convertedCost = 0;
          }
          cost += convertedCost * facilityUnitSettings[`${camelCaseType}Price`];
        }
      });
      assessment.cost = cost;
      await this.saveChanges(assessment);
    }
  }

  async saveChanges(assessment: IdbAssessment) {
    await this.assessmentIdbService.asyncUpdate(assessment);
  }
}
