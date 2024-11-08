import { Pipe, PipeTransform } from '@angular/core';
import { KeyPerformanceMetric, KeyPerformanceMetricOption } from 'src/app/shared/constants/keyPerformanceMetrics';
import * as _ from 'lodash';

@Pipe({
  name: 'metricOptionsModalList'
})
export class MetricOptionsModalListPipe implements PipeTransform {

  transform(options: Array<KeyPerformanceMetric>, searchStr: string, orderByDir: 'asc' | 'desc'): Array<KeyPerformanceMetric> {
    let filteredOptions: Array<KeyPerformanceMetric> = options;
    if (searchStr) {
      filteredOptions = filteredOptions.filter(option => {
        return option.label.toLowerCase().includes(searchStr.toLowerCase());
      });
    }
    return _.orderBy(filteredOptions, (option: KeyPerformanceMetric) => {
      return option.label;
    }, orderByDir);
  }

}
