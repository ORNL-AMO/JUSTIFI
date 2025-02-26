import { Component, Input } from '@angular/core';
import { KeyPerformanceIndicatorReport } from '../calculations/keyPerformanceIndicatorReport';
import { IdbKeyPerformanceIndicator } from 'src/app/models/keyPerformanceIndicator';
import { KeyPerformanceIndicatorsIdbService } from 'src/app/indexed-db/key-performance-indicators-idb.service';
import { OrderMetricsTableFields } from './performance-metrics-table.pipe';
import { Subscription } from 'rxjs';
import { LocaleService } from '../../shared-services/locale.service';

@Component({
    selector: 'app-performance-metrics-table',
    templateUrl: './performance-metrics-table.component.html',
    styleUrl: './performance-metrics-table.component.css',
    standalone: false
})
export class PerformanceMetricsTableComponent {
  @Input({ required: true })
  keyPerformanceIndicatorReport: KeyPerformanceIndicatorReport;


  keyPerformanceIndicators: Array<IdbKeyPerformanceIndicator>;
  orderByDir: 'asc' | 'desc' = 'desc';
  orderByField: OrderMetricsTableFields = 'costAdjustment';

  currencyCode: string;
  currencySub: Subscription;
  
  constructor(
    private keyPerformanceIndicatorIdbService: KeyPerformanceIndicatorsIdbService,
    private localeService: LocaleService,
  ) { }

  ngOnInit() {
    this.keyPerformanceIndicators = this.keyPerformanceIndicatorIdbService.keyPerformanceIndicators.getValue();
    this.currencySub = this.localeService.currencyCode.subscribe(code => {
      this.currencyCode = code;
    });
  }

  ngOnDestroy() {
    this.currencySub.unsubscribe();
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
