import { Pipe, PipeTransform } from '@angular/core';
import { ReportOption } from 'src/app/models/report';

@Pipe({
  name: 'nonEnergyBenefitReportOptionsList',
  standalone: false
})
export class NonEnergyBenefitReportOptionsListPipe implements PipeTransform {

  transform(nonEnergyBenefitOptions: Array<ReportOption>,
    contextGuid: string,
    context: 'assessment' | 'energyOpp'
  ): Array<ReportOption> {
    if (context == 'assessment') {
      return nonEnergyBenefitOptions.filter(option => {
        return option.assessmentId == contextGuid && !option.energyOpportunityId
      });
    } else {
      return nonEnergyBenefitOptions.filter(option => {
        return option.energyOpportunityId == contextGuid;
      });
    }
  }

}
