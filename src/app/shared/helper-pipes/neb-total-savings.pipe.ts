import { Pipe, PipeTransform } from '@angular/core';
import { IdbKeyPerformanceMetricImpact } from 'src/app/models/keyPerformanceMetricImpact';

@Pipe({
    name: 'nebTotalSavings',
    standalone: false
})
export class NebTotalSavingsPipe implements PipeTransform {

  transform(nebGuid: string, performanceMetricImpacts: Array<IdbKeyPerformanceMetricImpact>): number {
    let associatedImpacts: Array<IdbKeyPerformanceMetricImpact> = performanceMetricImpacts.filter(kpmImpact => {
      return kpmImpact.nebId == nebGuid;
    });
    let totalSavings: number = 0;
    associatedImpacts.forEach(impact => {
      if (isNaN(impact.costAdjustment) == false) {
        totalSavings += impact.costAdjustment;
      }
    })
    return totalSavings;
  }

}
