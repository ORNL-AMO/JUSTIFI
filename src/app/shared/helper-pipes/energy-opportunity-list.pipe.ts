import { Pipe, PipeTransform } from '@angular/core';
import { IdbEnergyOpportunity } from 'src/app/models/energyOpportunity';

@Pipe({
    name: 'energyOpportunityList',
    pure: false,
    standalone: false
})
export class EnergyOpportunityListPipe implements PipeTransform {

  transform(contextGUID: string, allEnergyOpportunities: Array<IdbEnergyOpportunity>, context: 'company' | 'facility' | 'assessment'): Array<IdbEnergyOpportunity> {
    if (context == 'company') {
      return allEnergyOpportunities.filter(opportunity => { return opportunity.facilityId == contextGUID });
    } else if(context == 'facility') {
      return allEnergyOpportunities.filter(opportunity => { return opportunity.companyId == contextGUID });
    } else if(context == 'assessment') {
      return allEnergyOpportunities.filter(opportunity => { return opportunity.assessmentId == contextGUID });
    }
    return [];
  }

}
