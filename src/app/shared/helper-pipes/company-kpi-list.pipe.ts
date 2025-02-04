import { Pipe, PipeTransform } from '@angular/core';
import { IdbKeyPerformanceIndicator } from 'src/app/models/keyPerformanceIndicator';

@Pipe({
    name: 'companyKpiList',
    standalone: false
})
export class CompanyKpiListPipe implements PipeTransform {

  transform(companyGuid: string, keyPerformanceIndicators: Array<IdbKeyPerformanceIndicator>): Array<IdbKeyPerformanceIndicator> {
    return keyPerformanceIndicators.filter(kpi => {
      return kpi.companyId == companyGuid
    });
  }

}
