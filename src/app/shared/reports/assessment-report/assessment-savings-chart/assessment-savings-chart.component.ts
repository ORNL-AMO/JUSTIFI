import { Component, ElementRef, Input, SimpleChanges, ViewChild } from '@angular/core';
import { AssessmentReport } from '../../calculations/assessmentReport';
import { PlotlyService } from 'angular-plotly.js';
import { Subscription } from 'rxjs';
import { LocaleService } from 'src/app/shared/shared-services/locale.service';
import { localeCurrency } from 'src/app/shared/constants/localeCurrency';
import { CurrencySymbolPipe } from 'src/app/shared/helper-pipes/currency-symbol.pipe';
import { CurrencyPipe } from '@angular/common';
import { DisplayRoundedValuesPipe } from 'src/app/shared/helper-pipes/display-rounded-values.pipe';

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
  currencySymbolPipe: CurrencySymbolPipe;
  constructor(private plotlyService: PlotlyService,
    private localeService: LocaleService,
    private currencyPipe: CurrencyPipe,
    private displayRoundedValuesPipe: DisplayRoundedValuesPipe
  ) {
  }

  ngOnInit() {
    this.currencySymbolPipe = new CurrencySymbolPipe(this.currencyPipe);
    this.currencySub = this.localeService.currencyCode.subscribe(currencyCode => {
      this.currencySymbol = this.currencySymbolPipe.transform(currencyCode)
      this.currencyUnicode = localeCurrency.find(option => {
        return option.currencyCode == currencyCode
      }).unicode;
      this.drawTotalSavingsChart();
    })
  }

  ngOnDestroy() {
    this.currencySub.unsubscribe();
  }

  ngAfterViewInit() {
    if (this.assessmentReport) {
      this.drawTotalSavingsChart();
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if ((changes['assessmentReport'] && !changes['assessmentReport'].isFirstChange()) || (changes['xMax']) && !changes['xMax'].isFirstChange()) {
      this.drawTotalSavingsChart();
    }
  }

  drawTotalSavingsChart() {
    if (this.totalSavingsChart) {
      let costSavingLabel: string = this.assessmentReport.utilityCategory === 'energy' ? 'Energy Cost Savings' : 'Utility Cost Savings';
      var trace1 = {
        y: [costSavingLabel],
        x: [this.assessmentReport.totalNonNebCostSavings],
        // width: [.5],
        text: [this.assessmentReport.totalNonNebCostSavings],
        texttemplate: this.currencyUnicode + "%{text:,.0f}",
        name: costSavingLabel,
        type: 'bar',
        marker: {
          color: '#2e86c1'
        },
        orientation: 'h'
      };

      var trace2 = {
        y: ['Operational Cost Savings'],
        x: [this.assessmentReport.totalNebFinancialImpact],
        // width: [.5],
        text: [this.assessmentReport.totalNebFinancialImpact],
        texttemplate: this.currencyUnicode + "%{text:,.0f}",
        name: 'Operational Cost Savings',
        type: 'bar',
        marker: {
          color: '#085646'
        },
        orientation: 'h'
      };
      var data = [trace1, trace2];

      const roundedValue = this.displayRoundedValuesPipe.transform(this.assessmentReport.totalFinancialImpact, true);
      let title: string = 'Annual Savings<br>' + this.currencyUnicode + roundedValue.toLocaleString() + ' (' + this.currencyUnicode + '/yr)';
      if (this.inRollup) {
        title = this.assessmentReport.assessment.name + ' Annual Savings<br>' + this.currencyUnicode + roundedValue.toLocaleString() + ' (' + this.currencyUnicode + '/yr)';
      }

      let xRange;
      if (this.xMax) {
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
