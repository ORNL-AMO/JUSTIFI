import { Pipe, PipeTransform } from '@angular/core';
import { NebOption } from '../../shared/constants/nonEnergyBenefitOptions';
import * as _ from 'lodash';
import { KeyPerformanceIndicatorValue } from '../../shared/constants/keyPerformanceIndicatorOptions';
import { KeyPerformanceMetric, KeyPerformanceMetricOption, KeyPerformanceMetricValue } from '../../shared/constants/keyPerformanceMetrics';

@Pipe({
    name: 'nebOptionsFilter',
    pure: false,
    standalone: false
})
export class NebOptionsFilterPipe implements PipeTransform {

  transform(options: Array<NebOption>, orderByDir: 'asc' | 'desc', kpiValue: KeyPerformanceIndicatorValue, kpmValue: KeyPerformanceMetricValue, keyPerformanceMetricOptions: Array<KeyPerformanceMetricOption>, searchStr: string): Array<NebOption> {
    let filteredOptions: Array<NebOption> = options;
    if (searchStr) {
      filteredOptions = filteredOptions.filter(option => {
        return option.label.toLowerCase().includes(searchStr.toLowerCase()) || option.selected;
      });
    }
    if (kpmValue) {
      filteredOptions = filteredOptions.filter(option => {
        return option.KPM.includes(kpmValue) || option.selected;
      })
    } else if (kpiValue) {
      let kpmOptionValues: Array<KeyPerformanceMetricValue> = keyPerformanceMetricOptions.map(option => {
        return option.value;
      })
      filteredOptions = filteredOptions.filter(option => {
        return option.selected || option.KPM.findIndex(kpmOptionValue => {
          return kpmOptionValues.includes(kpmOptionValue)
        }) != -1;
      })
    }
    return _.orderBy(filteredOptions, (option: NebOption) => {
      return option.label;
    }, orderByDir);
  }

}
