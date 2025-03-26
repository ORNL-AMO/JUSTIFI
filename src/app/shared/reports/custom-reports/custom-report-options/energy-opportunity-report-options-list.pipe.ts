import { Pipe, PipeTransform } from '@angular/core';
import { ReportOption } from 'src/app/models/report';

@Pipe({
  name: 'energyOpportunityReportOptionsList',
  standalone: false
})
export class EnergyOpportunityReportOptionsListPipe implements PipeTransform {

  transform(energyOpportunityOptions: Array<ReportOption>, assessmentId: string): Array<ReportOption> {
    return energyOpportunityOptions.filter(option => {
      return option.assessmentId == assessmentId;
    });
  }

}
