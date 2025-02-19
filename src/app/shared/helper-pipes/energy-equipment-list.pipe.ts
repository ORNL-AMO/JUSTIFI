import { Pipe, PipeTransform } from '@angular/core';
import { IdbEnergyEquipment } from 'src/app/models/energyEquipment';

@Pipe({
    name: 'energyEquipmentList',
    standalone: false
})
export class EnergyEquipmentListPipe implements PipeTransform {

  transform(contextGuid: string, context: 'facility' | 'company' | 'assessment' | 'processEquipment' | 'energyEquipment', allEquipments: Array<IdbEnergyEquipment>): Array<IdbEnergyEquipment> {
    if (context == 'facility') {
      return allEquipments.filter(equipment => {
        return equipment.facilityId == contextGuid;
      });
    } else if (context == 'company') {
      return allEquipments.filter(equipment => {
        return equipment.companyId == contextGuid;
      });
    } else if (context == 'assessment') {
      return allEquipments.filter(equipment => {
        return equipment.assessmentIds.includes(contextGuid);
      });
    }else if (context == 'energyEquipment') {
      return allEquipments.filter(equipment => {
        return equipment.energyEquipmentIds.includes(contextGuid);
      });
    }else if (context == 'processEquipment') {
      return allEquipments.filter(equipment => {
        return equipment.processEquipmentIds.includes(contextGuid);
      });
    }
    return [];
  }

}
