import { Component, ElementRef, Input, SimpleChanges, ViewChild } from '@angular/core';
import { AssessmentReport } from '../../calculations/assessmentReport';
import { PlotlyService } from 'angular-plotly.js';
import { Subscription } from 'rxjs';
import { LocaleService } from 'src/app/shared/shared-services/locale.service';
import { CurrencyPipe } from '@angular/common';
import { localeCurrency } from 'src/app/shared/constants/localeCurrency';

@Component({
  selector: 'app-assessment-savings-chart',
  templateUrl: './assessment-savings-chart.component.html',
  styleUrl: './assessment-savings-chart.component.css',
  standalone: false
})
export class AssessmentSavingsChartComponent {
  @Input({ required: true })
  assessmentReport: AssessmentReport;
  @Input()
  inRollup: boolean
  @Input()
  xMax: number

  @ViewChild('totalSavingsChart', { static: false }) totalSavingsChart: ElementRef;

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
      this.drawTotalSavaingsChart();
    })
  }

  ngOnDestroy() {
    this.currencySub.unsubscribe();
  }

  ngAfterViewInit() {
    if (this.assessmentReport) {
      this.drawTotalSavaingsChart();
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if ((changes['assessmentReport'] && !changes['assessmentReport'].isFirstChange()) || (changes['xMax']) && !changes['xMax'].isFirstChange()) {
      this.drawTotalSavaingsChart();
    }
  }

  drawTotalSavaingsChart() {
    if (this.totalSavingsChart) {
      var trace1 = {
        y: ['Utility Cost Savings'],
        x: [this.assessmentReport.totalNonNebCostSavings],
        // width: [.5],
        text: [this.assessmentReport.totalNonNebCostSavings],
        texttemplate: this.currencyUnicode + "%{text:,.0f}",
        name: 'Utility Cost Savings',
        type: 'bar',
        marker: {
          color: '#2e86c1'
        },
        orientation: 'h'
      };

      var trace2 = {
        y: ['Non-Energy Benefits'],
        x: [this.assessmentReport.totalNebCostSavings],
        // width: [.5],
        text: [this.assessmentReport.totalNebCostSavings],
        texttemplate: this.currencyUnicode + "%{text:,.0f}",
        name: 'Non-Energy Benefits',
        type: 'bar',
        marker: {
          color: '#085646'
        },
        orientation: 'h'
      };
      var data = [trace1, trace2];

      let title: string = 'Annual Savings<br>' + this.currencyUnicode + this.assessmentReport.totalCostSavings.toLocaleString() + ' (' + this.currencyUnicode + '/yr)';
      if (this.inRollup) {
        title = this.assessmentReport.assessment.name + ' Annual Savings<br>' + this.currencyUnicode + this.assessmentReport.totalCostSavings.toLocaleString() + ' (' + this.currencyUnicode + '/yr)';
      }

      let xRange;
      if(this.xMax){
        xRange = [0, this.xMax]
      }

      var layout = {
        height: 250,
        title: {
          text: title,
          font: {
            weight: 'bold'
          }
        },
        // barmode: 'stack',
        yaxis: {
          automargin: true,
          // showticklabels: false
          // tickfont: {
          //   weight: 'bold'
          // }
        },
        xaxis: {
          tickprefix: this.currencySymbol,
          automargin: true,
          range: xRange
        },
        // legend: {
        //   orientation: "h"
        // },
        legend: {
          orientation: "h",
          yanchor: "top",
          y: 1.2,
          xanchor: "center",
          x: 0.5
        },
        showlegend: false,
        margin: {
          r: 0
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
      this.plotlyService.newPlot(this.totalSavingsChart.nativeElement, data, layout, config);
    }
  }
}
