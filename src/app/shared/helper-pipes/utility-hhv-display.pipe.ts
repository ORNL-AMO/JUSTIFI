import { Pipe, PipeTransform } from '@angular/core';
import { UtilityType } from '../constants/utilityTypes';

@Pipe({
  name: 'utilityHhvDisplay',
})
export class UtilityHhvDisplayPipe implements PipeTransform {

  transform(utilityType: UtilityType): string {
    if (utilityType === 'Steam') {
      return 'Enthalpy';
    } else if (utilityType === 'Compressed Air') {
      return 'Specific Power';
    } else {
      return 'Higher Heating Value';
    }
  }

}
