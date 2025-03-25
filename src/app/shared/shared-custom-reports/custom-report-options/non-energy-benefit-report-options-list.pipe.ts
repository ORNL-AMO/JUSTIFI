import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'nonEnergyBenefitReportOptionsList',
  standalone: false
})
export class NonEnergyBenefitReportOptionsListPipe implements PipeTransform {

  transform(nonEnergyBenefitOptions: Array<{
    include: boolean,
    guid: string,
    energyOpportunityId: string,
    assessmentId: string
  }>,
    contextGuid: string,
    context: 'assessment' | 'energyOpp'
  ): Array<{
    include: boolean,
    guid: string,
    energyOpportunityId: string,
    assessmentId: string
  }> {
    if(context == 'assessment'){
      return nonEnergyBenefitOptions.filter(option => {
        return option.assessmentId == contextGuid && !option.energyOpportunityId
      });
    }else {
      return nonEnergyBenefitOptions.filter(option => {
        return option.energyOpportunityId == contextGuid;
      });
    }
  }

}
