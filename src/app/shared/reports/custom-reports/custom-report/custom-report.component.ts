import { Component } from '@angular/core';
import { faScrewdriverWrench, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';
import { AssessmentIdbService } from 'src/app/indexed-db/assessment-idb.service';
import { EnergyOpportunityIdbService } from 'src/app/indexed-db/energy-opportunity-idb.service';
import { KeyPerformanceIndicatorsIdbService } from 'src/app/indexed-db/key-performance-indicators-idb.service';
import { NonEnergyBenefitsIdbService } from 'src/app/indexed-db/non-energy-benefits-idb.service';
import { OnSiteVisitIdbService } from 'src/app/indexed-db/on-site-visit-idb.service';
import { ReportIdbService } from 'src/app/indexed-db/report-idb.service';
import { IdbAssessment } from 'src/app/models/assessment';
import { IdbEnergyOpportunity } from 'src/app/models/energyOpportunity';
import { IdbKeyPerformanceIndicator } from 'src/app/models/keyPerformanceIndicator';
import { IdbNonEnergyBenefit } from 'src/app/models/nonEnergyBenefit';
import { IdbOnSiteVisit } from 'src/app/models/onSiteVisit';
import { IdbReport } from 'src/app/models/report';

@Component({
  selector: 'app-custom-report',
  standalone: false,

  templateUrl: './custom-report.component.html',
  styleUrl: './custom-report.component.css'
})
export class CustomReportComponent {

  faScrewdriverWrench: IconDefinition = faScrewdriverWrench;

  report: IdbReport;
  nonEnergyBenefits: Array<IdbNonEnergyBenefit>;
  energyOpportunities: Array<IdbEnergyOpportunity>;
  kpis: Array<IdbKeyPerformanceIndicator>;
  assessments: Array<IdbAssessment>;
  onSiteVisit: IdbOnSiteVisit;
  constructor(private reportIdbService: ReportIdbService,
    private nonEnergyBenefitsIdbService: NonEnergyBenefitsIdbService,
    private energyOpportunityIdbService: EnergyOpportunityIdbService,
    private keyPerformanceIndicatorIdbService: KeyPerformanceIndicatorsIdbService,
    private assessmentIdbService: AssessmentIdbService,
    private onSiteVisitIdbService: OnSiteVisitIdbService) {

  }

  ngOnInit() {
    this.nonEnergyBenefits = this.nonEnergyBenefitsIdbService.nonEnergyBenefits.getValue();
    this.energyOpportunities = this.energyOpportunityIdbService.energyOpportunities.getValue();
    this.kpis = this.keyPerformanceIndicatorIdbService.keyPerformanceIndicators.getValue();
    this.assessments = this.assessmentIdbService.assessments.getValue();
    this.report = this.reportIdbService.selectedReport.getValue();
    this.onSiteVisit = this.onSiteVisitIdbService.selectedVisit.getValue();
  }
}
