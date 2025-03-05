import { Pipe, PipeTransform } from '@angular/core';
import { IdbProcessEquipment } from 'src/app/models/processEquipment';

@Pipe({
  name: 'includesProcessEquipment',
  pure: false,
  standalone: false
})
export class IncludesProcessEquipmentPipe implements PipeTransform {


  transform(guid: string, context: 'energyOpportunity' | 'energyEquipment' | 'processEquipment' | 'assessment', equipment: IdbProcessEquipment): boolean {
    if (context == 'energyOpportunity' && equipment.energyOpportunityIds.includes(guid)) {
      return true;
    } else if (context == 'energyEquipment' && equipment.energyEquipmentIds.includes(guid)) {
      return true;
    } else if (context == 'assessment' && equipment.assessmentIds.includes(guid)) {
      return true;
    }
    return null;
  }

}
