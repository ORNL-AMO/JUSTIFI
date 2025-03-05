import { Pipe, PipeTransform } from '@angular/core';
import { IdbEnergyOpportunity } from 'src/app/models/energyOpportunity';
import { IdbProcessEquipment } from 'src/app/models/processEquipment';
import * as _ from 'lodash';
@Pipe({
  name: 'processEquipmentList',
  standalone: false
})
export class ProcessEquipmentListPipe implements PipeTransform {

  transform(contextGuid: string, context: 'facility' | 'company' | 'energyOpportunity' | 'energyEquipment' | 'assessment' | 'processEquipment', allEquipments: Array<IdbProcessEquipment>, energyOpportunities?: Array<IdbEnergyOpportunity>): Array<IdbProcessEquipment> {
    if (context == 'facility') {
      return allEquipments.filter(equipment => {
        return equipment.facilityId == contextGuid;
      });
    } else if (context == 'company') {
      return allEquipments.filter(equipment => {
        return equipment.companyId == contextGuid;
      });
    } else if (context == 'energyOpportunity') {
      return allEquipments.filter(equipment => {
        return equipment.energyOpportunityIds.includes(contextGuid);
      });
    } else if (context == 'assessment') {
      let filteredEquipment: Array<IdbProcessEquipment> = allEquipments.filter(equipment => {
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
          let tmpFilteredEquipment: Array<IdbProcessEquipment> = allEquipments.filter(equipment => {
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
    }
    return [];
  }

}
