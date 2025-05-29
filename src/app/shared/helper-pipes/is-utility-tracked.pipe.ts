import { Pipe, PipeTransform } from '@angular/core';
import { UnitSettings } from 'src/app/models/unitSettings';

@Pipe({
  name: 'isUtilityTracked',
  standalone: false
})
export class IsUtilityTrackedPipe implements PipeTransform {

  transform(utilityType: string, unitSettings: UnitSettings): boolean {
    if (utilityType) {
      let trimmed = utilityType.replace(/\s+/g, '');
      return unitSettings[`include${trimmed}`];
    }
    return false;
  }

}
