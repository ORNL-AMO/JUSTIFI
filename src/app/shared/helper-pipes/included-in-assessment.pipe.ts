import { Pipe, PipeTransform } from '@angular/core';
import { IdbEnergyEquipment } from 'src/app/models/energyEquipment';
import { IdbEnergyOpportunity } from 'src/app/models/energyOpportunity';
import { IdbProcessEquipment } from 'src/app/models/processEquipment';

@Pipe({
  name: 'includedInAssessment',
  standalone: false
})
export class IncludedInAssessmentPipe implements PipeTransform {

  transform(equipment: IdbEnergyEquipment | IdbProcessEquipment, assessmentId: string, energyOpportunities: Array<IdbEnergyOpportunity>): boolean {
    let inAssessment: boolean = equipment.assessmentIds.includes(assessmentId);
    if (inAssessment) {
      return true;
    } else {
      let assessmentEnergyOpps: Array<IdbEnergyOpportunity> = energyOpportunities.filter(opp => {
        return opp.assessmentId == assessmentId
      });
      let foundOpp: IdbEnergyOpportunity = assessmentEnergyOpps.find(opp => {
        return equipment.energyOpportunityIds.includes(opp.guid);
      });
      if (foundOpp) {
        return true;
      }
    }
    return null;
  }

}
