import { Pipe, PipeTransform } from '@angular/core';
import { ReportOption } from 'src/app/models/report';

@Pipe({
  name: 'kpmImpactReportOptionsList',
  standalone: false
})
export class KpmImpactReportOptionsListPipe implements PipeTransform {


  transform(kpmImpactOptions: Array<ReportOption>, nonEnergyBenefitId: string): Array<ReportOption> {
    return kpmImpactOptions.filter(option => {
      return option.nonEnergyBenefitId == nonEnergyBenefitId;
    });
  }


}
