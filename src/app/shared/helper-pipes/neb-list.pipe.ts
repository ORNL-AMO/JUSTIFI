import { Pipe, PipeTransform } from '@angular/core';
import { IdbNonEnergyBenefit } from 'src/app/models/nonEnergyBenefit';

@Pipe({
    name: 'nebList',
    standalone: false
})
export class NebListPipe implements PipeTransform {

  transform(contextGUID: string, context: 'assessment' | 'energyOpportunity', nonEnergyBenefits: Array<IdbNonEnergyBenefit>, filterEnergyOppNebs?: boolean): Array<IdbNonEnergyBenefit> {
    if (context == 'assessment') {
      if(filterEnergyOppNebs){
        return nonEnergyBenefits.filter(neb => {
          return neb.assessmentId == contextGUID && neb.energyOpportunityId == undefined
        });
      }
      return nonEnergyBenefits.filter(neb => {
        return neb.assessmentId == contextGUID
      });
    } else if (context == 'energyOpportunity') {
      return nonEnergyBenefits.filter(neb => {
        return neb.energyOpportunityId == contextGUID;
      });
    }
    return [];
  }

}
