import { Pipe, PipeTransform } from '@angular/core';
import { IdbEnergyEquipment } from 'src/app/models/energyEquipment';

@Pipe({
    name: 'energyEquipmentList',
    standalone: false
})
export class EnergyEquipmentListPipe implements PipeTransform {

  transform(contextGuid: string, context: 'facility' | 'company', allEquipments: Array<IdbEnergyEquipment>): Array<IdbEnergyEquipment> {
    if (context == 'facility') {
      return allEquipments.filter(equipment => {
        return equipment.facilityId == contextGuid;
      });
    } else if (context == 'company') {
      return allEquipments.filter(equipment => {
        return equipment.companyId == contextGuid;
      });
    }
    return [];
  }

}
