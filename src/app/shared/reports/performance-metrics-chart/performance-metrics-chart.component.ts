import { Component, ElementRef, Input, SimpleChanges, ViewChild } from '@angular/core';
import { PlotlyService } from 'angular-plotly.js';
import { KeyPerformanceIndicatorReport, KeyPerformanceMetricReportItem } from '../calculations/keyPerformanceIndicatorReport';
import * as _ from 'lodash';
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
  constructor(private plotlyService: PlotlyService) {

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
    let kpmReportItems: Array<KeyPerformanceMetricReportItem> = this.keyPerformanceIndicatorReport.kpmReportItems.filter(kpmReportItem => {
      return kpmReportItem.keyPerformanceMetric.isQuantitative
    });
    kpmReportItems = _.orderBy(kpmReportItems, (reportItem: KeyPerformanceMetricReportItem) => {
      return reportItem.keyPerformanceMetric.baselineCost;
    }, 'desc')

    var trace1 = {
      x: kpmReportItems.map(kpmReport => {
        return kpmReport.keyPerformanceMetric.label
      }),
      y: kpmReportItems.map(kpmReportItem => {
        return kpmReportItem.keyPerformanceMetric.baselineCost - kpmReportItem.performanceMetricImpact.costAdjustment
      }),
      name: 'Modified Cost',
      type: 'bar',
      marker: {
        color: '#e67e22'
      }
    };

    var trace2 = {
      x: kpmReportItems.map(kpiReport => {
        return kpiReport.keyPerformanceMetric.label
      }),
      y: kpmReportItems.map(kpiReportItem => {
        return kpiReportItem.performanceMetricImpact.costAdjustment
      }),
      name: 'Annual Savings',
      type: 'bar',
      marker: {
        color: '#196f3d'
      }
    };

    var data = [trace1, trace2];
    var layout = {
      barmode: 'stack',
      yaxis: {
        tickprefix: '$',
        automargin: true
      },
      xaxis: {
        automargin: true
      }
      // legend: {
      //   orientation: "h"
      // },
    };

    let config = {
      modeBarButtonsToRemove: ['autoScale2d', 'lasso2d', 'pan2d', 'select2d', 'toggleSpikelines', 'hoverClosestCartesian', 'hoverCompareCartesian'],
      displaylogo: false,
      responsive: true,
    };
    this.plotlyService.newPlot(this.performanceMetricsChart.nativeElement, data, layout, config);
  }
}
