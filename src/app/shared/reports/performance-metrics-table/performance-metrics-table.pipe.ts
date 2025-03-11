import { Pipe, PipeTransform } from '@angular/core';
import { KeyPerformanceMetricReportItem } from '../calculations/keyPerformanceIndicatorReport';
import * as _ from 'lodash';

@Pipe({
  name: 'performanceMetricsTable',
  standalone: false
})
export class PerformanceMetricsTablePipe implements PipeTransform {

  transform(kpiReportItems: Array<KeyPerformanceMetricReportItem>, orderByField: OrderMetricsTableFields, orderByDir: 'asc' | 'desc'): Array<KeyPerformanceMetricReportItem> {
    if (orderByField == 'baselineCost' || orderByField == 'kpiValue' || orderByField == 'htmlLabel') {
      return _.orderBy(kpiReportItems, (item: KeyPerformanceMetricReportItem) => {
        return item.keyPerformanceMetric[orderByField];
      }, orderByDir)
    } else if (orderByField == 'costAdjustment' || orderByField == 'percentSavings' || orderByField == 'modifiedCost') {
      return _.orderBy(kpiReportItems, (item: KeyPerformanceMetricReportItem) => {
        return item.performanceMetricImpact[orderByField];
      }, orderByDir)
    }
    return kpiReportItems;
  }

}

export type OrderMetricsTableFields = 'baselineCost' | 'kpiValue' | 'htmlLabel' | 'costAdjustment' | 'modifiedCost' | 'percentSavings'