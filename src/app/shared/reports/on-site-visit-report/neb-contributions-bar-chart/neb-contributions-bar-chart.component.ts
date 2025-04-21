import { Component, ElementRef, Input, SimpleChanges, ViewChild } from '@angular/core';
import { PlotlyService } from 'angular-plotly.js';
import { NebReport } from '../../calculations/nebReport';
import * as _ from 'lodash';
import { AssessmentReport } from '../../calculations/assessmentReport';
import { Subscription } from 'rxjs';
import { LocaleService } from 'src/app/shared/shared-services/locale.service';
import { localeCurrency } from 'src/app/shared/constants/localeCurrency';
import { CurrencySymbolPipe } from 'src/app/shared/helper-pipes/currency-symbol.pipe';
import { CurrencyPipe } from '@angular/common';
@Component({
  selector: 'app-neb-contributions-bar-chart',
  templateUrl: './neb-contributions-bar-chart.component.html',
  styleUrl: './neb-contributions-bar-chart.component.css',
  standalone: false
})
export class NebContributionsBarChartComponent {
  @Input({ required: true })
  assessmentReport: AssessmentReport;
  @Input({ required: true })
  totalNebFinancialImpact: number;

  @ViewChild('nebContributionBarChart', { static: false }) nebContributionBarChart: ElementRef;

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
    if (this.assessmentReport) {
      this.drawChart();
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if ((changes['assessmentReport'] && !changes['assessmentReport'].isFirstChange()) || (changes['totalNebFinancialImpact']) && !changes['totalNebFinancialImpact'].isFirstChange()) {
      this.drawChart();
    }
  }



  drawChart() {
    if (this.nebContributionBarChart) {
      let data = [];

      let allNebReports: Array<NebReport> = this.assessmentReport.allNebReports.map(report => {
        return report;
      })
      allNebReports = _.orderBy(allNebReports, (nebReport: NebReport) => {
        return nebReport.totalFinancialImpact;
      }, 'asc');
      let nebNames: Array<string> = allNebReports.map(report => {
        return report.nonEnergyBenefit.name;
      });

      nebNames = _.uniq(nebNames)
      nebNames.forEach((nebName, index) => {
        let trace = {
          x: [],
          y: [],
          texttemplate: this.currencyUnicode + "%{value:,.2s}",
          hovertemplate: nebName,
          name: nebName,
          orientation: 'h',
          marker: {
            color: '#085646',
            // width: 1,
            line: {
              color: '#fff',
              width: 1
            }
          },
          type: 'bar'
        }
        let matchingNebReport: Array<NebReport> = this.assessmentReport.allNebReports.filter(nebReport => {
          return nebReport.nonEnergyBenefit.name == nebName;
        });
        if (matchingNebReport.length > 0) {
          let totalSavings: number = _.sumBy(matchingNebReport, (matchingNebReport: NebReport) => {
            return matchingNebReport.totalFinancialImpact
          })
          trace.x.push(totalSavings);
        } else {
          trace.x.push(0)
        }
        trace.y.push(nebName.length > 30 ? nebName.substring(0, 30) + '...' : nebName);
        trace.hovertemplate
        data.push(trace);
      });

      data.push({
        x: [this.assessmentReport.totalNebFinancialImpact],
        y: ['Total NEBs'],
        texttemplate: this.currencyUnicode + "%{value:,.2s}",
        hovertemplate: 'Total NEBs',
        name: 'Total NEBs',
        orientation: 'h',
        marker: {
          color: '#085646',
          // width: 1,
          line: {
            color: '#fff',
            width: 1
          }
        },
        type: 'bar'
      })

      var layout = {
        title: {
          text: this.assessmentReport.assessment.name + ' <br>Non-energy Benefits',
          font: {
            weight: 'bold'
          }
        },
        // barmode: 'stack',
        yaxis: {
          automargin: true,
        },
        xaxis: {
          automargin: true,
          tickprefix: this.currencySymbol,
          range: [0, this.totalNebFinancialImpact]
        },
        legend: {
          orientation: "h"
        },
        showlegend: false,
        font: {
          family: 'Arial'
        }
      };

      let config = {
        modeBarButtonsToRemove: ['autoScale2d', 'lasso2d', 'pan2d', 'select2d', 'toggleSpikelines', 'hoverClosestCartesian', 'hoverCompareCartesian'],
        displaylogo: false,
        responsive: true,
      };

      this.plotlyService.newPlot(this.nebContributionBarChart.nativeElement, data, layout, config);
    }
  }
}
