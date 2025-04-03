import { Component, ElementRef, Input, SimpleChanges, ViewChild } from '@angular/core';
import { AssessmentReport } from '../../calculations/assessmentReport';
import { PlotlyService } from 'angular-plotly.js';
import { graphColors } from 'src/app/shared/constants/graphColors';
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

  @ViewChild('totalSavingsChart', { static: false }) totalSavingsChart: ElementRef;
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
      // this.drawChart();
      this.drawTotalSavaingsChart();
      this.drawNebsBarChart();
    })
  }

  ngOnDestroy() {
    this.currencySub.unsubscribe();
  }

  ngAfterViewInit() {
    if (this.assessmentReport) {
      this.drawTotalSavaingsChart();
      this.drawNebsBarChart();
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (!changes['assessmentReport'].isFirstChange()) {
      this.drawTotalSavaingsChart();
    }
  }

  drawTotalSavaingsChart() {
    if (this.totalSavingsChart) {

      var trace1 = {
        y: ['Financial Impacts'],
        x: [this.assessmentReport.totalNonNebCostSavings],
        // width: [.5],
        text: [this.assessmentReport.totalNonNebCostSavings],
        texttemplate: this.currencyUnicode + "%{text:,.0f}",
        name: 'Utility Cost Savings',
        type: 'bar',
        // marker: {
        //   color: '#e67e22'
        // },
        orientation: 'h'
      };

      var trace2 = {
        y: ['Financial Impacts'],
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
      var layout = {
        height: 300,
        title: {
          text: this.currencyUnicode + this.assessmentReport.totalCostSavings.toLocaleString() + ' Annual Savings (' + this.currencyUnicode + '/yr)',
          font: {
            weight: 'bold'
          }
        },
        barmode: 'stack',
        yaxis: {
          automargin: true,
          showticklabels: false
          // tickfont: {
          //   weight: 'bold'
          // }
        },
        xaxis: {
          tickprefix: this.currencySymbol,
          automargin: true
        },
        // legend: {
        //   orientation: "h"
        // },
      };

      let config = {
        modeBarButtonsToRemove: ['autoScale2d', 'lasso2d', 'pan2d', 'select2d', 'toggleSpikelines', 'hoverClosestCartesian', 'hoverCompareCartesian'],
        displaylogo: false,
        responsive: true
      };
      this.plotlyService.newPlot(this.totalSavingsChart.nativeElement, data, layout, config);
    }
  }

  drawNebsBarChart() {
    if (this.nebsBarChart) {
      let numEeemWithData: number = 0;
      this.assessmentReport.energyOpportunityReports.forEach(report => {
        let hasData: boolean = false;
        if (report.totalNonNebCostSavings) {
          hasData = true;
        }
        report.nebReports.forEach(nebReport => {
          if (nebReport.totalCostSavings) {
            hasData = true;
          }
        });
        if (hasData) {
          numEeemWithData++;
        }
      });
      let axisStepLength: number = (1 / (numEeemWithData + 1));
      var layout = {
        title: {
          text: 'Assessment Cost Savings'
        },
        // barmode: 'group',
        yaxis: {
          automargin: true,
          // tickfont: {
          //   weight: 'bold'
          // }
        },
        xaxis: {
          // tickprefix: this.currencySymbol,
          // automargin: true,
          domain: [0, axisStepLength],
          anchor: 'x1',
          title: 'Assessment'
        },
        legend: {
          orientation: "h"
        },
      };
      var data = [];

      //assessment
      this.assessmentReport.assessmentNebReports.forEach(nebReport => {
        if (nebReport.totalCostSavings) {
          var trace1 = {
            x: ['NEB: ' + nebReport.nonEnergyBenefit.name],
            y: [nebReport.totalCostSavings],
            text: [nebReport.totalCostSavings],
            texttemplate: this.currencyUnicode + "%{text:,.0f}",
            name: 'NEB: ' + nebReport.nonEnergyBenefit.name,
            type: 'bar',
            xaxis: 'x1'
            // marker: {
            //   color: '#e67e22'
            // },
            // orientation: 'h'
          };
          data.push(trace1);
        }
      })

      if (this.assessmentReport.assessment.costSavings) {
        var trace1 = {
          x: ['Assessment Energy Cost Savings'],
          y: [this.assessmentReport.assessment.costSavings],
          text: [this.assessmentReport.assessment.costSavings],
          texttemplate: this.currencyUnicode + "%{text:,.0f}",
          name: 'Assessment: ' + this.assessmentReport.assessment.name,
          type: 'bar',
          xaxis: 'x1'
          // marker: {
          //   color: '#e67e22'
          // },
          // orientation: 'h'
        };
        data.push(trace1);
      }

      let eemXaxisCount: number = 2;
      let startAxisStep: number = axisStepLength;
      let stopAxisStep: number = axisStepLength + axisStepLength;
      this.assessmentReport.energyOpportunityReports.forEach(report => {
        let hasData: boolean = false;
        if (report.totalNonNebCostSavings) {
          hasData = true;
          var trace1 = {
            x: ['EEM: ' + report.energyOpportunity.name],
            y: [report.totalNonNebCostSavings],
            text: [report.totalNonNebCostSavings],
            texttemplate: this.currencyUnicode + "%{text:,.0f}",
            name: 'EEM: ' + report.energyOpportunity.name,
            type: 'bar',
            xaxis: 'x' + eemXaxisCount
            // marker: {
            //   color: '#e67e22'
            // },
            // orientation: 'h'
          };
          data.push(trace1);
        }

        report.nebReports.forEach(nebReport => {
          if (nebReport.totalCostSavings) {
            hasData = true;
            var trace1 = {
              x: ['NEB: ' + nebReport.nonEnergyBenefit.name],
              y: [nebReport.totalCostSavings],
              text: [nebReport.totalCostSavings],
              texttemplate: this.currencyUnicode + "%{text:,.0f}",
              name: 'NEB: ' + nebReport.nonEnergyBenefit.name,
              type: 'bar',
              xaxis: 'x' + eemXaxisCount
              // marker: {
              //   color: '#e67e22'
              // },
              // orientation: 'h'
            };
            data.push(trace1);
          }
        });
        if (hasData) {
          layout['xaxis' + eemXaxisCount] = {
            automargin: true,
            domain: [startAxisStep, stopAxisStep],
            anchor: 'x' + eemXaxisCount,
            title: report.energyOpportunity.name
          }
          startAxisStep = startAxisStep + axisStepLength;
          stopAxisStep = stopAxisStep + axisStepLength;
          eemXaxisCount++;
        }
      })



      // this.assessmentReport.assessmentNebReports.forEach(nebReport => {
      //   if (nebReport.totalCostSavings) {
      //     var trace1 = {
      //       y: ['NEB: ' + nebReport.nonEnergyBenefit.name],
      //       x: [nebReport.totalCostSavings],
      //       text: [nebReport.totalCostSavings],
      //       texttemplate: this.currencyUnicode + "%{text:,.0f}",
      //       name: 'NEB: ' + nebReport.nonEnergyBenefit.name,
      //       type: 'bar',
      //       // marker: {
      //       //   color: '#e67e22'
      //       // },
      //       orientation: 'h'
      //     };
      //     data.push(trace1);
      //   }
      // })

      // if (this.assessmentReport.assessment.costSavings) {
      //   var trace1 = {
      //     y: ['Assessment Energy Cost Savings'],
      //     x: [this.assessmentReport.assessment.costSavings],
      //     text: [this.assessmentReport.assessment.costSavings],
      //     texttemplate: this.currencyUnicode + "%{text:,.0f}",
      //     name: 'Assessment: ' + this.assessmentReport.assessment.name,
      //     type: 'bar',
      //     // marker: {
      //     //   color: '#e67e22'
      //     // },
      //     orientation: 'h'
      //   };
      //   data.push(trace1);
      // }
      console.log(data);
      console.log(layout);


      let config = {
        modeBarButtonsToRemove: ['autoScale2d', 'lasso2d', 'pan2d', 'select2d', 'toggleSpikelines', 'hoverClosestCartesian', 'hoverCompareCartesian'],
        displaylogo: false,
        responsive: true,
      };
      this.plotlyService.newPlot(this.nebsBarChart.nativeElement, data, layout, config);
    }
  }

}
