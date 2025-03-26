import { Component } from '@angular/core';
import { faFileLines, faScrewdriverWrench, faWeightHanging, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';
import { AssessmentIdbService } from 'src/app/indexed-db/assessment-idb.service';
import { EnergyOpportunityIdbService } from 'src/app/indexed-db/energy-opportunity-idb.service';
import { KeyPerformanceIndicatorsIdbService } from 'src/app/indexed-db/key-performance-indicators-idb.service';
import { NonEnergyBenefitsIdbService } from 'src/app/indexed-db/non-energy-benefits-idb.service';
import { ReportIdbService } from 'src/app/indexed-db/report-idb.service';
import { IdbAssessment } from 'src/app/models/assessment';
import { IdbEnergyOpportunity } from 'src/app/models/energyOpportunity';
import { IdbKeyPerformanceIndicator } from 'src/app/models/keyPerformanceIndicator';
import { IdbNonEnergyBenefit } from 'src/app/models/nonEnergyBenefit';
import { IdbReport } from 'src/app/models/report';
import { ReportType, ReportTypeOptions } from '../../../constants/reportTypes';

@Component({
  selector: 'app-custom-report-options',
  standalone: false,

  templateUrl: './custom-report-options.component.html',
  styleUrl: './custom-report-options.component.css'
})
export class CustomReportOptionsComponent {

  faScrewdriverWrench: IconDefinition = faScrewdriverWrench;
  faFileLines: IconDefinition = faFileLines;
  faWeightHanging: IconDefinition = faWeightHanging;
  reportTypeOptions: Array<{reportType: ReportType, label: string}> = ReportTypeOptions;
  report: IdbReport;
  reportSub: Subscription;
  isFormChange: boolean = false;

  nonEnergyBenefits: Array<IdbNonEnergyBenefit>;
  energyOpportunities: Array<IdbEnergyOpportunity>;
  kpis: Array<IdbKeyPerformanceIndicator>;
  assessments: Array<IdbAssessment>;
  constructor(private reportIdbService: ReportIdbService,
    private nonEnergyBenefitsIdbService: NonEnergyBenefitsIdbService,
    private energyOpportunityIdbService: EnergyOpportunityIdbService,
    private keyPerformanceIndicatorIdbService: KeyPerformanceIndicatorsIdbService,
    private assessmentIdbService: AssessmentIdbService) {

  }

  ngOnInit() {
    this.nonEnergyBenefits = this.nonEnergyBenefitsIdbService.nonEnergyBenefits.getValue();
    this.energyOpportunities = this.energyOpportunityIdbService.energyOpportunities.getValue();
    this.kpis = this.keyPerformanceIndicatorIdbService.keyPerformanceIndicators.getValue();
    this.assessments = this.assessmentIdbService.assessments.getValue();
    this.reportSub = this.reportIdbService.selectedReport.subscribe(report => {
      if (!this.isFormChange) {
        this.report = report;
      } else {
        this.isFormChange = false;
      }
    });
  }

  ngOnDestroy() {
    this.reportSub.unsubscribe();
  }


  async saveChanges() {
    this.isFormChange = true;
    await this.reportIdbService.asyncUpdate(this.report);
  }
}
