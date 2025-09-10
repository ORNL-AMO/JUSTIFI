import { Component, Input, SimpleChanges } from '@angular/core';
import { KeyPerformanceIndicatorReport, KeyPerformanceMetricReportItem } from '../calculations/keyPerformanceIndicatorReport';
import { Subscription } from 'rxjs';
import { LocaleService } from '../../shared-services/locale.service';
import { PowerpointReportGeneratorService } from '../../shared-services/powerpoint-report-generator.service';

@Component({
  selector: 'app-performance-metrics-impacts-table',
  standalone: false,

  templateUrl: './performance-metrics-impacts-table.component.html',
  styleUrl: './performance-metrics-impacts-table.component.css'
})
export class PerformanceMetricsImpactsTableComponent {
  @Input({ required: true })
  keyPerformanceIndicatorReport: KeyPerformanceIndicatorReport;

  orderByDir: 'asc' | 'desc' = 'desc';
  orderByField: OrderMetricsImpactTableFields = 'percentChange';

  currencyCode: string;
  currencySub: Subscription;

  kpmImpactsReports: Array<KpmImpactsReportItem>;
  constructor(
    private localeService: LocaleService,
    private powerpointReportGeneratorService: PowerpointReportGeneratorService

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

  setOrderByField(orderByField: OrderMetricsImpactTableFields) {
    if (orderByField == this.orderByField) {
      this.toggleOrderBy();
    } else {
      this.orderByField = orderByField;
    }
    this.powerpointReportGeneratorService.setOrder(this.orderByDir, this.orderByField);
  }

  toggleOrderBy() {
    if (this.orderByDir == 'asc') {
      this.orderByDir = 'desc';
    } else {
      this.orderByDir = 'asc';
    }
  }

  setReports() {
    this.kpmImpactsReports = new Array();
    if (this.keyPerformanceIndicatorReport) {
      this.keyPerformanceIndicatorReport.kpmReportItems.forEach(reportItem => {
        let isCurrency: boolean = true;
        let baselineValue: number = reportItem.keyPerformanceMetric.baselineCost;
        let impact: number = reportItem.performanceMetricImpact.modificationValue;
        let goalToIncrease: boolean = reportItem.keyPerformanceMetric.goalToIncrease;
        let potential: number = reportItem.performanceMetricImpact.modifiedCost;
        if (reportItem.keyPerformanceMetric.calculationMethod == 'costPerUnit') {
          isCurrency = false;
          baselineValue = reportItem.keyPerformanceMetric.baselineValue;
          if (goalToIncrease) {
            potential = reportItem.keyPerformanceMetric.baselineValue + reportItem.performanceMetricImpact.modificationValue;
          } else {
            potential = reportItem.keyPerformanceMetric.baselineValue - reportItem.performanceMetricImpact.modificationValue;
          }
        } else if (reportItem.keyPerformanceMetric.calculationMethod == 'percentTotal') {
          impact = reportItem.keyPerformanceMetric.baselineCost - reportItem.performanceMetricImpact.modifiedCost
        }
        let percentChange: number = (impact / baselineValue) * 100;
        if (percentChange > 10) {
          //round to 1 decimal place if over 10%
          percentChange = Number(percentChange.toFixed(1));
        } else {
          //round to 2 decimal places if under 10%
          percentChange = Number(percentChange.toFixed(2));
        }

        this.kpmImpactsReports.push({
          label: reportItem.keyPerformanceMetric.htmlLabel,
          current: baselineValue,
          impact: impact,
          potential: potential,
          percentChange: percentChange,
          units: reportItem.keyPerformanceMetric.totalUnit,
          isCurrency: isCurrency,
          goalToIncrease: reportItem.keyPerformanceMetric.goalToIncrease
        })
      });
    }
  }
}


export interface KpmImpactsReportItem {
  label: string,
  current: number,
  impact: number,
  potential: number,
  percentChange: number,
  units: string,
  isCurrency: boolean,
  goalToIncrease: boolean
}

export type OrderMetricsImpactTableFields = 'current' | 'impact' | 'potential' | 'percentChange' | 'label'