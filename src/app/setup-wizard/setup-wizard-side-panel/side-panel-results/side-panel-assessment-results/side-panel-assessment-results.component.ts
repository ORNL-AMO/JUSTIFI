import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { PlotlyService } from 'angular-plotly.js';
import { Subscription } from 'rxjs';
import { EnergyOpportunityIdbService } from 'src/app/indexed-db/energy-opportunity-idb.service';
import { KeyPerformanceIndicatorsIdbService } from 'src/app/indexed-db/key-performance-indicators-idb.service';
import { KeyPerformanceMetricImpactsIdbService } from 'src/app/indexed-db/key-performance-metric-impacts-idb.service';
import { NonEnergyBenefitsIdbService } from 'src/app/indexed-db/non-energy-benefits-idb.service';
import { IdbAssessment } from 'src/app/models/assessment';
import { IdbEnergyOpportunity } from 'src/app/models/energyOpportunity';
import { IdbKeyPerformanceMetricImpact } from 'src/app/models/keyPerformanceMetricImpact';
import { IdbNonEnergyBenefit } from 'src/app/models/nonEnergyBenefit';
import { KeyPerformanceMetric } from 'src/app/shared/constants/keyPerformanceMetrics';
import { AssessmentReport, getAssessmentReport } from 'src/app/shared/reports/calculations/assessmentReport';

@Component({
  selector: 'app-side-panel-assessment-results',
  standalone: false,

  templateUrl: './side-panel-assessment-results.component.html',
  styleUrl: './side-panel-assessment-results.component.css'
})
export class SidePanelAssessmentResultsComponent {
  @Input({ required: true })
  assessment: IdbAssessment;


  @ViewChild('percentSavingsGauge', { static: false }) percentSavingsGauge: ElementRef;
  @ViewChild('percentSavingsWithNebsGauge', { static: false }) percentSavingsWithNebsGauge: ElementRef;


  assessmentReport: AssessmentReport;

  energyOpportunities: Array<IdbEnergyOpportunity>;
  energyOpportunitiesSub: Subscription;

  nonEnergyBenefits: Array<IdbNonEnergyBenefit>;
  nonEnergyBenefitsSub: Subscription;

  keyPerformanceMetrics: Array<KeyPerformanceMetric>;
  keyPerformanceMetricsSub: Subscription;

  keyPerformanceMetricImpacts: Array<IdbKeyPerformanceMetricImpact>;
  keyPerformanceMetricImpactsSub: Subscription;

  constructor(private energyOpportunityIdbService: EnergyOpportunityIdbService,
    private nonEnergyBenefitIdbService: NonEnergyBenefitsIdbService,
    private keyPerformanceIndicatorIdbService: KeyPerformanceIndicatorsIdbService,
    private keyPerformanceMetricImpactsIdbService: KeyPerformanceMetricImpactsIdbService,
    private plotlyService: PlotlyService
  ) {

  }

  ngOnInit() {
    this.energyOpportunitiesSub = this.energyOpportunityIdbService.energyOpportunities.subscribe(opportunities => {
      this.energyOpportunities = opportunities;
      this.drawGaugeCharts();
    });
    this.nonEnergyBenefitsSub = this.nonEnergyBenefitIdbService.nonEnergyBenefits.subscribe(nebs => {
      this.nonEnergyBenefits = nebs;
      this.drawGaugeCharts();
    });
    this.keyPerformanceMetricsSub = this.keyPerformanceIndicatorIdbService.keyPerformanceIndicators.subscribe(() => {
      this.keyPerformanceMetrics = this.keyPerformanceIndicatorIdbService.getFacilityKeyPerformanceMetrics(this.assessment.facilityId);
      this.drawGaugeCharts();
    });
    this.keyPerformanceMetricImpactsSub = this.keyPerformanceMetricImpactsIdbService.keyPerformanceMetricImpacts.subscribe(impacts => {
      this.keyPerformanceMetricImpacts = impacts
      this.drawGaugeCharts();
    });
  }

  ngAfterViewInit() {
    this.drawGaugeCharts();
  }

  ngOnDestroy() {
    this.energyOpportunitiesSub.unsubscribe();
    this.nonEnergyBenefitsSub.unsubscribe();
    this.keyPerformanceMetricsSub.unsubscribe();
    this.keyPerformanceMetricImpactsSub.unsubscribe();
  }


  drawGaugeCharts() {
    if (this.percentSavingsGauge && this.percentSavingsWithNebsGauge) {
      this.assessmentReport = getAssessmentReport(this.assessment, this.energyOpportunities, this.nonEnergyBenefits, this.keyPerformanceMetrics, this.keyPerformanceMetricImpacts);
      let percentSavings = (this.assessmentReport.totalEnergyCostSavings / this.assessmentReport.assessment.cost) * 100
      var savingsData = [
        {
          domain: { x: [0, 1], y: [0, 1] },
          value: percentSavings,
          title: {
            text: "Energy Cost Savings",

            font: {
              // family: 'Courier New, monospace',
              size: 12
            },
          },
          type: "indicator",
          mode: "gauge+number",
          number: { suffix: '%' },
          gauge: {
            axis: { range: [null, 100], automargin: true },
          }
        },
      ];

      var layout = {
        height: 100,
        margin: {
          l: 10,
          b: 10,
          r: 20,
          t: 50,
          pad: 4,
          automargin: true,
          // autoexpand: true,
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
          title: {
            text: "Savings W/ NEBs",
            font: {
              size: 12
            },
          },
          type: "indicator",
          mode: "gauge+number",
          gauge: {
            axis: { range: [null, 100] },
          }
        },
      ];
      this.plotlyService.newPlot(this.percentSavingsWithNebsGauge.nativeElement, savingsDataWithNebs, layout, config);
    }
  }

}
