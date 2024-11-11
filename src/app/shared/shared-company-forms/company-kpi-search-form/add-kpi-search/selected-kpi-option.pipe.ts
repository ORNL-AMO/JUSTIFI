import { Pipe, PipeTransform } from '@angular/core';
import { IdbKeyPerformanceIndicator } from 'src/app/models/keyPerformanceIndicator';

@Pipe({
  name: 'selectedKpiOption'
})
export class SelectedKpiOptionPipe implements PipeTransform {

  transform(optionValue: string, keyPerformanceIndicators: Array<IdbKeyPerformanceIndicator>, companyGuid: string): boolean {
    return keyPerformanceIndicators.find(kpi => {
      return kpi.optionValue == optionValue && kpi.companyId == companyGuid
    }) != undefined;
  }

}
