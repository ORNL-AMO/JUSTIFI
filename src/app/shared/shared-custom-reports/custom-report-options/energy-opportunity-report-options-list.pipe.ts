import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'energyOpportunityReportOptionsList',
  standalone: false
})
export class EnergyOpportunityReportOptionsListPipe implements PipeTransform {

  transform(energyOpportunityOptions: Array<{ include: boolean, guid: string, assessmentId: string }>, assessmentId: string): Array<{ include: boolean, guid: string, assessmentId: string }> {
    return energyOpportunityOptions.filter(option => {
      return option.assessmentId == assessmentId;
    });
  }

}
