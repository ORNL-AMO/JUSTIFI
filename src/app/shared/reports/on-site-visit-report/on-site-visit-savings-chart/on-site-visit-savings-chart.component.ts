import { Component, ElementRef, Input, SimpleChanges, ViewChild } from '@angular/core';
import { PlotlyService } from 'angular-plotly.js';
import { OnSiteVisitReport } from '../../calculations/visitReport';
import { Subscription } from 'rxjs';
import { LocaleService } from 'src/app/shared/shared-services/locale.service';
import { localeCurrency } from 'src/app/shared/constants/localeCurrency';
import { CurrencySymbolPipe } from 'src/app/shared/helper-pipes/currency-symbol.pipe';

@Component({
    selector: 'app-on-site-visit-savings-chart',
    templateUrl: './on-site-visit-savings-chart.component.html',
    styleUrl: './on-site-visit-savings-chart.component.css',
    standalone: false
})
export class OnSiteVisitSavingsChartComponent {
  @Input({ required: true })
  onSiteVisitReport: OnSiteVisitReport;

  @ViewChild('onSiteVisitSavingsChart', { static: false }) onSiteVisitSavingsChart: ElementRef;

  currencySub: Subscription;
  currencySymbol: string;
  currencyUnicode: string;

  xMax: number;
  constructor(private plotlyService: PlotlyService,
    private localeService: LocaleService,
    private currencySymbolPipe: CurrencySymbolPipe
  ) {
  }

  ngOnInit() {
    this.currencySub = this.localeService.currencyCode.subscribe(currencyCode => {
      this.currencySymbol = this.currencySymbolPipe.transform(currencyCode)
      this.currencyUnicode = localeCurrency.find(option => {
        return option.currencyCode == currencyCode
      }).unicode;
      this.drawTotalSavaingsChart();
    })
  }

  ngOnDestroy(){
    this.currencySub.unsubscribe();
  }

  ngAfterViewInit() {
    if (this.onSiteVisitReport) {
      this.drawTotalSavaingsChart();
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (!changes['onSiteVisitReport'].isFirstChange()) {
      this.drawTotalSavaingsChart();
    }
  }

  drawTotalSavaingsChart() {
    if (this.onSiteVisitSavingsChart) {
      var trace1 = {
        y: ['Utility Cost Savings'],
        x: [this.onSiteVisitReport.totalNonNebCostSavings],
        // width: [.5],
        text: [this.onSiteVisitReport.totalNonNebCostSavings],
        texttemplate: this.currencyUnicode + "%{text:,.0f}",
        name: 'Utility Cost Savings',
        type: 'bar',
        marker: {
          color: '#2e86c1'
        },
        orientation: 'h'
      };

      var trace2 = {
        y: ['Non-energy Benefits'],
        x: [this.onSiteVisitReport.totalNebCostSavings],
        // width: [.5],
        text: [this.onSiteVisitReport.totalNebCostSavings],
        texttemplate: this.currencyUnicode + "%{text:,.0f}",
        name: 'Non-energy Benefits',
        type: 'bar',
        marker: {
          color: '#085646'
        },
        orientation: 'h'
      };

      if(this.onSiteVisitReport.totalNebCostSavings > this.onSiteVisitReport.totalNonNebCostSavings){
        this.xMax = this.onSiteVisitReport.totalNebCostSavings;
      }else{
        this.xMax = this.onSiteVisitReport.totalNonNebCostSavings;
      }


      var data = [trace1, trace2];
      var layout = {
        height: 250,
        title: {
          text:  'Total Annual Savings<br>'+this.currencyUnicode + this.onSiteVisitReport.totalCostSavings.toLocaleString() + ' (' + this.currencyUnicode + '/yr)',
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
          range: [0, this.xMax]
        },
        legend: {
          orientation: "h",
          yanchor: "top",
          y: 1.2,
          xanchor: "center",
          x: 0.5,
        },
        showlegend: false,
        margin: {
          // b: 40,
          // t: 10
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
      this.plotlyService.newPlot(this.onSiteVisitSavingsChart.nativeElement, data, layout, config);
    }
  }

}
