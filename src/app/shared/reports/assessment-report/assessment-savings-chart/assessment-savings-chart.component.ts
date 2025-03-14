import { Component, ElementRef, Input, SimpleChanges, ViewChild } from '@angular/core';
import { AssessmentReport } from '../../calculations/assessmentReport';
import { PlotlyService } from 'angular-plotly.js';
import { graphColors } from 'src/app/shared/constants/graphColors';

@Component({
    selector: 'app-assessment-savings-chart',
    templateUrl: './assessment-savings-chart.component.html',
    styleUrl: './assessment-savings-chart.component.css',
    standalone: false
})
export class AssessmentSavingsChartComponent {
  @Input({ required: true })
  assessmentReport: AssessmentReport;



  @ViewChild('percentSavingsGauge', { static: false }) percentSavingsGauge: ElementRef;
  @ViewChild('percentSavingsWithNebsGauge', { static: false }) percentSavingsWithNebsGauge: ElementRef;
  @ViewChild('nebsPieChart', { static: false }) nebsPieChart: ElementRef;
  constructor(private plotlyService: PlotlyService) {

  }

  ngAfterViewInit() {
    if (this.assessmentReport) {
      this.drawGaugeCharts();
      this.drawPieChart();
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (!changes['assessmentReport'].isFirstChange()) {
      this.drawGaugeCharts();
      this.drawPieChart();
    }
  }

  drawGaugeCharts() {
    let percentSavings = (this.assessmentReport.totalNonNebCostSavings / this.assessmentReport.assessment.cost) * 100
    var savingsData = [
      {
        domain: { x: [0, 1], y: [0, 1] },
        value: percentSavings,
        title: { text: "Cost Savings" },
        type: "indicator",
        mode: "gauge+number",
        number: { suffix: '%' },
        gauge: {
          axis: { range: [null, 100], automargin: true },
        }
      },
    ];

    var layout = {
      height: 250,
      margin: {
        l: 50,
        b: 50,
        r: 50,
        t: 50
      },
      yaxis: {
        tickprefix: '$'
      }
    };

    let config = {
      modeBarButtonsToRemove: ['autoScale2d', 'lasso2d', 'pan2d', 'select2d', 'toggleSpikelines', 'hoverClosestCartesian', 'hoverCompareCartesian'],
      displaylogo: false,
      responsive: true,
    };
    this.plotlyService.newPlot(this.percentSavingsGauge.nativeElement, savingsData, layout, config);

    let percentSavingsNebs = (this.assessmentReport.totalCostSavings / this.assessmentReport.assessment.cost) * 100
    var savingsDataWithNebs = [
      {
        domain: { x: [0, 1], y: [0, 1] },
        value: percentSavingsNebs,
        number: { suffix: '%' },
        title: { text: "Cost Savings W/ NEBs" },
        type: "indicator",
        mode: "gauge+number",
        gauge: {
          axis: { range: [null, 100] },
        }
      },
    ];
    this.plotlyService.newPlot(this.percentSavingsWithNebsGauge.nativeElement, savingsDataWithNebs, layout, config);
  }


  drawPieChart() {
    //pie chart..
    let trace = {
      values: [],
      labels: [],
      type: 'pie',
      hole: .4,
      ticksuffix: '$/yr',
      marker: {
        colors: graphColors,
        line: {
          width: [],
          color: '#fff'
        }
      }
    }

    if (this.assessmentReport.assessment.costSavings) {
      trace.values.push(this.assessmentReport.assessment.costSavings);
      trace.labels.push('Assessment: ' + this.assessmentReport.assessment.name);
      trace.marker.line.width.push(2)
    }

    this.assessmentReport.energyOpportunityReports.forEach(report => {
      if (report.totalNonNebCostSavings) {
        trace.labels.push('Energy Opportunity: ' + report.energyOpportunity.name)
        trace.values.push(report.totalNonNebCostSavings)
        trace.marker.line.width.push(2)
      }

      report.nebReports.forEach(nebReport => {
        if (nebReport.totalCostSavings) {
          trace.labels.push('Non-Energy Benefit: ' + nebReport.nonEnergyBenefit.name)
          trace.values.push(nebReport.totalCostSavings)
          trace.marker.line.width.push(2)
        }
      })
    })


    this.assessmentReport.assessmentNebReports.forEach(nebReport => {
      if (nebReport.totalCostSavings) {
        trace.labels.push('Non-Energy Benefit: ' + nebReport.nonEnergyBenefit.name)
        trace.values.push(nebReport.totalCostSavings)
        trace.marker.line.width.push(2)
      }
    })

    var data = [trace];
    var layout = {
      title: 'Percent Savings Contribution',
      legend: {
        orientation: "h"
      },
      margin: {
        l: 50,
        b: 50,
        r: 50,
        t: 50
      },
    };

    let config = {
      modeBarButtonsToRemove: ['autoScale2d', 'lasso2d', 'pan2d', 'select2d', 'toggleSpikelines', 'hoverClosestCartesian', 'hoverCompareCartesian'],
      displaylogo: false,
      responsive: true,
    };
    this.plotlyService.newPlot(this.nebsPieChart.nativeElement, data, layout, config);
  }

}
