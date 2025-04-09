import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { PlotlyService } from 'angular-plotly.js';
import { OnSiteVisitReport } from '../../calculations/visitReport';
import { NebReport } from '../../calculations/nebReport';
import * as _ from 'lodash';
import { graphColors } from 'src/app/shared/constants/graphColors';
import { AssessmentReport } from '../../calculations/assessmentReport';
@Component({
  selector: 'app-neb-contributions-bar-chart',
  templateUrl: './neb-contributions-bar-chart.component.html',
  styleUrl: './neb-contributions-bar-chart.component.css',
  standalone: false
})
export class NebContributionsBarChartComponent {
  @Input({ required: true })
  assessmentReport: AssessmentReport;
  @Input({required: true})
  totalNebCostSavings: number;

  @ViewChild('nebContributionBarChart', { static: false }) nebContributionBarChart: ElementRef;
  constructor(private plotlyService: PlotlyService) {

  }

  ngAfterViewInit() {
    if (this.assessmentReport) {
      this.drawChart();
    }
  }

  // drawChart() {
  //   let data = [{
  //     x: this.assessmentReports.map(report => { return report.totalEnergyCostSavings }),
  //     y: this.assessmentReports.map(report => { return report.assessment.name }),
  //     name: 'Energy Cost Savings',
  //     orientation: 'h',
  //     marker: {
  //       color: '#196f3d',
  //       // width: 1,
  //       line: {
  //         color: '#fff',
  //         width: 1
  //       }
  //     },
  //     type: 'bar'
  //   }];

  //   let allNebReports: Array<NebReport> = this.assessmentReports.flatMap(assessmentReport => {
  //     return assessmentReport.allNebReports;
  //   });
  //   allNebReports = _.orderBy(allNebReports, (nebReport: NebReport) => {
  //     return nebReport.totalCostSavings;
  //   }, 'desc');
  //   let nebNames: Array<string> = allNebReports.map(report => {
  //     return report.nonEnergyBenefit.name;
  //   });

  //   nebNames = _.uniq(nebNames)

  //   nebNames.forEach((nebName, index) => {
  //     let trace = {
  //       x: [],
  //       y: [],
  //       name: nebName,
  //       orientation: 'h',
  //       marker: {
  //         color: graphColors[index],
  //         // width: 1,
  //         line: {
  //           color: '#fff',
  //           width: 1
  //         }
  //       },
  //       type: 'bar'
  //     }
  //     this.assessmentReports.forEach(assessmentReport => {
  //       let matchingNebReport: NebReport = assessmentReport.allNebReports.find(nebReport => {
  //         return nebReport.nonEnergyBenefit.name == nebName;
  //       });
  //       if (matchingNebReport) {
  //         trace.x.push(matchingNebReport.totalCostSavings);
  //       } else {
  //         trace.x.push(0)
  //       }
  //       trace.y.push(assessmentReport.assessment.name);
  //     })
  //     data.push(trace);
  //   });

  //   var layout = {
  //     title: 'Assessment Savings',
  //     barmode: 'stack',
  //     yaxis: {
  //       automargin: true
  //     },
  //     xaxis: {
  //       automargin: true,
  //       tickprefix: '$'
  //     },
  //     legend: {
  //       orientation: "h"
  //     }
  //   };

  //   let config = {
  //     modeBarButtonsToRemove: ['autoScale2d', 'lasso2d', 'pan2d', 'select2d', 'toggleSpikelines', 'hoverClosestCartesian', 'hoverCompareCartesian'],
  //     displaylogo: false,
  //     responsive: true,
  //   };

  //   this.plotlyService.newPlot(this.nebContributionBarChart.nativeElement, data, layout, config);

  // }



  drawChart() {

    let data = [];

    let allNebReports: Array<NebReport> = this.assessmentReport.allNebReports.map(report => {
      return report;
    })
    allNebReports = _.orderBy(allNebReports, (nebReport: NebReport) => {
      return nebReport.totalCostSavings;
    }, 'asc');
    let nebNames: Array<string> = allNebReports.map(report => {
      return report.nonEnergyBenefit.name;
    });

    nebNames = _.uniq(nebNames)
    nebNames.forEach((nebName, index) => {
      let trace = {
        x: [],
        y: [],
        texttemplate: "%{value:$,.2s}",
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
          return matchingNebReport.totalCostSavings
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
      x: [this.assessmentReport.totalNebCostSavings],
      y: ['Total NEBs'],
      texttemplate: "%{value:$,.2s}",
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
        text: this.assessmentReport.assessment.name +  ' <br>Non-energy Benefits',
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
        tickprefix: '$',
        range: [0, this.totalNebCostSavings]
      },
      legend: {
        orientation: "h"
      },
      showlegend: false
    };

    let config = {
      modeBarButtonsToRemove: ['autoScale2d', 'lasso2d', 'pan2d', 'select2d', 'toggleSpikelines', 'hoverClosestCartesian', 'hoverCompareCartesian'],
      displaylogo: false,
      responsive: true,
    };

    this.plotlyService.newPlot(this.nebContributionBarChart.nativeElement, data, layout, config);

  }


}
