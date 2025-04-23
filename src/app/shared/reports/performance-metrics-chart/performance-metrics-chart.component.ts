import { Component, ElementRef, Input, SimpleChanges, ViewChild } from '@angular/core';
import { PlotlyService } from 'angular-plotly.js';
import { KeyPerformanceIndicatorReport, KeyPerformanceMetricReportItem } from '../calculations/keyPerformanceIndicatorReport';
import * as _ from 'lodash';
import { LocaleService } from '../../shared-services/locale.service';
import { Subscription } from 'rxjs';
import { localeCurrency } from '../../constants/localeCurrency';
import { CurrencySymbolPipe } from '../../helper-pipes/currency-symbol.pipe';
import { CurrencyPipe } from '@angular/common';

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
  currencySymbolPipe: CurrencySymbolPipe;
  constructor(private plotlyService: PlotlyService,
    private localeService: LocaleService,
    private currencyPipe: CurrencyPipe
  ) {
  }

  ngOnInit() {
    this.currencySymbolPipe = new CurrencySymbolPipe(this.currencyPipe);
    this.currencySub = this.localeService.currencyCode.subscribe(currencyCode => {
      this.currencySymbol = this.currencySymbolPipe.transform(currencyCode)
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
        x: kpmReportItems.map(kpmReport => {
          return kpmReport.keyPerformanceMetric.label
        }),
        y: kpmReportItems.map(kpmReportItem => {
          return kpmReportItem.keyPerformanceMetric.baselineCost
        }),
        text: kpmReportItems.map(kpmReportItems => {
          return kpmReportItems.keyPerformanceMetric.baselineCost
        }),
        texttemplate: this.currencyUnicode + "%{text:,.2s}",
        textposition: "outside",
        name: 'Current (' + this.currencySymbol + '/yr)',
        type: 'bar',
        marker: {
          color: '#e67e22'
        },
        // orientation: 'h'
      };

      var trace2 = {
        x: kpmReportItems.map(kpiReport => {
          return kpiReport.keyPerformanceMetric.label
        }),
        y: kpmReportItems.map(kpiReportItem => {
          return kpiReportItem.performanceMetricImpact.modifiedCost
        }),
        text: kpmReportItems.map(kpmReportItems => {
          return kpmReportItems.performanceMetricImpact.modifiedCost
        }),
        texttemplate: this.currencyUnicode + "%{text:,.2s}",
        textposition: "outside",
        name: 'Potential (' + this.currencySymbol + '/yr)',
        type: 'bar',
        marker: {
          color: '#196f3d'
        },
        // orientation: 'h'
      };

      var data = [trace1, trace2];

      let yVal: Array<number> = data.flatMap(trace => {
        return trace.y
      })
      let maxY: number = _.max(yVal);
      var layout = {
        title: {
          text: 'Key Perfomance Metric Financial Impacts',
          font: {
            weight: 'bold'
          }
        },
        barmode: 'group',
        yaxis: {
          automargin: true,
          range: [0, maxY * 1.15],
          tickprefix: this.currencySymbol,
        },
        xaxis: {
          // tickprefix: this.currencySymbol,
          automargin: true,
          // range: [0, maxX * 1.15]
        },
        legend: {
          orientation: "h",
          yanchor: "top",
          y: 1.2,
          xanchor: "center",
          x: 0.5
        },
        margin: {
          // t: 40
          l: 10
        },
        font: {
          family: 'Arial'
        }
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
