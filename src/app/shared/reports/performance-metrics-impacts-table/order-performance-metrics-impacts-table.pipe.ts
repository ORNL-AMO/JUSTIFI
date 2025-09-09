import { Pipe, PipeTransform } from '@angular/core';
import * as _ from 'lodash';
import { KpmImpactsReportItem, OrderMetricsImpactTableFields } from './performance-metrics-impacts-table.component';

@Pipe({
  name: 'orderPerformanceMetricsImpactsTable',
  standalone: false
})
export class OrderPerformanceMetricsImpactsTablePipe implements PipeTransform {

  transform(kpiReportItems: Array<KpmImpactsReportItem>, orderByField: OrderMetricsImpactTableFields, orderByDir: 'asc' | 'desc'): Array<KpmImpactsReportItem> {
    return _.orderBy(kpiReportItems, (item: KpmImpactsReportItem) => {
      return item[orderByField];
    }, orderByDir)
  }

}

