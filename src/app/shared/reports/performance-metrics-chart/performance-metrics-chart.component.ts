import { Component, ElementRef, Input, SimpleChanges, ViewChild } from '@angular/core';
import { PlotlyService } from 'angular-plotly.js';
import { KeyPerformanceIndicatorReport, KeyPerformanceMetricReportItem } from '../calculations/keyPerformanceIndicatorReport';
import * as _ from 'lodash';
import { LocaleService } from '../../shared-services/locale.service';
import { CurrencyPipe } from '@angular/common';
import { Subscription } from 'rxjs';
import { localeCurrency } from '../../constants/localeCurrency';
@Component({
  selector: 'app-performance-metrics-chart',
  templateUrl: './performance-metrics-chart.component.html',
  styleUrl: './performance-metrics-chart.component.css',
  standalone: false
})
export class PerformanceMetricsChartComponent {
  @Input({ required: true })
  keyPerformanceIndicatorReport: KeyPerformanceIndicatorReport;

  @ViewChild('performanceMetricsChart', { static: false }) performanceMetricsChart: ElementRef;

  currencySub: Subscription;
  currencySymbol: string;
  currencyUnicode: string;
  constructor(private plotlyService: PlotlyService,
    private localeService: LocaleService,
    private currencyPipe: CurrencyPipe
  ) {
  }

  ngOnInit() {
    this.currencySub = this.localeService.currencyCode.subscribe(currencyCode => {
      this.currencySymbol = this.currencyPipe
        .transform(0, currencyCode, 'symbol', '1.0-0')
        .replace(/[0-9\.\,]/g, '')
        .trim();
      this.currencyUnicode = localeCurrency.find(option => {
        return option.currencyCode == currencyCode
      }).unicode;
      this.drawChart();
    })
  }

  ngOnDestroy() {
    this.currencySub.unsubscribe();
  }

  ngAfterViewInit() {
    if (this.keyPerformanceIndicatorReport) {
      this.drawChart();
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (!changes['keyPerformanceIndicatorReport'].isFirstChange()) {
      this.drawChart();
    }
  }

  drawChart() {
    if (this.performanceMetricsChart) {
      let kpmReportItems: Array<KeyPerformanceMetricReportItem> = this.keyPerformanceIndicatorReport.kpmReportItems.filter(kpmReportItem => {
        return kpmReportItem.keyPerformanceMetric.isQuantitative && kpmReportItem.keyPerformanceMetric.baselineCost
      });
      kpmReportItems = _.orderBy(kpmReportItems, (reportItem: KeyPerformanceMetricReportItem) => {
        return reportItem.keyPerformanceMetric.baselineCost;
      }, 'desc')

      var trace1 = {
        y: kpmReportItems.map(kpmReport => {
          return kpmReport.keyPerformanceMetric.label
        }),
        x: kpmReportItems.map(kpmReportItem => {
          return kpmReportItem.keyPerformanceMetric.baselineCost
        }),
        text: kpmReportItems.map(kpmReportItems => {
          return kpmReportItems.keyPerformanceMetric.baselineCost
        }),
        texttemplate: this.currencyUnicode + "%{text:,.0f}",
        name: 'Baseline Cost',
        type: 'bar',
        marker: {
          color: '#e67e22'
        },
        orientation: 'h'
      };

      var trace2 = {
        y: kpmReportItems.map(kpiReport => {
          return kpiReport.keyPerformanceMetric.label
        }),
        x: kpmReportItems.map(kpiReportItem => {
          return kpiReportItem.performanceMetricImpact.costAdjustment
        }),
        text: kpmReportItems.map(kpmReportItems => {
          return kpmReportItems.performanceMetricImpact.costAdjustment
        }),
        texttemplate: this.currencyUnicode + "%{text:,.0f}",
        name: 'Annual Savings',
        type: 'bar',
        marker: {
          color: '#196f3d'
        },
        orientation: 'h'
      };

      var data = [trace2, trace1];
      var layout = {
        title: {
          text: 'Key Perfomance Metric Financial Impacts'
        },
        barmode: 'group',
        yaxis: {
          automargin: true,
          // tickfont: {
          //   weight: 'bold'
          // }
        },
        xaxis: {
          tickprefix: this.currencySymbol,
          automargin: true
        },
        legend: {
          orientation: "h"
        },
      };

      let config = {
        modeBarButtonsToRemove: ['autoScale2d', 'lasso2d', 'pan2d', 'select2d', 'toggleSpikelines', 'hoverClosestCartesian', 'hoverCompareCartesian'],
        displaylogo: false,
        responsive: true
      };
      this.plotlyService.newPlot(this.performanceMetricsChart.nativeElement, data, layout, config);
    }
  }
}
