import { CurrencyPipe } from '@angular/common';
import { Component, ElementRef, Input, SimpleChanges, ViewChild } from '@angular/core';
import { PlotlyService } from 'angular-plotly.js';
import { Subscription } from 'rxjs';
import { localeCurrency } from 'src/app/shared/constants/localeCurrency';
import { LocaleService } from 'src/app/shared/shared-services/locale.service';
import { NebReport } from '../../../calculations/nebReport';

@Component({
  selector: 'app-assessment-item-savings-bar-chart',
  standalone: false,

  templateUrl: './assessment-item-savings-bar-chart.component.html',
  styleUrl: './assessment-item-savings-bar-chart.component.css'
})
export class AssessmentItemSavingsBarChartComponent {
  @Input({ required: true })
  itemName: string;
  @Input({ required: true })
  totalNonNebCostSavings: number;
  @Input({ required: true })
  nebReports: Array<NebReport>;


  @ViewChild('nebsBarChart', { static: false }) nebsBarChart: ElementRef;

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
      this.drawNebsBarChart();
    })
  }

  ngOnDestroy() {
    this.currencySub.unsubscribe();
  }

  ngAfterViewInit() {
    this.drawNebsBarChart();
  }

  // ngOnChanges(changes: SimpleChanges) {
  //   if (!changes['assessmentReport'].isFirstChange()) {
  //     this.drawTotalSavaingsChart();
  //   }
  // }

  drawNebsBarChart() {
    if (this.nebsBarChart) {
      var trace1 = {
        y: ['Energy Cost Savings'],
        x: [this.totalNonNebCostSavings],
        // width: [.5],
        text: [this.totalNonNebCostSavings],
        texttemplate: this.currencyUnicode + "%{text:,.0f}",
        name: 'Energy Cost Savings',
        type: 'bar',
        // marker: {
        //   color: '#e67e22'
        // },
        orientation: 'h'
      };
      let totalCostSavings: number = this.totalNonNebCostSavings;
      var data = [trace1];
      this.nebReports.forEach(report => {
        if (report.totalCostSavings) {
          totalCostSavings += report.totalCostSavings;
          var trace2 = {
            y: [report.nonEnergyBenefit.name],
            x: [report.totalCostSavings],
            // width: [.5],
            text: [report.totalCostSavings],
            texttemplate: this.currencyUnicode + "%{text:,.0f}",
            name: report.nonEnergyBenefit.name,
            type: 'bar',
            marker: {
              color: '#085646'
            },
            orientation: 'h'
          };
          data.push(trace2);
        }
      })

      var layout = {
        height: 300,
        title: {
          font: {
            weight: 'bold'
          }
        },
        // barmode: 'stack',
        yaxis: {
          automargin: true,
          showticklabels: false
          // tickfont: {
          //   weight: 'bold'
          // }
        },
        xaxis: {
          tickprefix: this.currencySymbol,
          automargin: true,
          text: this.currencyUnicode + totalCostSavings.toLocaleString() + ' Annual Savings (' + this.currencyUnicode + '/yr)',
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
      this.plotlyService.newPlot(this.nebsBarChart.nativeElement, data, layout, config);
    }
  }
}
