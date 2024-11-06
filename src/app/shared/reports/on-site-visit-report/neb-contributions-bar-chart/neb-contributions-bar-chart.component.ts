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
  styleUrl: './neb-contributions-bar-chart.component.css'
})
export class NebContributionsBarChartComponent {
  @Input({ required: true })
  assessmentReports: Array<AssessmentReport>;

  @ViewChild('nebContributionBarChart', { static: false }) nebContributionBarChart: ElementRef;
  constructor(private plotlyService: PlotlyService) {

  }

  ngAfterViewInit() {
    if (this.assessmentReports) {
      this.drawChart();
    }
  }

  drawChart() {
    let data = [{
      x: this.assessmentReports.map(report => { return report.totalEnergyCostSavings }),
      y: this.assessmentReports.map(report => { return report.assessment.name }),
      name: 'Energy Cost Savings',
      orientation: 'h',
      marker: {
        color: '#196f3d',
        // width: 1,
        line: {
          color: '#fff',
          width: 1
        }
      },
      type: 'bar'
    }];

    let allNebReports: Array<NebReport> = this.assessmentReports.flatMap(assessmentReport => {
      return assessmentReport.allNebReports;
    });
    allNebReports = _.orderBy(allNebReports, (nebReport: NebReport) => {
      return nebReport.totalCostSavings;
    }, 'desc');
    let nebNames: Array<string> = allNebReports.map(report => {
      return report.nonEnergyBenefit.name;
    });

    nebNames = _.uniq(nebNames)

    nebNames.forEach((nebName, index) => {
      let trace = {
        x: [],
        y: [],
        name: nebName,
        orientation: 'h',
        marker: {
          color: graphColors[index],
          // width: 1,
          line: {
            color: '#fff',
            width: 1
          }
        },
        type: 'bar'
      }
      this.assessmentReports.forEach(assessmentReport => {
        let matchingNebReport: NebReport = assessmentReport.allNebReports.find(nebReport => {
          return nebReport.nonEnergyBenefit.name == nebName;
        });
        if (matchingNebReport) {
          trace.x.push(matchingNebReport.totalCostSavings);
        } else {
          trace.x.push(0)
        }
        trace.y.push(assessmentReport.assessment.name);
      })
      data.push(trace);
    });

    var layout = {
      title: 'Assessment Savings',
      barmode: 'stack',
      yaxis: {
        automargin: true
      },
      xaxis: {
        automargin: true,
        tickprefix: '$'
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
