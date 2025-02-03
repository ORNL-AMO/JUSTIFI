import { Pipe, PipeTransform } from '@angular/core';
import { KeyPerformanceIndicatorValue } from 'src/app/shared/constants/keyPerformanceIndicatorOptions';
import { KeyPerformanceMetric, KeyPerformanceMetricOption, KeyPerformanceMetricOptions } from 'src/app/shared/constants/keyPerformanceMetrics';
import * as _ from 'lodash';

@Pipe({
    name: 'kpiMetricsList',
    standalone: false
})
export class KpiMetricsListPipe implements PipeTransform {

  transform(optionValue: KeyPerformanceIndicatorValue): Array<KeyPerformanceMetricOption> {
    let keyPerformanceMetrics: Array<KeyPerformanceMetricOption> = KeyPerformanceMetricOptions;
    if (optionValue != 'other') {
      keyPerformanceMetrics = keyPerformanceMetrics.filter(performanceMetric => {
        return performanceMetric.kpiValue == optionValue
      });
    }else{
      keyPerformanceMetrics = [];
    }
    return _.orderBy(keyPerformanceMetrics, (kpm: KeyPerformanceMetric) => {
      return kpm.label
    }, 'asc');
  }

}
