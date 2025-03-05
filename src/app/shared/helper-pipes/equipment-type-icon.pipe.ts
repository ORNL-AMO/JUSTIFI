import { Pipe, PipeTransform } from '@angular/core';
import { IconDefinition, faArrowUpFromWaterPump, faBarsStaggered, faCar, faCube, faFan, faFireFlameSimple, faLightbulb, faWater, faWind } from '@fortawesome/free-solid-svg-icons';
import { EquipmentType } from '../constants/equipmentTypes';
import { IdbEnergyEquipment } from 'src/app/models/energyEquipment';

@Pipe({
    name: 'equipmentTypeIcon',
    standalone: false
})
export class EquipmentTypeIconPipe implements PipeTransform {

  transform(energyEquipmentGuid: string, energyEquipments: Array<IdbEnergyEquipment>): IconDefinition {
    let energyEquipment: IdbEnergyEquipment = energyEquipments.find(equipment => {
      return equipment.guid == energyEquipmentGuid;
    });
    let equipmentType: EquipmentType = energyEquipment?.equipmentType;
    if (!equipmentType) {
      return faCube;
    } else if (equipmentType == 'HVAC') {
      return faWind;
    } else if (equipmentType == 'Fan') {
      return faFan;
    } else if (equipmentType == 'Process Heating') {
      return faFireFlameSimple;
    } else if (equipmentType == 'Pump') {
      return faArrowUpFromWaterPump;
    } else if (equipmentType == 'Steam') {
      return faBarsStaggered;
    } else if(equipmentType == 'Mobile'){
      return faCar;
    } else if(equipmentType == 'Lighting'){
      return faLightbulb;
    } else if(equipmentType == 'Process Cooling'){
      return faWater;
    }
    return faCube;
  }

}
