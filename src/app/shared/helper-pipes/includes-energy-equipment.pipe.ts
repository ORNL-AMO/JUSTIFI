import { Pipe, PipeTransform } from '@angular/core';
import { IdbEnergyEquipment } from 'src/app/models/energyEquipment';

@Pipe({
  name: 'includesEnergyEquipment',
  pure: false,
  standalone: false
})
export class IncludesEnergyEquipmentPipe implements PipeTransform {

  transform(guid: string, context: 'assessment' | 'endUse', equipment: IdbEnergyEquipment): boolean {
    if (context == 'assessment' && equipment.assessmentIds.includes(guid)) {
      return true;
    }
    //TODO: end use
    // else if (context == 'assessment' && contact.assessmentIds.includes(guid)) {
    //   return true;
    // } 
    return null;
  }

}
