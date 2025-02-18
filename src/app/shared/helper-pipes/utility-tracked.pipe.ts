import { Pipe, PipeTransform } from '@angular/core';
import { IdbFacility } from 'src/app/models/facility';
import { UtilityOptions } from '../constants/utilityTypes';

@Pipe({
  name: 'utilityTracked',
  standalone: false,
})
export class UtilityTrackedPipe implements PipeTransform {

  transform(utilityCategory: string, facility: IdbFacility): boolean {
    if (utilityCategory === 'energy') {
      for (const option of UtilityOptions) {
        let utilityType = option.utilityType;
        if (utilityType !== 'Water' && utilityType !== 'Waste Water') {
          let trimmedType = utilityType.replace(/\s+/g, '');
          if (facility.unitSettings[`include${trimmedType}`]) {
            return true;
          }
        }
      }
    } else if (utilityCategory === 'water') {
      if (facility.unitSettings[`includeWater`] ||
        facility.unitSettings[`includeWasteWater`]
      ) {
        return true;
      }
    }
    return false;
  }
}
