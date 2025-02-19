import { Pipe, PipeTransform } from '@angular/core';
import { IdbEnergyEquipment } from 'src/app/models/energyEquipment';

@Pipe({
  name: 'includesEnergyEquipment',
  pure: false,
  standalone: false
})
export class IncludesEnergyEquipmentPipe implements PipeTransform {

  transform(guid: string, context: 'assessment' | 'energyEquipment' | 'processEquipment' | 'energyOpportunity', equipment: IdbEnergyEquipment): boolean {
    if (context == 'assessment' && equipment.assessmentIds.includes(guid)) {
      return true;
    }
    else if (context == 'energyEquipment' && equipment.energyEquipmentIds.includes(guid)) {
      return true;
    }
    else if (context == 'processEquipment' && equipment.processEquipmentIds.includes(guid)) {
      return true;
    }
    else if (context == 'energyOpportunity' && equipment.energyOpportunityIds.includes(guid)) {
      return true;
    }
    return null;
  }

}
