import { Pipe, PipeTransform } from '@angular/core';
import { IdbKeyPerformanceIndicator } from 'src/app/models/keyPerformanceIndicator';
import { KeyPerformanceIndicatorOption, KeyPerformanceIndicatorOptions, KeyPerformanceIndicatorValue } from '../constants/keyPerformanceIndicatorOptions';

@Pipe({
    name: 'kpiValueDisplay',
    standalone: false
})
export class KpiValueDisplayPipe implements PipeTransform {

  transform(kpiValue: KeyPerformanceIndicatorValue, keyPerformanceIndicators?: Array<IdbKeyPerformanceIndicator>): string {
    if (keyPerformanceIndicators) {
      let findOption: IdbKeyPerformanceIndicator = keyPerformanceIndicators.find(option => { return option.optionValue == kpiValue });
      if (findOption) {
        return findOption.htmlLabel;
      }else{
        let findOption: KeyPerformanceIndicatorOption = KeyPerformanceIndicatorOptions.find(option => { return option.optionValue == kpiValue });
        if (findOption) {
          return findOption.htmlLabel;
        }
      }
    }else{
      let findOption: KeyPerformanceIndicatorOption = KeyPerformanceIndicatorOptions.find(option => { return option.optionValue == kpiValue });
      if (findOption) {
        return findOption.htmlLabel;
      }
    }
    return '';
  }

}
