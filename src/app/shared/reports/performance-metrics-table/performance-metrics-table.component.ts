import { Component, Input, SimpleChanges } from '@angular/core';
import { KeyPerformanceIndicatorReport, KeyPerformanceMetricReportItem } from '../calculations/keyPerformanceIndicatorReport';
import { IdbKeyPerformanceIndicator } from 'src/app/models/keyPerformanceIndicator';
import { KeyPerformanceIndicatorsIdbService } from 'src/app/indexed-db/key-performance-indicators-idb.service';
import { OrderMetricsTableFields } from './performance-metrics-table.pipe';
import { Subscription } from 'rxjs';
import { LocaleService } from '../../shared-services/locale.service';
import * as _ from 'lodash';

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

  kpmRevenueReports: Array<KeyPerformanceMetricReportItem>;
  totalRevenue: number;
  kpmCostSavingsReports: Array<KeyPerformanceMetricReportItem>;
  totalCostSavings: number;
  qualitativeReports: Array<KeyPerformanceMetricReportItem>;

  constructor(
    private localeService: LocaleService,
  ) { }

  ngOnInit() {
    this.currencySub = this.localeService.currencyCode.subscribe(code => {
      this.currencyCode = code;
    });
    this.setReports();
  }

  ngOnDestroy() {
    this.currencySub.unsubscribe();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['keyPerformanceIndicatorReport'] && !changes['keyPerformanceIndicatorReport'].firstChange) {
      this.setReports();
    }
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

  setReports() {
    this.kpmRevenueReports = new Array();
    this.kpmCostSavingsReports = new Array();
    this.qualitativeReports = new Array();
    if (this.keyPerformanceIndicatorReport) {
      this.keyPerformanceIndicatorReport.kpmReportItems.forEach(reportItem => {
        if (reportItem.keyPerformanceMetric.isQuantitative) {
          if (reportItem.keyPerformanceMetric.goalToIncrease) {
            this.kpmRevenueReports.push(reportItem);
          } else {
            this.kpmCostSavingsReports.push(reportItem);
          }
        } else {
          this.qualitativeReports.push(reportItem);
        }
      });
      this.totalCostSavings = _.sumBy(this.kpmCostSavingsReports, (reportItem: KeyPerformanceMetricReportItem) => {
        return reportItem.performanceMetricImpact.costAdjustment
      })
      this.totalRevenue = _.sumBy(this.kpmRevenueReports, (reportItem: KeyPerformanceMetricReportItem) => {
        return reportItem.performanceMetricImpact.costAdjustment
      })
    }
  }
}
