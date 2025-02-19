import { Pipe, PipeTransform } from '@angular/core';
import { UtilityOptions } from '../constants/utilityTypes';
import { UnitSettings } from 'src/app/models/unitSettings';

@Pipe({
  name: 'utilityTrackedFacility',
  standalone: false,
})
export class UtilityTrackedFacilityPipe implements PipeTransform {

  transform(utilityCategory: string, unitSettings: UnitSettings): boolean {
    if (utilityCategory === 'energy') {
      for (const option of UtilityOptions) {
        let utilityType = option.utilityType;
        if (utilityType !== 'Water' && utilityType !== 'Waste Water') {
          let trimmedType = utilityType.replace(/\s+/g, '');
          if (unitSettings[`include${trimmedType}`]) {
            return true;
          }
        }
      }
    } else if (utilityCategory === 'water') {
      if (unitSettings[`includeWater`] ||
        unitSettings[`includeWasteWater`]
      ) {
        return true;
      }
    }
    return false;
  }
}
