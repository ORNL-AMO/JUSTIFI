import { Pipe, PipeTransform } from '@angular/core';
import { IdbKeyPerformanceIndicator } from 'src/app/models/keyPerformanceIndicator';

@Pipe({
  name: 'facilityKpiList'
})
export class FacilityKpiListPipe implements PipeTransform {

  transform(facilityGuid: string, keyPerformanceIndicators: Array<IdbKeyPerformanceIndicator>): Array<IdbKeyPerformanceIndicator> {
    return keyPerformanceIndicators.filter(kpi => {
      return kpi.companyId == facilityGuid
    });
  }
}
