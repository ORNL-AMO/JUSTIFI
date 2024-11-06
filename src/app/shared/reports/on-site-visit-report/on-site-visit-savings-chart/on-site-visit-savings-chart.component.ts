import { Component, ElementRef, Input, SimpleChanges, ViewChild } from '@angular/core';
import { PlotlyService } from 'angular-plotly.js';
import { OnSiteVisitReport } from '../../calculations/visitReport';
import { graphColors } from 'src/app/shared/constants/graphColors';

@Component({
  selector: 'app-on-site-visit-savings-chart',
  templateUrl: './on-site-visit-savings-chart.component.html',
  styleUrl: './on-site-visit-savings-chart.component.css'
})
export class OnSiteVisitSavingsChartComponent {
  @Input({ required: true })
  onSiteVisitReport: OnSiteVisitReport;



  @ViewChild('percentSavingsGauge', { static: false }) percentSavingsGauge: ElementRef;
  @ViewChild('percentSavingsWithNebsGauge', { static: false }) percentSavingsWithNebsGauge: ElementRef;
  @ViewChild('nebsPieChart', { static: false }) nebsPieChart: ElementRef;
  constructor(private plotlyService: PlotlyService) {

  }

  ngAfterViewInit() {
    if (this.onSiteVisitReport) {
      this.drawGaugeCharts();
      this.drawPieChart();
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (!changes['onSiteVisitReport'].isFirstChange()) {
      this.drawGaugeCharts();
      this.drawPieChart();
    }
  }

  drawGaugeCharts() {
    let percentSavings = (this.onSiteVisitReport.totalEnergyCostSavings / this.onSiteVisitReport.totalEnergyCosts) * 100
    var savingsData = [
      {
        domain: { x: [0, 1], y: [0, 1] },
        value: percentSavings,
        title: { text: "Energy Savings" },
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

    let percentSavingsNebs = (this.onSiteVisitReport.totalCostSavings / this.onSiteVisitReport.totalEnergyCosts) * 100
    var savingsDataWithNebs = [
      {
        domain: { x: [0, 1], y: [0, 1] },
        value: percentSavingsNebs,
        number: { suffix: '%' },
        title: { text: "Assessment Savings W/ NEBs" },
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

    this.onSiteVisitReport.assessmentReports.forEach(assessmentReport => {
      trace.values.push(assessmentReport.totalEnergyCostSavings);
      trace.labels.push(assessmentReport.assessment.name + ' (Energy Cost) Savings');
      trace.marker.line.width.push(2);


      trace.values.push(assessmentReport.totalNebSavings);
      trace.labels.push(assessmentReport.assessment.name + ' (NEB) Savings');
      trace.marker.line.width.push(2);
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
