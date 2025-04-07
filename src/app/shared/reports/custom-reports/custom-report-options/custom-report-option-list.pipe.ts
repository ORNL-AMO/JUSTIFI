import { Pipe, PipeTransform } from '@angular/core';
import { ReportOption } from 'src/app/models/report';

@Pipe({
  name: 'customReportOptionList',
  standalone: false
})
export class CustomReportOptionListPipe implements PipeTransform {

  transform(reportOptions: Array<ReportOption>, parentContext: 'energyOpportunity' | 'assessment' | 'nonEnergyBenefit', contextGuid: string): Array<ReportOption> {
    if (parentContext == 'assessment') {
      return reportOptions.filter(option => {
        return option.assessmentId == contextGuid && (!option.energyOpportunityId || option.reportOptionType == 'energyOpportunity');
      });
    } else if (parentContext == 'energyOpportunity') {
      return reportOptions.filter(option => {
        return option.energyOpportunityId == contextGuid
      });
    } else if (parentContext == 'nonEnergyBenefit') {
      return reportOptions.filter(option => {
        return option.nonEnergyBenefitId == contextGuid
      })
    }
    return [];
  }

}
