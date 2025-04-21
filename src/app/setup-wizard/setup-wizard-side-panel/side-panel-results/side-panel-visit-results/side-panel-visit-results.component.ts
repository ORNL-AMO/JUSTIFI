import { Component } from '@angular/core';
import { faFileLines, faScrewdriverWrench, faWeightHanging, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';
import { AssessmentIdbService } from 'src/app/indexed-db/assessment-idb.service';
import { CompanyIdbService } from 'src/app/indexed-db/company-idb.service';
import { EnergyOpportunityIdbService } from 'src/app/indexed-db/energy-opportunity-idb.service';
import { FacilityIdbService } from 'src/app/indexed-db/facility-idb.service';
import { KeyPerformanceIndicatorsIdbService } from 'src/app/indexed-db/key-performance-indicators-idb.service';
import { KeyPerformanceMetricImpactsIdbService } from 'src/app/indexed-db/key-performance-metric-impacts-idb.service';
import { NonEnergyBenefitsIdbService } from 'src/app/indexed-db/non-energy-benefits-idb.service';
import { OnSiteVisitIdbService } from 'src/app/indexed-db/on-site-visit-idb.service';
import { IdbAssessment } from 'src/app/models/assessment';
import { IdbEnergyOpportunity } from 'src/app/models/energyOpportunity';
import { IdbFacility } from 'src/app/models/facility';
import { IdbKeyPerformanceMetricImpact } from 'src/app/models/keyPerformanceMetricImpact';
import { IdbNonEnergyBenefit } from 'src/app/models/nonEnergyBenefit';
import { IdbOnSiteVisit } from 'src/app/models/onSiteVisit';
import { KeyPerformanceMetric } from 'src/app/shared/constants/keyPerformanceMetrics';
import { getOnSiteVisitReport, OnSiteVisitReport } from 'src/app/shared/reports/calculations/visitReport';
import { LocaleService } from 'src/app/shared/shared-services/locale.service';

@Component({
  selector: 'app-side-panel-visit-results',
  standalone: false,

  templateUrl: './side-panel-visit-results.component.html',
  styleUrl: './side-panel-visit-results.component.css'
})
export class SidePanelVisitResultsComponent {

  faScrewdriverWrench: IconDefinition = faScrewdriverWrench;
  faFileLines: IconDefinition = faFileLines;
  faWeightHanging: IconDefinition = faWeightHanging;

  energyOpportunities: Array<IdbEnergyOpportunity>;
  energyOpportunitiesSub: Subscription;

  nonEnergyBenefits: Array<IdbNonEnergyBenefit>;
  nonEnergyBenefitsSub: Subscription;

  keyPerformanceMetrics: Array<KeyPerformanceMetric>;
  keyPerformanceMetricsSub: Subscription;

  keyPerformanceMetricImpacts: Array<IdbKeyPerformanceMetricImpact>;
  keyPerformanceMetricImpactsSub: Subscription;

  onInit: boolean = true;
  percentSavings: number;
  percentSavingsNebs: number;

  assessmentsSub: Subscription;
  assessments: Array<IdbAssessment>;

  onSiteVisit: IdbOnSiteVisit;
  onSiteVisitSub: Subscription;

  onSiteVisitReport: OnSiteVisitReport;

  currencyCode: string;
  currencyCodeSub: Subscription;

  facilitySub: Subscription;
  facility: IdbFacility;
  constructor(private energyOpportunityIdbService: EnergyOpportunityIdbService,
    private nonEnergyBenefitIdbService: NonEnergyBenefitsIdbService,
    private keyPerformanceIndicatorIdbService: KeyPerformanceIndicatorsIdbService,
    private keyPerformanceMetricImpactsIdbService: KeyPerformanceMetricImpactsIdbService,
    private assessmentIdbService: AssessmentIdbService,
    private companyIdbService: CompanyIdbService,
    private onSiteVisitIdbService: OnSiteVisitIdbService,
    private localeService: LocaleService,
    private facilityDbService: FacilityIdbService
  ) {

  }

  ngOnInit() {
    this.facilitySub = this.facilityDbService.selectedFacility.subscribe(facility => {
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
    this.nonEnergyBenefitsSub = this.nonEnergyBenefitIdbService.nonEnergyBenefits.subscribe(nebs => {
      this.nonEnergyBenefits = nebs;
      this.setReportResults();
    });
    this.keyPerformanceMetricsSub = this.keyPerformanceIndicatorIdbService.keyPerformanceIndicators.subscribe(() => {
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
    this.energyOpportunitiesSub.unsubscribe();
    this.nonEnergyBenefitsSub.unsubscribe();
    this.keyPerformanceMetricsSub.unsubscribe();
    this.keyPerformanceMetricImpactsSub.unsubscribe();
    this.onSiteVisitSub.unsubscribe();
    this.assessmentsSub.unsubscribe();
    this.currencyCodeSub.unsubscribe();
    this.facilitySub.unsubscribe();
  }

  setReportResults() {
    if (this.energyOpportunities && this.nonEnergyBenefits && this.keyPerformanceMetrics && this.keyPerformanceMetricImpacts && this.assessments && this.onSiteVisit && this.facility) {
      this.onSiteVisitReport = getOnSiteVisitReport(this.onSiteVisit.assessmentIds, this.assessments, this.energyOpportunities, this.nonEnergyBenefits, this.keyPerformanceMetrics, this.keyPerformanceMetricImpacts);
      this.percentSavings = (this.onSiteVisitReport.totalEnergyCostSavings / this.facility.cost) * 100;
      this.percentSavingsNebs = (this.onSiteVisitReport.totalFinancialImpact / this.facility.cost) * 100
    }
  }
}
