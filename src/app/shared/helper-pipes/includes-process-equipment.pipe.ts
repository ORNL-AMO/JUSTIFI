import { Pipe, PipeTransform } from '@angular/core';
import { IdbProcessEquipment } from 'src/app/models/processEquipment';

@Pipe({
  name: 'includesProcessEquipment',
  pure: false,
  standalone: false
})
export class IncludesProcessEquipmentPipe implements PipeTransform {


  transform(guid: string, context: 'energyOpportunity' | 'industrialSystem', equipment: IdbProcessEquipment): boolean {
    if (context == 'energyOpportunity' && equipment.energyOpportunityIds.includes(guid)) {
      return true;
    }
    //TODO: end use
    // else if (context == 'assessment' && contact.assessmentIds.includes(guid)) {
    //   return true;
    // } 
    return null;
  }

}
