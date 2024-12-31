import { Pipe, PipeTransform } from '@angular/core';
import { IdbKeyPerformanceIndicator } from 'src/app/models/keyPerformanceIndicator';

@Pipe({
  name: 'selectedKpiOption'
})
export class SelectedKpiOptionPipe implements PipeTransform {

  transform(optionValue: string, keyPerformanceIndicators: Array<IdbKeyPerformanceIndicator>, facilityId: string): boolean {
    return keyPerformanceIndicators.find(kpi => {
      return kpi.optionValue == optionValue && kpi.facilityId == facilityId
    }) != undefined;
  }

}
