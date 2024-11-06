import { Pipe, PipeTransform } from '@angular/core';
import { UtilityOptions } from '../constants/utilityTypes';
import { UnitOption } from '../constants/unitOptions';

@Pipe({
  name: 'isStandardUnit',
})
export class IsStandardUnitPipe implements PipeTransform {

  transform(utilityType: string, unit: string, unitType: string): boolean {
    // To check if the unit is standard for the desired unitType or not
    // 1. by isStandardEnergyUnit on the UtilityOption
    // 2. by isStandard on the UnitOption
    // default to true if utility type is not found/power type
    if (unitType === 'Energy') {
      let selectedUtility = UtilityOptions.find(_utilityOption =>
        _utilityOption.utilityType == utilityType);
      if (selectedUtility.isStandardEnergyUnit) {
        let selectedUnitOption = selectedUtility.energyUnitOptions.find(
          _unitOption => _unitOption.value == unit);
        if (selectedUnitOption && selectedUnitOption.isStandard === false) {
          return false;
        }
        return true;
      } else {
        return false;
      }
    } else if (unitType === 'Power') {
      return true;
    }
    return true;
  }

}
