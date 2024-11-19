import { Pipe, PipeTransform } from '@angular/core';
import { KeyPerformanceMetric, KeyPerformanceMetricOption, KeyPerformanceMetricValue } from '../constants/keyPerformanceMetrics';

@Pipe({
  name: 'kpmLabel'
})
export class KpmLabelPipe implements PipeTransform {

  transform(guidOrValue: string | KeyPerformanceMetricValue, keyPerformanceMetrics: Array<KeyPerformanceMetric | KeyPerformanceMetricOption>, context: 'guid' | 'metricValue'): string {
    if (context == 'guid') {
      let kpm: KeyPerformanceMetric = keyPerformanceMetrics.find(kpm => {
        let metric: KeyPerformanceMetric = kpm as KeyPerformanceMetric;
        return metric.guid == guidOrValue
      }) as KeyPerformanceMetric;
      if (kpm) {
        return kpm.htmlLabel;
      }
    }else if(context == 'metricValue'){
      let kpm: KeyPerformanceMetricOption = keyPerformanceMetrics.find(kpm => {
        let metric: KeyPerformanceMetricOption = kpm as KeyPerformanceMetricOption;
        return metric.value == guidOrValue
      }) as KeyPerformanceMetricOption;
      if (kpm) {
        return kpm.htmlLabel;
      }
    }
    return '';
  }

}
