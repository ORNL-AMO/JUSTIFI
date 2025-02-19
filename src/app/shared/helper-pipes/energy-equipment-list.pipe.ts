import { Pipe, PipeTransform } from '@angular/core';
import { IdbEnergyEquipment } from 'src/app/models/energyEquipment';
import { IdbEnergyOpportunity } from 'src/app/models/energyOpportunity';
import { IdbProcessEquipment } from 'src/app/models/processEquipment';
import * as _ from 'lodash';

@Pipe({
  name: 'energyEquipmentList',
  standalone: false
})
export class EnergyEquipmentListPipe implements PipeTransform {

  transform(contextGuid: string, context: 'facility' | 'company' | 'assessment' | 'processEquipment' | 'energyEquipment' | 'energyOpportunity', allEquipments: Array<IdbEnergyEquipment>, energyOpportunities?: Array<IdbEnergyOpportunity>): Array<IdbEnergyEquipment> {
    if (context == 'facility') {
      return allEquipments.filter(equipment => {
        return equipment.facilityId == contextGuid;
      });
    } else if (context == 'company') {
      return allEquipments.filter(equipment => {
        return equipment.companyId == contextGuid;
      });
    } else if (context == 'assessment') {
      let filteredEquipment: Array<IdbEnergyEquipment> = allEquipments.filter(equipment => {
        return equipment.assessmentIds.includes(contextGuid);
      })
      if (energyOpportunities) {
        let assessmentEnergyOpps: Array<IdbEnergyOpportunity> = energyOpportunities.filter(opportunity => {
          return opportunity.assessmentId == contextGuid;
        });
        let assessmentEnergyOpIds: Array<string> = assessmentEnergyOpps.map(opp => {
          return opp.guid
        });
        assessmentEnergyOpIds.forEach(oppId => {
          let tmpFilteredEquipment: Array<IdbEnergyEquipment> = allEquipments.filter(equipment => {
            return equipment.energyOpportunityIds.includes(oppId);
          });
          filteredEquipment = filteredEquipment.concat(tmpFilteredEquipment);
        });
        return _.uniqBy(filteredEquipment, (equipment: IdbProcessEquipment) => {
          return equipment.guid
        });
      }
      return filteredEquipment;
    } else if (context == 'energyEquipment') {
      return allEquipments.filter(equipment => {
        return equipment.energyEquipmentIds.includes(contextGuid);
      });
    } else if (context == 'processEquipment') {
      return allEquipments.filter(equipment => {
        return equipment.processEquipmentIds.includes(contextGuid);
      });
    } else if (context == 'energyOpportunity') {
      return allEquipments.filter(equipment => {
        return equipment.energyOpportunityIds.includes(contextGuid);
      });
    }
    return [];
  }

}
