import { Pipe, PipeTransform } from '@angular/core';
import { KeyPerformanceIndicatorReportItem } from '../calculations/keyPerformanceIndicatorReport';
import * as _ from 'lodash';

@Pipe({
  name: 'performanceMetricsTable',
  standalone: false
})
export class PerformanceMetricsTablePipe implements PipeTransform {

  transform(kpiReportItems: Array<KeyPerformanceIndicatorReportItem>, orderByField: OrderMetricsTableFields, orderByDir: 'asc' | 'desc'): Array<KeyPerformanceIndicatorReportItem> {
    if (orderByField == 'baselineCost' || orderByField == 'kpiValue' || orderByField == 'htmlLabel') {
      return _.orderBy(kpiReportItems, (item: KeyPerformanceIndicatorReportItem) => {
        return item.keyPerformanceMetric[orderByField];
      }, orderByDir)
    } else if (orderByField == 'costAdjustment' || orderByField == 'percentSavings' || orderByField == 'modifiedCost') {
      return _.orderBy(kpiReportItems, (item: KeyPerformanceIndicatorReportItem) => {
        return item.performanceMetricImpact[orderByField];
      }, orderByDir)
    }
    return kpiReportItems;
  }

}

export type OrderMetricsTableFields = 'baselineCost' | 'kpiValue' | 'htmlLabel' | 'costAdjustment' | 'modifiedCost' | 'percentSavings'