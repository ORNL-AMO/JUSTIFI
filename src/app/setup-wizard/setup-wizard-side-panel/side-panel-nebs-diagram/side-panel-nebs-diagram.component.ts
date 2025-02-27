import { Component } from '@angular/core';
import { faFileLines, faScrewdriverWrench, faWeightHanging, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';
import { AssessmentIdbService } from 'src/app/indexed-db/assessment-idb.service';
import { EnergyOpportunityIdbService } from 'src/app/indexed-db/energy-opportunity-idb.service';
import { FacilityIdbService } from 'src/app/indexed-db/facility-idb.service';
import { KeyPerformanceIndicatorsIdbService } from 'src/app/indexed-db/key-performance-indicators-idb.service';
import { KeyPerformanceMetricImpactsIdbService } from 'src/app/indexed-db/key-performance-metric-impacts-idb.service';
import { NonEnergyBenefitsIdbService } from 'src/app/indexed-db/non-energy-benefits-idb.service';
import { OnSiteVisitIdbService } from 'src/app/indexed-db/on-site-visit-idb.service';
import { IdbAssessment } from 'src/app/models/assessment';
import { IdbEnergyOpportunity } from 'src/app/models/energyOpportunity';
import { IdbFacility } from 'src/app/models/facility';
import { IdbKeyPerformanceIndicator } from 'src/app/models/keyPerformanceIndicator';
import { IdbKeyPerformanceMetricImpact } from 'src/app/models/keyPerformanceMetricImpact';
import { IdbNonEnergyBenefit } from 'src/app/models/nonEnergyBenefit';
import { IdbOnSiteVisit } from 'src/app/models/onSiteVisit';
import { KeyPerformanceMetric } from 'src/app/shared/constants/keyPerformanceMetrics';
import { KeyPerformanceIndicatorReport, KeyPerformanceIndicatorReportItem } from 'src/app/shared/reports/calculations/keyPerformanceIndicatorReport';
import { getOnSiteVisitReport, OnSiteVisitReport } from 'src/app/shared/reports/calculations/visitReport';
import { LocaleService } from 'src/app/shared/shared-services/locale.service';
import * as _ from 'lodash';

@Component({
  selector: 'app-side-panel-nebs-diagram',
  standalone: false,

  templateUrl: './side-panel-nebs-diagram.component.html',
  styleUrl: './side-panel-nebs-diagram.component.css'
})
export class SidePanelNebsDiagramComponent {

  faScrewdriverWrench: IconDefinition = faScrewdriverWrench;
  faFileLines: IconDefinition = faFileLines;
  faWeightHanging: IconDefinition = faWeightHanging;

  onSiteVisit: IdbOnSiteVisit;
  onSiteVisitSub: Subscription;

  assessmentsSub: Subscription;
  assessments: Array<IdbAssessment>;

  energyOpportunities: Array<IdbEnergyOpportunity>;
  energyOpportunitiesSub: Subscription;

  nonEnergyBenefits: Array<IdbNonEnergyBenefit>;
  nonEnergyBenefitsSub: Subscription;

  keyPerformanceIndicatorReport: KeyPerformanceIndicatorReport;
  kpiReportItems: Array<KeyPerformanceIndicatorReportItem>

  currencyCode: string;
  currencyCodeSub: Subscription;

  facilitySub: Subscription;
  facility: IdbFacility;
  keyPerformanceMetrics: Array<KeyPerformanceMetric>;
  keyPerformanceMetricsSub: Subscription;

  keyPerformanceMetricImpacts: Array<IdbKeyPerformanceMetricImpact>;
  keyPerformanceMetricImpactsSub: Subscription;

  keyPerformanceIndicators: Array<IdbKeyPerformanceIndicator>
  constructor(private onSiteVisitIdbService: OnSiteVisitIdbService,
    private assessmentIdbService: AssessmentIdbService,
    private energyOpportunityIdbService: EnergyOpportunityIdbService,
    private nonEnergyBenefitsIdbService: NonEnergyBenefitsIdbService,
    private keyPerformanceIndicatorIdbService: KeyPerformanceIndicatorsIdbService,
    private keyPerformanceMetricImpactsIdbService: KeyPerformanceMetricImpactsIdbService,
    private facilityIdbService: FacilityIdbService,
    private localeService: LocaleService
  ) {
  }

  ngOnInit() {
    this.facilitySub = this.facilityIdbService.selectedFacility.subscribe(facility => {
      this.facility = facility;
      this.setReportResults();
    })
    this.onSiteVisitSub = this.onSiteVisitIdbService.selectedVisit.subscribe(visit => {
      this.onSiteVisit = visit;
      this.setReportResults();
    })
    this.assessmentsSub = this.assessmentIdbService.assessments.subscribe(assessments => {
      this.assessments = assessments;
      this.setReportResults();
    });
    this.energyOpportunitiesSub = this.energyOpportunityIdbService.energyOpportunities.subscribe(opportunities => {
      this.energyOpportunities = opportunities;
      this.setReportResults();
    });
    this.nonEnergyBenefitsSub = this.nonEnergyBenefitsIdbService.nonEnergyBenefits.subscribe(nebs => {
      this.nonEnergyBenefits = nebs;
      this.setReportResults();
    });
    this.keyPerformanceMetricsSub = this.keyPerformanceIndicatorIdbService.keyPerformanceIndicators.subscribe(keyPerformanceIndicators => {
      this.keyPerformanceIndicators = keyPerformanceIndicators;
      this.keyPerformanceMetrics = this.keyPerformanceIndicatorIdbService.getFacilityKeyPerformanceMetrics(this.facility.guid);
      this.setReportResults();
    });
    this.keyPerformanceMetricImpactsSub = this.keyPerformanceMetricImpactsIdbService.keyPerformanceMetricImpacts.subscribe(impacts => {
      this.keyPerformanceMetricImpacts = impacts
      this.setReportResults();
    });
    this.currencyCodeSub = this.localeService.currencyCode.subscribe(currencyCode => {
      this.currencyCode = currencyCode;
    });
  }

  ngOnDestroy() {
    this.facilitySub.unsubscribe();
    this.onSiteVisitSub.unsubscribe();
    this.assessmentsSub.unsubscribe();
    this.energyOpportunitiesSub.unsubscribe();
    this.nonEnergyBenefitsSub.unsubscribe();
    this.keyPerformanceMetricsSub.unsubscribe();
    this.keyPerformanceMetricImpactsSub.unsubscribe
    this.currencyCodeSub.unsubscribe();
  }



  setReportResults() {
    if (this.energyOpportunities && this.nonEnergyBenefits && this.keyPerformanceMetrics && this.keyPerformanceMetricImpacts && this.assessments && this.onSiteVisit && this.facility) {
      let onSiteVisitReport: OnSiteVisitReport = getOnSiteVisitReport(this.onSiteVisit.assessmentIds, this.assessments, this.energyOpportunities, this.nonEnergyBenefits, this.keyPerformanceMetrics, this.keyPerformanceMetricImpacts);
      this.keyPerformanceIndicatorReport = onSiteVisitReport.keyPerformanceIndicatorReport;
      this.kpiReportItems = _.orderBy(this.keyPerformanceIndicatorReport.kpiReportItems, (reportItem: KeyPerformanceIndicatorReportItem) => {
        return reportItem.annualCostSavings
      }, 'desc')
    }
  }
}
