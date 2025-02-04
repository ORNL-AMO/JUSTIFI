import { Pipe, PipeTransform } from '@angular/core';
import { IdbProcessEquipment } from 'src/app/models/processEquipment';

@Pipe({
    name: 'processEquipmentList',
    standalone: false
})
export class ProcessEquipmentListPipe implements PipeTransform {

transform(contextGuid: string, context: 'facility' | 'company', allEquipments: Array<IdbProcessEquipment>): Array<IdbProcessEquipment> {
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
