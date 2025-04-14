import { Pipe, PipeTransform } from '@angular/core';
import { IdbKeyPerformanceMetricImpact } from 'src/app/models/keyPerformanceMetricImpact';
import { KeyPerformanceMetric } from '../constants/keyPerformanceMetrics';

@Pipe({
  name: 'kpmImpactLabel',
  standalone: false
})
export class KpmImpactLabelPipe implements PipeTransform {


  transform(kpmImpactGuid: string, keyPerformanceMetricImpact: Array<IdbKeyPerformanceMetricImpact>, keyPerformanceMetrics: Array<KeyPerformanceMetric>): string {
    let metricImpact: IdbKeyPerformanceMetricImpact = keyPerformanceMetricImpact.find(option => { return option.guid == kpmImpactGuid });
    let kpm: KeyPerformanceMetric = keyPerformanceMetrics.find(kpm => { return kpm.guid == metricImpact.kpmGuid });
    if (kpm) {
      return kpm.htmlLabel;
    }
    return '';
  }
}
