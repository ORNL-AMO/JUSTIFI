import { Pipe, PipeTransform } from '@angular/core';
import { IdbKeyPerformanceMetricImpact } from 'src/app/models/keyPerformanceMetricImpact';

@Pipe({
    name: 'associatedPerformanceMetricImpacts',
    standalone: false
})
export class AssociatedPerformanceMetricImpactsPipe implements PipeTransform {

  transform(guid: string, keyPerformanceMetricImpacts: Array<IdbKeyPerformanceMetricImpact>): Array<IdbKeyPerformanceMetricImpact> {
    return keyPerformanceMetricImpacts.filter(kpmImpact => {
      return kpmImpact.nebId == guid;
    });
  }

}
