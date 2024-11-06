import { Component, Input } from '@angular/core';
import { KeyPerformanceIndicatorReport } from '../calculations/keyPerformanceIndicatorReport';
import { IdbKeyPerformanceIndicator } from 'src/app/models/keyPerformanceIndicator';
import { KeyPerformanceIndicatorsIdbService } from 'src/app/indexed-db/key-performance-indicators-idb.service';
import { OrderMetricsTableFields } from './performance-metrics-table.pipe';

@Component({
  selector: 'app-performance-metrics-table',
  templateUrl: './performance-metrics-table.component.html',
  styleUrl: './performance-metrics-table.component.css'
})
export class PerformanceMetricsTableComponent {
  @Input({ required: true })
  keyPerformanceIndicatorReport: KeyPerformanceIndicatorReport;


  keyPerformanceIndicators: Array<IdbKeyPerformanceIndicator>;
  orderByDir: 'asc' | 'desc' = 'desc';
  orderByField: OrderMetricsTableFields = 'costAdjustment';
  constructor(private keyPerformanceIndicatorIdbService: KeyPerformanceIndicatorsIdbService) {

  }

  ngOnInit() {
    this.keyPerformanceIndicators = this.keyPerformanceIndicatorIdbService.keyPerformanceIndicators.getValue();
  }

  setOrderByField(orderByField: OrderMetricsTableFields) {
    if (orderByField == this.orderByField) {
      this.toggleOrderBy();
    } else {
      this.orderByField = orderByField;
    }
  }

  toggleOrderBy() {
    if (this.orderByDir == 'asc') {
      this.orderByDir = 'desc';
    } else {
      this.orderByDir = 'asc';
    }
  }
}
