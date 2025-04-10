import { Component, ElementRef, Input, SimpleChanges, ViewChild } from '@angular/core';
import { LocaleService } from '../../shared-services/locale.service';
import { Subscription } from 'rxjs';
import { OnSiteVisitReport } from '../calculations/visitReport';
import { PlotlyService } from 'angular-plotly.js';
import { CurrencyPipe } from '@angular/common';
import { localeCurrency } from '../../constants/localeCurrency';
import * as _ from 'lodash';

@Component({
  selector: 'app-payback-waterfall-chart',
  standalone: false,

  templateUrl: './payback-waterfall-chart.component.html',
  styleUrl: './payback-waterfall-chart.component.css'
})
export class PaybackWaterfallChartComponent {
  @Input({ required: true })
  reportData: {
    totalImplementationCost: number,
    totalCostSavings: number,
    totalNonNebCostSavings: number
  };


  @ViewChild('paybackWaterfallChart', { static: false }) paybackWaterfallChart: ElementRef;
  @ViewChild('paybackWaterfallChartNebs', { static: false }) paybackWaterfallChartNebs: ElementRef;


  currencySub: Subscription;
  currencySymbol: string;
  currencyUnicode: string;
  years: number;
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
    if (this.reportData) {
      this.drawChart();
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (!changes['reportData'].isFirstChange()) {
      this.drawChart();
    }
  }

  drawChart() {
    if (this.paybackWaterfallChart) {
      let xVals = ["Implementation Cost"];
      let implementationCost: number = this.reportData.totalImplementationCost * (-1)
      let yVals = [implementationCost];
      let yValsNebs = [implementationCost];
      let year = 1;
      this.years = Math.ceil(this.reportData.totalImplementationCost / this.reportData.totalNonNebCostSavings);
      for (let i = 0; i < this.years; i++) {
        xVals.push('Year ' + year);
        yVals.push(this.reportData.totalNonNebCostSavings)
        yValsNebs.push(this.reportData.totalCostSavings)
        year++;
      }

      var data = [
        {
          name: "Energy Project Payback",
          type: "waterfall",
          orientation: "v",
          x: xVals,
          textposition: "outside",
          texttemplate: this.currencyUnicode + "%{final:,.2s}",
          increasing: { marker: { color: "#2e86c1" } },
          text: [],
          y: yVals,
          connector: {
            line: {
              color: "rgb(63, 63, 63)"
            }
          },
        }
      ]
      let dataNebs = [
        {
          name: "Payback W/ NEBs",
          type: "waterfall",
          orientation: "v",
          x: xVals,
          textposition: "outside",
          texttemplate: this.currencyUnicode + "%{final:,.2s}",
          y: yValsNebs,
          increasing: { marker: { color: '#085646' } },
          connector: {
            line: {
              color: "rgb(63, 63, 63)"
            }
          },
        }
      ];

      let maxY: number = _.sum(yValsNebs) * 1.2
      let layout = {
        waterfallgroupgap: .3,
        title: {
          text: "Simple Payback",
          font: {
            weight: 'bold'
          }
        },
        xaxis: {
          type: "category"
        },
        yaxis: {
          type: "linear",
          tickprefix: this.currencySymbol,
          range: [implementationCost, maxY]
        },
        autosize: true,
        showlegend: false,
      };

      let layoutNebs = {
        waterfallgroupgap: .3,
        title: {
          text: "Simple Payback W/ NEBs",
          font: {
            weight: 'bold'
          }
        },
        xaxis: {
          type: "category"
        },
        yaxis: {
          type: "linear",
          tickprefix: this.currencySymbol,
          range: [implementationCost, maxY]
        },
        autosize: true,
        showlegend: false,
        font: {
          family: 'Arial'
        }
      };

      let config = {
        modeBarButtonsToRemove: ['autoScale2d', 'lasso2d', 'pan2d', 'select2d', 'toggleSpikelines', 'hoverClosestCartesian', 'hoverCompareCartesian'],
        displaylogo: false,
        responsive: true
      };
      this.plotlyService.newPlot(this.paybackWaterfallChart.nativeElement, data, layout, config);
      this.plotlyService.newPlot(this.paybackWaterfallChartNebs.nativeElement, dataNebs, layoutNebs, config);
    }
  }
}
