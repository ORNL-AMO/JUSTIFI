import { Pipe, PipeTransform } from '@angular/core';
import { IdbKeyPerformanceIndicator } from 'src/app/models/keyPerformanceIndicator';

@Pipe({
    name: 'kpiLabel',
    standalone: false
})
export class KpiLabelPipe implements PipeTransform {

  transform(kpiGuid: string, keyPerformanceIndicators: Array<IdbKeyPerformanceIndicator>): string {

    let findOption: IdbKeyPerformanceIndicator = keyPerformanceIndicators.find(option => { return option.guid == kpiGuid });
    if (findOption) {
      return findOption.htmlLabel;
    }
    return '';
  }

}
