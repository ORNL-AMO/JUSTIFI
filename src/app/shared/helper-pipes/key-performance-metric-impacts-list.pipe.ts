import { Pipe, PipeTransform } from '@angular/core';
import { IdbKeyPerformanceMetricImpact } from 'src/app/models/keyPerformanceMetricImpact';

@Pipe({
    name: 'keyPerformanceMetricImpactsList',
    standalone: false
})
export class KeyPerformanceMetricImpactsListPipe implements PipeTransform {

  transform(keyPerformanceMetricImpacts: Array<IdbKeyPerformanceMetricImpact>, associatedGuid: string, isKpi?: boolean): Array<IdbKeyPerformanceMetricImpact> {
    if (isKpi) {
      return keyPerformanceMetricImpacts.filter(metricImpact => {
        return metricImpact.kpiGuid == associatedGuid;
      });
    } else {
      return keyPerformanceMetricImpacts.filter(metricImpact => {
        return metricImpact.kpmGuid == associatedGuid;
      });
    }
  }

}
